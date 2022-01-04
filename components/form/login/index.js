import React, { useState } from "react";
import { Form, Col, Row, InputGroup, Button, Alert } from "react-bootstrap";
import { Login } from "../../../endpoint/login"
import { useRouter } from "next/router";

const Index = () => {
    const router = useRouter();
    const [key, setKey] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (
            key == "" || 
            password == ""
        ){
            setError(true)
            setMessage("data harus diisi semua")
        } else {
            setLoading(true);
            try {
                const data = { key, password }
                const result = await Login(data)
                localStorage.setItem('_session', result.data.data)
                router.push("/dashboard");
                setLoading(false)
            } catch (err) {
                setMessage(err.response.data.message);
                setError(true);
                setLoading(false);
            }
        }
    }
    return (
        <React.Fragment>
        <Form>
            <Row className="mb-3">
            <Form.Group as={Col} md="12">
                {error ? <Alert variant="danger">{message}</Alert> : null}
                <Form.Label>Email / No Telepon</Form.Label>
                <InputGroup hasValidation>
                    <Form.Control
                        type="text"
                        placeholder="Email / No Telepon"
                        aria-describedby="inputGroupPrepend"
                        required
                        onChange={(e) => setKey(e.target.value)}
                        value={key}
                    />
                </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="12">
                <Form.Label>Password</Form.Label>
                <InputGroup hasValidation>
                    <Form.Control
                        type="Password"
                        placeholder="Password"
                        aria-describedby="inputGroupPrepend"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </InputGroup>
            </Form.Group>
            </Row>
            <Button
                variant="primary"
                disabled={loading}
                onClick={handleSubmit}
            >
                {loading ? 'Loading…' : 'Login'}
            </Button>
        </Form>
        </React.Fragment>
    );
};

export default Index;
