import React, { useState } from "react";
import {
    Modal,
    Form,
    Alert,
    Col,
    Row,
    Button,
    Spinner,
    Image
} from "react-bootstrap";
import { FaPlus, FaEdit, FaTrashAlt } from "react-icons/fa";
import { InputTags } from "react-bootstrap-tagsinput";
import ImageUploading from "react-images-uploading";
import { createProductApi } from "../../../endpoint/products";

const Index = (props) => {
    const [loadingCreate, setLoadingCreate] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [tags, setTags] = useState([]);
    const [productName, setProductName] = useState("");
    const [productCode, setProductCode] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    
    
    const onChangeImage = (imageList) => {
        setImages(imageList);
    };

    const setValue = (e, type) => {
        if (type == "description") {
            setDescription(e.target.value);
        } else if (type == "productName") {
            setProductName(e.target.value);
        } else {
            setProductCode(e.target.value);
        }
    };

    const createProduct = async () => {
        setLoadingCreate(true);
        const formData = new FormData();
        formData.append("name", productName);
        formData.append("code", productCode);
        formData.append("description", description);
        tags.map((tag, i) => {
            formData.append(`tags[${i}]`, tag);
        });
        images.map((data) => {
            formData.append("image", data.file);
        });
        try {
            await createProductApi(formData, props.data.token)
            .then(() => {
                setLoadingCreate(false);
                setError(false);
                props.setModalShow(false);
                location.reload();
            });
        } catch (err) {
            setLoadingCreate(false);
            setError(true);
            setMessage(err.response.data.message);
        }
    };

    return (
        <React.Fragment>
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
                            dragProps,
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
                                        <FaPlus /> Tambah Gambar
                                    </Button>
                                </Col>
                                <Col sm>
                                    <Button
                                        size="sm"
                                        variant="danger"
                                        onClick={onImageRemoveAll}
                                        className="text-center"
                                    >
                                        <FaTrashAlt /> Hapus semua gambar
                                    </Button>
                                </Col>
                                </Row>
                                <Row>
                                    {imageList.map((image, index) => (
                                        <Col sm={3} key={index} className="text-center mb-3">
                                            <Image
                                                src={image.data_url}
                                                alt="image"
                                                width="80"
                                                height="80"
                                                className="mb-2"
                                            />
                                            <Button
                                                size="sm"
                                                variant="success"
                                                onClick={() => onImageUpdate(index)}
                                                className="text-center"
                                            >
                                                <FaEdit />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="danger"
                                                onClick={() => onImageRemove(index)}
                                                className="text-center"
                                            >
                                                <FaTrashAlt />
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
                    <InputTags
                        values={tags}
                        onTags={(value) => setTags(value.values)}
                        id="tags"
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => props.setModalShow(false)}>
                    Close
                </Button>
                <Button
                    variant="primary"
                    disabled={loadingCreate}
                    onClick={createProduct}
                >
                    {loadingCreate ? (
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                    ) : (
                        "Simpan"
                    )}
                </Button>
            </Modal.Footer>
        </React.Fragment>
    );
};

export default Index;
