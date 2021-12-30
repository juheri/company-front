import { 
    Navbar, 
    Container, 
    Nav,
    NavDropdown
} from "react-bootstrap";
import { Decrypt } from "../../endpoint/login/index"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";


const Index = () => {
    const [login, setLogin] = useState(false);

    useEffect(async () => {
        const session = localStorage.getItem("_session")
        if(!session){ setLogin(false) }
        try {
            await Decrypt()
            setLogin(true)
        } catch (err){
            setLogin(false)
        }
    }, []);

    return (
        <React.Fragment>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Company Project</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto"></Nav>
                    <Nav>
                        {login == false ? 
                            <Nav.Link href="/login">Login</Nav.Link>
                        : MenuLogin()
                        }
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </React.Fragment>
    );
};

const MenuLogin = () => {
    const router = useRouter()
    const logout = () => {
        localStorage.removeItem("_session")
        router.push("/");
    }
    return (
        <React.Fragment>
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/dashboard/product">Produk</Nav.Link>
            <NavDropdown title="Menu" id="basic-nav-dropdown">
                <NavDropdown.Item href="/dashboard/setting">Setting</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
        </React.Fragment>
    )
}

export default Index;
