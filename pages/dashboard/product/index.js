import React, { useEffect, useState } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Modal,
    Image,
    Carousel,
    Alert,
    Spinner
} from "react-bootstrap";
import Navbar from "../../../layout/header";
import { useRouter } from "next/router";
import Loading from "../../../components/loading";
import { Decrypt } from "../../../endpoint/login/index";
import Meta from "../../../components/Meta";
import { getProduct, deleteProduct } from "../../../endpoint/products";
import CreateProductForm from "../../../components/form/products/CreateProduct";
import EditProduct from "../../../components/form/products/EditProduct";

const Index = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [modalShow, setModalShow] = useState(false);
    const [product, setProduct] = useState([]);
    const [data, setData] = useState(null);
    const [modalDetail, setModalDetail] = useState(false);
    const [productDetail, setProductDetail] = useState(null);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [type, setType] = useState("detail");
    const [errorLoad, setErrorLoad] = useState(false);
    
    useEffect(() => {
        const session = localStorage.getItem("_session");
        !session && router.push("/");
        const fetchData = async () => {
            try {
                await Decrypt().then(async(result) => {
                    await getProduct(result.token, 1).then((products) => {
                        setLoading(false);
                        setProduct(products.data.data.rows);
                    });
                    setData(result);
                });
            } catch (err) {
                setLoading(false);
                if (err.response == undefined) {
                    setErrorLoad(true);
                } else if (
                    err.response.data.message &&
                    err.response.data.message.includes("session")
                ) {
                    localStorage.removeItem("_session");
                    router.push("/");
                } else {
                    router.push("/");
                }
            }
        };
        fetchData();
    }, [router]);

    const onDelete = async (product_id) => {
        setLoadingDelete(true);
        try {
            await deleteProduct(product_id, data.token)
            .then(() => {
                setLoadingDelete(false);
                location.reload();
            });
        } catch (err) {
            setLoadingDelete(false);
            setError(true);
            setMessage(err.response.data.message);
        }
    }

    const detail = (data) => {
        setModalDetail(true) 
        setProductDetail(data)
    }

    const typeModal = (param) => {
        setType(param);
        
    }
    return (
        <React.Fragment>
            {loading ? (
                <Loading />
            ) : (
            <React.Fragment>
                <Meta />
                <Navbar />
                <Container className="bg-light">
                    {errorLoad && <Alert variant="danger">Gagal memuat Data, silakan refresh kembali</Alert>}
                    <Row className="sticky-top bg-light">
                    <Col>
                        <h1>Produk</h1>
                    </Col>
                    <Col className="align-items-end">
                        <Button onClick={() => setModalShow(true)}>Buat Produk</Button>
                    </Col>
                    </Row>
                    <Row>
                        {product.map((data, i) => (
                            <Col sm={4} lg={4} md={4} xl={4} className="mb-5" key={i}>
                                <Card onClick={() => detail(data)}>
                                    <Carousel>
                                        {data.product_images.map((image, index) => {
                                            return (
                                            <Carousel.Item key={index}>
                                                <Image
                                                className="d-block w-100"
                                                src={`${process.env.base_url}/images/${image.filename}`}
                                                alt="First slide"
                                                />
                                            </Carousel.Item>
                                            );
                                        })}
                                    </Carousel>
                                    <Card.Body>
                                        <Card.Title>{data.name}</Card.Title>
                                        <Card.Text>
                                            {data.description.slice(0, 100)}
                                            {data.tags.map((data_tag, x) => {
                                                return (
                                                    <a href="#" key={x}>
                                                        {" "}
                                                        {data_tag.tag}{" "}
                                                    </a>
                                                );
                                            })}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <Modal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        animation={true}
                    >
                        <CreateProductForm data={data} setModalShow={setModalShow}/>
                    </Modal>
                    <Modal
                        show={modalDetail}
                        onHide={() => setModalDetail(false)}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        animation={true}
                    >
                        {type == "detail" ? 
                            <><Modal.Header closeButton>
                                        {error && <Alert variant="danger">{message}</Alert>}
                                        <Modal.Title id="contained-modal-title-vcenter">
                                            Produk Detail
                                        </Modal.Title>
                                    </Modal.Header>
                                        <Modal.Body>
                                            <Carousel>
                                                {productDetail && productDetail.product_images.map((image, index) => {
                                                    return (
                                                        <Carousel.Item key={index}>
                                                            <Image
                                                                className="d-block w-100"
                                                                src={`${process.env.base_url}/images/${image.filename}`}
                                                                alt="First slide" />
                                                        </Carousel.Item>
                                                    );
                                                })}
                                            </Carousel>
                                            <p>Kode Produk:</p>
                                            <p>{productDetail && productDetail.code}</p>
                                            <p>Nama Produk:</p>
                                            <p>{productDetail && productDetail.name}</p>
                                            <p>Deskripsi: </p>
                                            <p>{productDetail && productDetail.description}</p>
                                            <p>Tag: </p>
                                            {productDetail && productDetail.tags.map((data_tag, x) => {
                                                return (
                                                    <a href="#" key={x}>
                                                        {" "}
                                                        {data_tag.tag}{" "}
                                                    </a>
                                                );
                                            })}
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="danger" onClick={() => onDelete(productDetail.id)}>
                                                {loadingDelete ? (
                                                    <Spinner
                                                        as="span"
                                                        animation="border"
                                                        size="sm"
                                                        role="status"
                                                        aria-hidden="true" />
                                                ) : (
                                                    "Hapus Produk"
                                                )}
                                            </Button>
                                            <Button variant="success" onClick={() => typeModal("edit")}>
                                                Edit Produk
                                            </Button>
                                        </Modal.Footer>
                                </>
                        : 
                        <>
                            <EditProduct productDetail={productDetail} typeModal={typeModal}/>
                        </> }
                        
                    </Modal>
                </Container>
            </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default Index;
