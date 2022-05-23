import React, { useEffect, useState } from "react";
import Meta from "../../../components/Meta";
import Navbar from "../../../layout/header/index";
import { Container, Tab, Row, Col, ListGroup } from "react-bootstrap";
import { Decrypt } from "../../../endpoint/login/index";
import { useRouter } from "next/router";
import Loading from "../../../components/loading";
import ModalSetting from "./../../../components/modal/setting";

const Index = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [menu, setMenu] = useState("");

  useEffect(() => {
    const session = localStorage.getItem("_session");
    !session && router.push("/");
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

  const modalClose = () => {
    setModalShow(false);
  };
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
              id="list-group-tabs"
              defaultActiveKey="#link1"
            >
              <Row style={{ marginTop: "20px" }}>
                <Col sm={12}>
                  <ListGroup>
                    <ListGroup.Item
                      action
                      onClick={() => {
                        setModalShow(true);
                        setMenu("Logo");
                      }}
                    >
                      Logo
                    </ListGroup.Item>
                    <ListGroup.Item
                      action
                      onClick={() => {
                        setModalShow(true);
                        setMenu("Deskripsi");
                      }}
                    >
                      Deskripsi
                    </ListGroup.Item>
                    <ListGroup.Item
                      action
                      onClick={() => {
                        setModalShow(true);
                        setMenu("User");
                      }}
                    >
                      User
                    </ListGroup.Item>
                    <ListGroup.Item
                      action
                      onClick={() => {
                        setModalShow(true);
                        setMenu("Alamat");
                      }}
                    >
                      Alamat
                    </ListGroup.Item>
                    <ListGroup.Item
                      action
                      onClick={() => {
                        setModalShow(true);
                        setMenu("Nama Perusahaan");
                      }}
                    >
                      Nama Perusahaan
                    </ListGroup.Item>
                    <ListGroup.Item
                      action
                      onClick={() => {
                        setModalShow(true);
                        setMenu("Link");
                      }}
                    >
                      Link
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
              {modalShow ? (
                <ModalSetting
                  menu={menu}
                  modalShow={modalShow}
                  close={modalClose}
                />
              ) : null}
            </Tab.Container>
          </Container>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Index;
