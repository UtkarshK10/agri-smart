import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createProduce,
  deleteProduce,
  listMyProduces,
} from "../../actions/produceActions";
import Produce from "../../components/contract/Produce";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import CustomModal from "../../components/CustomModal";
import { PRODUCE_CREATE_RESET } from "../../constants/produceConstants";

const MyProduceScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const myProduceList = useSelector((state) => state.myProduceList);
  const { loading, produces, error } = myProduceList;

  const produceDelete = useSelector((state) => state.produceDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = produceDelete;

  const produceCreate = useSelector((state) => state.produceCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    produce: createdproduce,
  } = produceCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [modalShow, setModalShow] = useState(false);
  const [delId, setDelId] = useState();

  useEffect(() => {
    dispatch({ type: PRODUCE_CREATE_RESET });
    if (!userInfo) {
      navigate("/login");
    }
    if (userInfo && userInfo.isContractor) {
      navigate("/bazaar/allProduces");
    }
    if (successCreate) {
      navigate(`/bazaar/produce/${createdproduce._id}/edit`);
    } else if (userInfo && userInfo.isFarmer) {
      dispatch(listMyProduces());
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    createdproduce,
  ]);

  const createProduceHandler = () => {
    dispatch(createProduce());
  };

  const modalHandler = (id) => {
    setModalShow(true);
    setDelId(id);
    // if (window.confirm("Are you sure? ")) {
    //   dispatch(deleteProduce(id));
    // }
  };

  const deleteHandler = () => {
    dispatch(deleteProduce(delId));
    setModalShow(false);
  };

  return (
    <>
      <Row>
        <Col>
          <h1>MY PRODUCES</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProduceHandler}>
            <i className="fas fa-plus"></i> Add Produce
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {produces.length === 0 && <p> No produces to show yet</p>}
          {produces.map((produce) => (
            <Col key={produce._id} sm={12} md={6} lg={4} xl={4}>
              <Produce produce={produce} util={modalHandler} isFarmer={true} />
            </Col>
          ))}
        </Row>
      )}
      <CustomModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        msg="Are you Sure?"
        util={() => deleteHandler()}
      />
    </>
  );
};

export default MyProduceScreen;
