import React from "react";
import Meta from "../components/Meta";
import Navbar from "../layout/header";
import Form from "../components/form/register/step1";
import { 
  Container, 
  Col, 
  Row
} from "react-bootstrap";

const Index = () => {
  return (
    <React.Fragment>
      <Meta />
      <Navbar />
      <Container>
        <Row style={{ backgroundColor: "#f7f7f7"}}>
            <Col xs={12} lg={6} md={6}>
              <h1>for more content</h1>
            </Col>
            <Col xs={12} lg={6} md={6}>
                <Form/>
            </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Index;
