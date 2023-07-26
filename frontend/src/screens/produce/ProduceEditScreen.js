import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  listProduceDetails,
  updateProduce,
} from "../../actions/produceActions";
import FormContainer from "../../components/FormContainer";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { PRODUCE_UPDATE_RESET } from "../../constants/produceConstants";

const ProduceEditScreen = () => {
  const navigate = useNavigate();
  const params = useParams();
  const produceId = params.id;

  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState("");
  const [name, setName] = useState("Sample name");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);

  const dispatch = useDispatch();

  const produceDetails = useSelector((state) => state.produceDetails);
  const { loading, error, produce } = produceDetails;

  const produceUpdate = useSelector((state) => state.produceUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = produceUpdate;

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCE_UPDATE_RESET });
      navigate("/bazaar");
    } else {
      if (!produce || produce._id !== produceId) {
        dispatch(listProduceDetails(produceId));
      } else {
        setName(produce.name);
        setQuantity(produce.quantity);
        setPrice(produce.price);
        setImage(produce.image);
      }
    }
  }, [dispatch, navigate, produceId, produce, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateProduce({
        _id: produceId,
        name,
        image,
        quantity,
        price,
      })
    );
  };

  return (
    <>
      <Link to="/bazaar" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Produce Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name of the produce"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <br></br>
            <br></br>

            <Form.Group controlId="quantity">
              <Form.Label>Produce Quantity (in Kgs)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Produce Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <br></br>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Group controlId="image-file" className="mb-3">
                <Form.Control
                  type="file"
                  onChange={uploadFileHandler}
                  placeholder="Choose File"
                />
              </Form.Group>

              {uploading && <Loader />}
            </Form.Group>
            <br></br>

            <Form.Group controlId="price">
              <Form.Label>Price (in ₹)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <br></br>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProduceEditScreen;
