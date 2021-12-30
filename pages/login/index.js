import { 
    Container
} from 'react-bootstrap'
import Navbar from "../../layout/header/index";
import React from 'react';
import Meta from "../../components/Meta";
import FormLogin from "../../components/form/login";

const Index = () => {
    return (
        <React.Fragment>
            <Meta/>
            <Navbar />
            <Container fluid>
                <FormLogin/>
            </Container>
        </React.Fragment>
    )
}

export default Index