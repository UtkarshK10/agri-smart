import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { register } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";

const RegisterScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [isFarmer, setIsFarmer] = useState(true);
  const [isContractor, setIsContractor] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const redirect = location.search
    ? new URLSearchParams(location.search).get("redirect")
    : "/";

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const userTypeHandler = (e) => {
    if (e.target.value === "Farmer") {
      setIsFarmer(true);
      setIsContractor(false);
    } else if (e.target.value === "Contractor") {
      setIsFarmer(false);
      setIsContractor(true);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password, isFarmer, isContractor));
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br />
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br />
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br />
        <Form.Group controlId="confirmpassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>User Type</Form.Label>

          <Col>
            <Form.Check
              inline
              type="radio"
              label="Farmer"
              id="Farmer"
              name="userType"
              value="Farmer"
              checked
              onChange={userTypeHandler}
            ></Form.Check>
            <Form.Check
              inline
              type="radio"
              label="Contractor"
              id="Contractor"
              name="userType"
              value="Contractor"
              onChange={userTypeHandler}
            ></Form.Check>
          </Col>
        </Form.Group>
        <br />
        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Have an Account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
