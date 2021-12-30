import {
    Col,
    Row,
    Form,
    InputGroup,
    Button,
} from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { HiOfficeBuilding, HiPhone, HiOutlineMail } from "react-icons/hi";
import React, { useState } from "react";
import Step from "../register/step2";

const Index = () => {
    const [validated, setValidated] = useState(false);
    const [username, setUsername] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [step, setStep] = useState(false);

    const handleSubmit = (event) => {
        if (
            username == "" || 
            companyName == "" || 
            email == "" || 
            phone == ""
        ) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            setValidated(true);
            setStep(true)
        }
    };

    const back = () => {
        setStep(false)
    }

    return (
    <React.Fragment>
        { step ? 
            <Step username={username} company_name={companyName} email={email} phone={phone} setStepFunc={back}/>
            : 
        <Form validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                <Form.Label>Username</Form.Label>
                <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">
                    <FaUser />
                </InputGroup.Text>
                <Form.Control
                    type="text"
                    placeholder="Username"
                    aria-describedby="inputGroupPrepend"
                    required
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                    value={username}
                />
                </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                <Form.Label>Nama Perusahaan</Form.Label>
                <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">
                    <HiOfficeBuilding />
                </InputGroup.Text>
                <Form.Control
                    type="text"
                    placeholder="Nama Perusahaan"
                    aria-describedby="inputGroupPrepend"
                    required
                    onChange={(e) => {
                        setCompanyName(e.target.value);
                    }}
                    value={companyName}
                />
                </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                <Form.Label>Nomor Telepon</Form.Label>
                <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">
                    <HiPhone />
                </InputGroup.Text>
                <Form.Control
                    type="text"
                    placeholder="Nomor Telepon"
                    aria-describedby="inputGroupPrepend"
                    required
                    onChange={(e) => {
                        setPhone(e.target.value);
                    }}
                    value={phone}
                />
                </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                <Form.Label>Email</Form.Label>
                <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">
                    <HiOutlineMail />
                </InputGroup.Text>
                <Form.Control
                    type="email"
                    placeholder="Email"
                    aria-describedby="inputGroupPrepend"
                    required
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    value={email}
                />
                </InputGroup>
            </Form.Group>
            </Row>
            <Button type="submit">Selanjutnya</Button>
        </Form>
        }
        </React.Fragment>
    );
};

export default Index;
