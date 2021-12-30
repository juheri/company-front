import React, { useState } from "react";
import {
    Col,
    Row,
    Form,
    InputGroup,
    Button,
    Alert 
} from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { HiOfficeBuilding, HiPhone, HiOutlineMail } from "react-icons/hi";
import Step from "../register/step1";
import { register } from "../../../endpoint/register/index";

const Index = props => {
    const [address, setAddress] = useState("");
    const [uniqueUrl, setUniqueUrl] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [step1, setStep1] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const [formError, setFormError] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [hide, setHide] = useState(false);

    const handleSubmit = async (event) => {
        if (
            address == "" || 
            password == "" ||
            confirmPassword == ""
        ) {
            setFormError(true)
        } else {
            setIsloading(true)
            setFormError(false)
            let data = {
                name: props.company_name,
                address,
                phone: props.phone,
                email: props.email,
                unique_url: uniqueUrl,
                password,
                username: props.username,
            }
            try {
                const result = await register(data);
                setIsloading(false)
                setError(false);
                setMessage("Pendaftaran perhasil, silakan login untuk melengkapi data perusahaan anda selanjutnya")
                setHide(true)
            } catch (err) {
                setError(true)
                setIsloading(false)
                setHide(true)
                setMessage(err.response.data.message)
            }
        }
    };

    const back = () => {
        props.setStepFunc()
        setStep1(true)
    }

    return (
    <React.Fragment>
        { step1 ?
            <Step/>
        : 
            <Form>
                <Row className="mb-3">
                    { error && hide ? 
                        <Alert variant="danger">
                            {message}
                        </Alert> : error == false && hide ?
                        <Alert variant="success">
                        {message}
                        </Alert>
                    : null
                }
                    { formError ? 
                        <Alert variant="danger" onClose={() => setFormError(false)} dismissible>Isi semua data yang ada pada form dibawah</Alert> 
                    : null}
                <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                    <Form.Label>Alamat</Form.Label>
                    <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">
                        <FaUser />
                    </InputGroup.Text>
                    <Form.Control
                        type="text"
                        placeholder="Alamat"
                        aria-describedby="inputGroupPrepend"
                        required
                        onChange={(e) => {
                            setAddress(e.target.value);
                        }}
                    />
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                    <Form.Label>Url Perusahaan</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="inputGroupPrepend">
                            <HiOfficeBuilding />
                        </InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Url Perusahaan"
                            aria-describedby="inputGroupPrepend"
                            required
                            onChange={(e) => {
                                setUniqueUrl(e.target.value.replace(/\s/g, ''));
                            }}
                        /> 
                    </InputGroup>
                    <p>{window.location.hostname}/{uniqueUrl}</p>
                </Form.Group>
                <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                    <Form.Label>Password</Form.Label>
                    <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">
                        <HiPhone />
                    </InputGroup.Text>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        aria-describedby="inputGroupPrepend"
                        required
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                    <Form.Label>Konfirmasi Password</Form.Label>
                    <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">
                        <HiOutlineMail />
                    </InputGroup.Text>
                    <Form.Control
                        type="password"
                        placeholder="Konfirmasi Password"
                        aria-describedby="inputGroupPrepend"
                        required
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }}
                    />
                    </InputGroup>
                    { password != confirmPassword && confirmPassword != "" ? <p>password dan konfirmasi password harus sama</p> : null}
                </Form.Group>
                </Row>
                <Button  onClick={back}>Kembali</Button>
                {isLoading ? 
                    <Button>Loading</Button>
                : 
                <Button onClick={handleSubmit}>Daftar</Button>
                }
            </Form>
        }
    </React.Fragment>
    );
};

export default Index;
