import React, { Component, useState, useRef, useEffect } from 'react'
import { Map, GoogleApiWrapper, Marker, Polygon, InfoWindow } from 'google-maps-react';
import { usePosition } from 'use-position';
import GoogleMapReact from 'google-map-react';
import { MDBCard, MDBCardTitle, MDBCardText, MDBContainer } from "mdbreact";
import "./UserPage.css"
import jwtDecode from 'jwt-decode'
import {MDBBtn} from "mdbreact"

const Marker1 = (props) => {
    const {title, price, desc, address} = props;
    return (
        <React.Fragment>
            <div
                style={{
                    border: "5px solid white",
                    borderRadius: 20,
                    height: 20,
                    width: 20
                }}
            />
            {/* Below is info window component */}
            {props.show && (
                <div>
                    <MDBContainer>
                        <MDBCard className="card-body" style={{width: "22rem", marginTop: "1rem"}}>
                            <MDBCardTitle>{title}</MDBCardTitle>
                            <MDBCardText>
                                {desc}
                            </MDBCardText>
                            <div className="flex-row">
                                <p>Prix : {price}</p>
                                <p>Address : {address}</p>
                            </div>
                        </MDBCard>
                    </MDBContainer>
                </div>
            )}
        </React.Fragment>
    )
}


const Perso = (props: any) => {
    const { color, name, id } = props;
    return (
        <div>
            <div
                className="pin bounce"
                style={{ backgroundColor: color, cursor: 'pointer' }}
                title={name}
            />
            <div className="pulse" />
        </div>
    );
};

export class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nom: '',
            prenom: '',
            latMe: '',
            lonMe: '',
            name:'',
            desc: '',
            price: '',
            address:'',
            exlat: '',
            exlon: '',
            show : false
        };
        this.logout = this.logout.bind(this);
    }


    logout(e) {
        e.preventDefault();
        localStorage.removeItem('token');
        this.props.history.push('/');
    }

    componentDidMount() {
        const tokken = localStorage.token;
        const decode = jwtDecode(tokken);

        fetch("http://localhost:4000/annonce/getJob")
        .then(response => response.json())
            .then((res) => {
                console.log(res);
                this.setState({
                    exlat : res[0].lat,
                    exlon : res[0].lon,
                    name : res[0].title,
                    desc : res[0].desc,
                    price : res[0].price,
                    address : res[0].address
                })
                console.log(res[0].lat);
                console.log(res[0].lon);

            })
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(location => {
                this.setState({
                    latMe: location.coords.latitude,
                    lonMe: location.coords.longitude
                })

            });
        }
        this.setState({
            prenom : decode.prenom,
            nom : decode.nom
        })
    }

    _onChildClick = (key, childProps) => {
        this.setState({show: !this.state.show})
    }

    render() {
        return (
            <div className="main">
                <div id="viewport">
                    <div id="sidebar">
                        <header>
                            <p style={{color: "white"}}><strong>Bienvenue {this.state.nom}</strong></p>
                        </header>
                        <div>
                            <ul style={{color: "white"}} type="button" class="list-group"> Compte</ul>
                            <br/>
                            <ul style={{color: "white"}} type="button" className="list-group"> Contrat</ul>
                            <br/>
                            <ul style={{color: "white"}} type="button" className="list-group"> travaux effectué</ul>
                            <br/>
                            <ul style={{color: "white"}} type="button" className="list-group"> Paramètre</ul>
                            <MDBBtn style={{color: "white"}} onClick={this.logout}>Logout</MDBBtn>
                        </div>
                    </div>
                    <div style={{ height: '100vh', width: '125%' }}>
                        <div className="map">
                            <GoogleMapReact
                                bootstrapURLKeys={{ key: 'AIzaSyDW41KMRzwFp4m7Uht_53PiPHv0LSqXq5Y' }}
                                defaultCenter={{lat: 48.8322, lng: 2.3561}}
                                defaultZoom={14}
                                onChildClick={this._onChildClick}>
                                <Perso
                                    lat={this.state.latMe}
                                    lng={this.state.lonMe}
                                    text="My Marker"
                                    color="blue"
                                />
                                <Marker1
                                    title={this.state.name}
                                    desc={this.state.desc}
                                    price={this.state.price}
                                    address={this.state.address}
                                    lat={this.state.exlat}
                                    lng={this.state.exlon}
                                    color="red"
                                    show={this.state.show}
                                />
                            </GoogleMapReact>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default GoogleApiWrapper({
    apiKey: 'AIzaSyDW41KMRzwFp4m7Uht_53PiPHv0LSqXq5Y'
})(UserPage);