import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Image,
  Carousel,
  Alert,
  Spinner,
} from "react-bootstrap";
import Navbar from "../../../layout/header";
import Meta from "../../../components/Meta";

const Index = () => {
  return (
    <React.Fragment>
      <Meta />
      <Navbar />
      <Container>content page</Container>
    </React.Fragment>
  );
};

export default Index;
