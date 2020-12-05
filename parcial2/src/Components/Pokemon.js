import React, { useState, useEffect } from "react";
import { Row, Container, Col, Table } from 'react-bootstrap';
import Grafica from "./Grafica";
import "./pokemon.css";
import { FormattedMessage } from 'react-intl';

function Pokemon() {

    let [pokemonesEspanol, setPokemonesEspanol] = useState([]);
    let [pokemonesIngles, setPokemonesIngles] = useState([]);

    useEffect(()=>{
        if(!navigator.onLine){
            if(localStorage.getItem("pokemonesEspanol") === null && localStorage.getItem("pokemonesIngles") === null  ) {
                setPokemonesEspanol("Cargando...");
                setPokemonesIngles("Cargando...");
            } else {
                setPokemonesEspanol(localStorage.getItem("pokemonesEspanol"));
                setPokemonesIngles(localStorage.getItem("pokemonesIngles"));
            }
        } else {
            const url_espanol = new URL("https://gist.githubusercontent.com/jhonatan89/e379fadf8ed0f5381a2d8f8f3dea90c3/raw/e2bc20df02828d297f99558551e37959ac97a6f8/pokemon-es.json");
            const url_ingles = new URL("https://gist.githubusercontent.com/jhonatan89/2089276d3ce0faceff8e55fc3459b818/raw/30ee1a77b3e328108faaaa9aaac6f2ddaa3d3711/pokemons-en.json");

            fetch(url_espanol).then(res=>res.json()).then(res=>{
                setPokemonesEspanol(res);
                localStorage.setItem("pokemonesEspanol", res);
            })

            fetch(url_ingles).then(res=>res.json()).then(res=>{
                setPokemonesIngles(res);
                localStorage.setItem("pokemonesIngles", res);
            })
        }
    }, []);

    return (
    <div>
        <Container fluid>
            <Row>
                <Col>
                    <Table striped bordered hover size="sm">
                        <thead className={<FormattedMessage id="thead" />}>
                            <tr>
                            <th scope="col"><FormattedMessage id="#" /></th>
                            <th scope="col"><FormattedMessage id="Image" /></th>
                            <th scope="col"><FormattedMessage id="Name" /></th>
                            <th scope="col"><FormattedMessage id="Description" /></th>
                            <th scope="col"><FormattedMessage id="Height" /></th>
                            <th scope="col"><FormattedMessage id="Weight" /></th>
                            <th scope="col"><FormattedMessage id="Type" /></th>
                        </tr>
                        </thead>
                        <tbody>
                            {pokemonesEspanol.map(pokemon_actual =>
                            <tr>
                                <td key={"id" + pokemon_actual.id}>{pokemon_actual.id}</td>
                                <img src={pokemon_actual.ThumbnailImage} alt={"id" + pokemon_actual.id} width="200" height="200"></img>
                                <td key={"name" + pokemon_actual.id}>{pokemon_actual.name}</td>
                                <td key={"description" + pokemon_actual.id}>{pokemon_actual.description}</td>
                                <td key={"height" + pokemon_actual.id}>{pokemon_actual.height}</td>
                                <td key={"weight" + pokemon_actual.id}>{pokemon_actual.weight}</td>
                                {
                                    pokemon_actual.type.map(type_actual =>
                                        <tr> 
                                        <td className = "detalle_tipos" >{type_actual}</td>
                                        </tr>
                                )}
                            </tr>
                            )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
        <Grafica data = {pokemonesEspanol}></Grafica>
    </div>
    );
}

export default Pokemon;