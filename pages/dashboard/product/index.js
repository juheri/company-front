import React, { useEffect, useState } from "react";
import { 
    Container,
    Row,
    Col,
    Card,
    Button,
    Modal,
    Form,
    Image,
    Carousel,
    Alert
} from "react-bootstrap";
import { FaPlus, FaEdit, FaTrashAlt } from "react-icons/fa";
import Navbar from "../../../layout/header";
import { useRouter } from "next/router";
import Loading from "../../../components/loading";
import { Decrypt } from "../../../endpoint/login/index";
import Meta from "../../../components/Meta";
import { InputTags } from 'react-bootstrap-tagsinput';
import ImageUploading from "react-images-uploading";
import { createProductApi, getProduct } from "../../../endpoint/products";

const Index = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [data, setData] = useState(null);
    const [tags, setTags] = useState([]);
    const [images, setImages] = useState([]);
    const [productName, setProductName] = useState("");
    const [productCode, setProductCode] = useState("");
    const [description, setDescription] = useState("");
    const [product, setProduct] = useState([]);
    const [loadingCreate, setLoadingCreate] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const session = localStorage.getItem("_session");
        !session && router.push("/");
        setLoading(false);
        const fetchData = async () => {
            try {
                const result = await Decrypt();
                const products = await getProduct(result.token, 1);
                setData(result);
                setLoading(false);
                setProduct(products.data.data.rows);
            } catch (err){
                if (err.response.data.message && err.response.data.message.includes("session")) {
                    localStorage.removeItem("_session");
                    router.push("/");
                }
                setLoading(true);
                router.push("/");
            }
        }
        fetchData();
    }, [router]);

    const onChangeImage = (imageList, addUpdateIndex) => {
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };
    const setValue = (e, type) => {
        if (type == "description") {
            setDescription(e.target.value);
        } else if(type == "productName") {
            setProductName(e.target.value);
        } else {
            setProductCode(e.target.value);
        }
    }

    const createProduct = async () => {
        setLoadingCreate(true);
        const formData = new FormData();
        formData.append("name", productName);
        formData.append("code", productCode);
        formData.append("description", description);
        tags.map((data) => {
            formData.append("tags", data);
        })
        images.map((data) => {
            formData.append("image", data.file);
        });

        try {
            await createProductApi(formData, data.token);
            setLoadingCreate(false);
            setError(false);
            setModalShow(false);
            location.reload();
        } catch (err) {
            setLoadingCreate(false);
            setError(true);
            setMessage(err.response.data.message);
        }
    }

    return (
        <React.Fragment>
            {loading ? <Loading/> : 
                <React.Fragment>
                    <Meta/>
                    <Navbar/>
                    <Container className="bg-light">
                        <Row className="sticky-top bg-light">
                            <Col>
                                <h1>Produk</h1>
                            </Col>
                            <Col className="align-items-end">
                                <Button onClick={() => setModalShow(true)}>Buat Produk</Button>
                            </Col>
                        </Row>
                        <Row>
                            { product.map((data, i) => 
                                <Col sm={4} lg={4} md={4} xl={4} className="mb-5" key={i}>
                                    <Card>
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
                                                )
                                
                                            })}
                                        </Carousel>
                                        <Card.Body>
                                            <Card.Title>{data.name}</Card.Title>
                                            <Card.Text>
                                                {data.description.slice(0,100)}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )}
                        </Row>

                        <Modal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                            animation={false}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    Buat Produk
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form.Group className="mb-3">
                                    {error && <Alert variant="danger">{message}</Alert>}
                                    <Form.Label>Nama Produk</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="productName" 
                                        placeholder="Nama Produk" 
                                        onChange={(e) => setValue(e, "productName")}
                                        value={productName}
                                        autoFocus
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Kode Produk</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="productCode" 
                                        placeholder="Kode Produk" 
                                        onChange={(e) => setValue(e, "productCode")}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Deskripsi</Form.Label>
                                    <Form.Control 
                                        as="textarea" 
                                        name="description" 
                                        placeholder="Deskripsi" 
                                        rows={3} 
                                        onChange={(e) => setValue(e, "description")}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Gambar</Form.Label>
                                    <ImageUploading
                                        multiple
                                        value={images}
                                        onChange={onChangeImage}
                                        maxNumber={5}
                                        dataURLKey="data_url"
                                    >
                                        {({
                                            imageList,
                                            onImageUpload,
                                            onImageRemoveAll,
                                            onImageUpdate,
                                            onImageRemove,
                                            isDragging,
                                            dragProps
                                        }) => (
                                            <React.Fragment>
                                                <Row className="mb-3 text-center">
                                                    <Col sm>
                                                        <Button
                                                            className="text-center"
                                                            size="sm"
                                                            variant="primary"
                                                            style={isDragging ? { color: "red" } : null}
                                                            onClick={onImageUpload}
                                                            {...dragProps}
                                                        >
                                                            <FaPlus/> Tambah Gambar
                                                        </Button>
                                                    </Col>
                                                    <Col sm>
                                                        <Button 
                                                            size="sm" 
                                                            variant="danger" 
                                                            onClick={onImageRemoveAll} 
                                                            className="text-center"
                                                        > 
                                                            <FaTrashAlt/> Hapus semua gambar
                                                        </Button>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    {imageList.map((image, index) => (
                                                            <Col sm={3} key={index} className="text-center mb-3">
                                                                <Image src={image.data_url} alt="image" width="80" height="80" className="mb-2"/>
                                                                <Button size="sm" variant="success" onClick={() => onImageUpdate(index)} className="text-center">
                                                                    <FaEdit/>
                                                                </Button>
                                                                <Button size="sm" variant="danger" onClick={() => onImageRemove(index)} className="text-center">
                                                                    <FaTrashAlt/>
                                                                </Button>
                                                            </Col>
                                                    ))}
                                                </Row>
                                            </React.Fragment>
                                        )}
                                    </ImageUploading>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tag</Form.Label>
                                    <InputTags values={tags} onTags={(value) => setTags(value.values)} id="tags"/>
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="danger" onClick={()=> setModalShow(false)}>Close</Button>
                                <Button
                                    variant="primary"
                                    disabled={loadingCreate}
                                    onClick={createProduct}
                                >
                                    {loading ? 'Loading…' : 'Simpan'}
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Container>
                </React.Fragment>
            }
        </React.Fragment>
    )
}

export default Index