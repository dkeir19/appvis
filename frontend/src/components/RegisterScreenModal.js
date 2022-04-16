import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";

import Message from "./Message.js";
import { GithubContext } from '../context/context';
import { Link } from "react-router-dom";

const RegisterScreenModal = ({ location, history }) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);
    const { registerUser, loggedUser } = React.useContext(
        GithubContext
      );
    // const redirect = location.search ? location.search.split("=")[1] : "/";

    // useEffect(() => {
    //   if (loggedUser) {
    //     history.push(redirect);
    //   }
    // }, [history, loggedUser, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password != confirmPassword) {
          setMessage("Passwords do not match");
        } else {
          console.log("in submithanlder");
          //dispatch(register(name, email, password));
          registerUser(name, email, password)
        }

    }   

    return (
        <div>
          <Row className="justify-content-md-center">
            <Col xs={12} md={6}>
            <h1>Sign Up</h1>
            {message && <Message variant="danger">{message}</Message>}
            {/*error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />} */}
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
              <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type="submit" variant="primary">
                Register
              </Button>
            </Form>
    
            <Row className="py-3">
              <Col>
                Have an Account?{" "}
                <Link to={"/login "}>
                  Login
                </Link>
              </Col>
            </Row>
            </Col>
           </Row>    
        </div>
    );

};


export default RegisterScreenModal;