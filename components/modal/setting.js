import { Modal, Button } from "react-bootstrap";
import React from "react";
import AddressForm from "../form/setting/address";
import CompanyForm from "../form/setting/company";
import DescriptionForm from "../form/setting/description";
import LogoForm from "../form/setting/logo";
import UserForm from "../form/setting/user";
import LinkForm from "../form/setting/link";

const Index = (props) => {
  return (
    <React.Fragment>
      <Modal
        show={props.modalShow}
        onHide={() => props.close(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Setting {props.menu}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.menu === "Logo" ? (
            <LogoForm />
          ) : props.menu === "Deskripsi" ? (
            <DescriptionForm />
          ) : props.menu === "User" ? (
            <UserForm />
          ) : props.menu === "Alamat" ? (
            <AddressForm />
          ) : props.menu === "Link" ? (
            <LinkForm/>
          ) :(
            <CompanyForm />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => props.close(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};
export default Index;
