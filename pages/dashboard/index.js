import { Container } from "react-bootstrap";
import Navbar from "../../layout/header/index";
import React, { useEffect, useState } from "react";
import Meta from "../../components/Meta";
import { useRouter } from "next/router";
import Loading from "../../components/loading";
import { Decrypt } from "../../endpoint/login/index";

const Index = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = localStorage.getItem("_session");
    !session && router.push("/");
    const fetchData = async () => {
      try {
        await Decrypt();
        setLoading(false);
      } catch (err){
        setLoading(true);
        router.push("/");
      }
    }
    fetchData();
  }, [router]);

  return (
    <React.Fragment>
      <Meta />
      {loading ? <Loading/> : 
      <div>
        <Navbar />
        <Container>this is dashboard</Container>
        </div>
      }
    </React.Fragment>
  );
};

export default Index;
