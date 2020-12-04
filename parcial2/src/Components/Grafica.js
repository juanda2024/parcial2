import React, { Component } from "react";
import * as d3 from "d3";

class Grafica extends Component {

  componentDidMount() {
    const url_espanol = new URL("https://gist.githubusercontent.com/jhonatan89/e379fadf8ed0f5381a2d8f8f3dea90c3/raw/e2bc20df02828d297f99558551e37959ac97a6f8/pokemon-es.json");
    fetch(url_espanol).then(res=>res.json()).then(res=>{
        this.drawChart(res);
    })
  }

  drawChart(data) {
          const canvas = d3.select(this.refs.canvas);
          const width = 700;
          const height = 500;
          const margin = { top:40, left:80, bottom: 40, right: 10};
          const iwidth = width - margin.left - margin.right;
          const iheight = height - margin.top -margin.bottom;
          let svg = canvas.append("svg");
          let eje_Y_max = 0;
  
          data.forEach(element => {
              if((element.height) >= eje_Y_max) {
                eje_Y_max = parseInt(element.height);
              }
          });

          svg.attr("width", width);
          svg.attr("height", height);
          
          let g1 = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
          
          let y = d3.scaleLinear() 
              .domain([0, eje_Y_max])
              .range([iheight, 0]);
          
          const x = d3.scaleBand()
          .domain(data.map(d => d.name) ) 
          .range([0, iwidth])
          .padding(0.1); 
          
          let bars = g1.selectAll("rect").data(data);
  
          bars.enter().append("rect")
              .attr("class", "bar")
              .style("fill", "steelblue")
              .attr("x", d => x(d.name))
              .attr("y", d => y(parseInt(d.height)))
              .attr("height", d => iheight - y(parseInt(d.height)))
              .attr("width", x.bandwidth())
      
          g1.append("g")
              .classed("x--axis", true)
              .call(d3.axisBottom(x))
              .attr("transform", `translate(0, ${iheight})`);
      
          g1.append("g")
              .classed("y--axis", true)
              .call(d3.axisLeft(y));
  
          g1.append("text")
          .attr("x", (width / 2.5))             
          .attr("y", 0 - (margin.top / 2))
          .attr("text-anchor", "middle")  
          .style("font-size", "16px")   
          .text("Altura de los pokemons");

  }
  render() {
    return <div ref="canvas">
      <div className = "col-6">
      </div>
    </div>;
  }
}

export default Grafica;