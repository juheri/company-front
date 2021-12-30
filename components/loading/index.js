import React from "react";
import { Spinner } from "react-bootstrap";

const Index = () => {
    return (
        <React.Fragment>
            <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)"}}>
                <Spinner animation="border" variant="primary" />
                <Spinner animation="border" variant="secondary" />
                <Spinner animation="border" variant="success" />
                <Spinner animation="border" variant="danger" />
                <Spinner animation="border" variant="warning" />
                <Spinner animation="border" variant="info" />
                <Spinner animation="border" variant="light" />
                <Spinner animation="border" variant="dark" />
            </div>
        </React.Fragment>
    );
};

export default Index;
