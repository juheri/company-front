import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Navbar from "../../../layout/header";
import { useRouter } from "next/router";
import Loading from "../../../components/loading";
import { Decrypt } from "../../../endpoint/login/index";
import Meta from "../../../components/Meta";

const Index = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        const session = localStorage.getItem("_session");
        if(!session){ router.push("/") }
        try {
            await Decrypt()
            setLoading(false)
        } catch (err){
            setLoading(true)
            router.push("/");
        }
    }, []);

    return (
        <React.Fragment>
            {loading ? <Loading/> : 
                <React.Fragment>
                    <Meta/>
                    <Navbar/>
                    <Container>
                        this is product page
                    </Container>
                </React.Fragment>
            }
        </React.Fragment>
    )
}

export default Index