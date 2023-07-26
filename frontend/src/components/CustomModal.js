import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const CustomModal = (props) => {
  return (
    <Modal {...props} backdrop="static" keyboard={false}>
      <Modal.Body>
        <h4>{props.msg}</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          CANCEL
        </Button>
        <Button variant="danger" onClick={props.util}>
          YES
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
