import React, { useEffect, useState } from "react";
import Meta from "../../../components/Meta";
import Navbar from "../../../layout/header/index";
import { Container, Tab, Row, Col, ListGroup } from "react-bootstrap";
import { Decrypt } from "../../../endpoint/login/index";
import { useRouter } from "next/router";
import Loading from "../../../components/loading";

const Index = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = localStorage.getItem("_session");
    if (!session) {
      router.push("/");
    }
    const validate = async () => {
      try {
        const result = await Decrypt();
        setLoading(false);
      } catch (err) {
        router.push("/");
      }
    };
    validate();
  }, [router]);

  return (
    <React.Fragment>
      <Meta />
      {loading ? (
        <Loading />
      ) : (
        <React.Fragment>
          <Navbar />
          <Container>
            <Tab.Container
              id="list-group-tabs-example"
              defaultActiveKey="#link1"
            >
              <Row style={{ marginTop: "20px" }}>
                <Col sm={12}>
                  <ListGroup>
                    <ListGroup.Item action href="/dashboard/setting/logo">
                      Logo
                    </ListGroup.Item>
                    <ListGroup.Item
                      action
                      href="/dashboard/setting/description"
                    >
                      Deskripsi
                    </ListGroup.Item>
                    <ListGroup.Item action href="/dashboard/setting/user">
                      User
                    </ListGroup.Item>
                    <ListGroup.Item action href="/dashboard/setting/address">
                      Alamat
                    </ListGroup.Item>
                    <ListGroup.Item action href="/dashboard/setting/company">
                      Nama Perusahaan
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </Tab.Container>
          </Container>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Index;
