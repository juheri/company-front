import React, { useEffect, useState } from "react";
import Meta from "../../../components/Meta";
import Navbar from "../../../layout/header/index";
import { Container } from "react-bootstrap";
import { Decrypt } from "../../../endpoint/login/index";
import { useRouter } from "next/router";
import Loading from "../../../components/loading";

const Index = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        const session = localStorage.getItem("_session")
        if (!session) {
            router.push("/");
        }
        try {
            const result = await Decrypt()
            setLoading(false)
        } catch (err) {
            router.push("/");
        }
    }, []);
    
    return (
        <React.Fragment>
            <Meta />
            {loading ? <Loading/> : 
                <React.Fragment>
                    <Navbar/>
                    <Container>
                        setting page
                    </Container>
                </React.Fragment>
            }
        </React.Fragment>
    )
}

export default Index