import React, { Component } from 'react'
// import for MDBREACT ALL
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css"
import './section3.css'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import ios from "../media/Image_7.png"
import android from "../media/Image_8.png"

class thirdSection extends Component {
    render() {
        return(
            <MDBContainer>
                <MDBRow center>
                    <h1 style={{color: "#651FFF"}} className="Jobizz font-weight-bold">N'attend plus et télécharge JoBizz !</h1>
                </MDBRow>
                <MDBRow center>
                    <h3 className="h3 font-weight-bold"> application mobile disponible sur iOS & Android</h3>
                </MDBRow>
                <MDBRow className="pou">
                    <MDBCol size="6">
                        <img class="apple" src={ios} />
                    </MDBCol>
                    <MDBCol size="6">
                        <img class="android" src={android} />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    };
}

export default thirdSection
