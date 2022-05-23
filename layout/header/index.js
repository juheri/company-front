import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Decrypt } from "../../endpoint/login/index";
import React, { useState, useEffect } from "react";

const Index = () => {
  const [login, setLogin] = useState(false);
  useEffect(() => {
    const session = localStorage.getItem("_session");
    !session && setLogin(false);
    const fetchData = async () => {
      try {
        await Decrypt();
        setLogin(true);
      } catch (err) {
        setLogin(false);
      }
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/">Company</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              {login == false ? (
                <Nav.Link href="/login">Login</Nav.Link>
              ) : (
                MenuLogin()
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  );
};

const MenuLogin = () => {
  const logout = () => {
    localStorage.removeItem("_session");
    window.location.href = "/";
  };
  return (
    <React.Fragment>
      <Nav.Link href="/dashboard">Dashboard</Nav.Link>
      <Nav.Link href="/dashboard/product">Produk</Nav.Link>
      <Nav.Link href="/dashboard/content">Konten</Nav.Link>
      <NavDropdown title="Menu" id="basic-nav-dropdown">
        <NavDropdown.Item href="/dashboard/setting">Setting</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
      </NavDropdown>
    </React.Fragment>
  );
};

export default Index;
