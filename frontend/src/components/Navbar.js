import React, { useState, useEffect }  from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import Message from "./Message.js";
import { Form, Button, Row, Col, Container, Nav, Modal} from "react-bootstrap";
import { GithubContext } from '../context/context';
import Burger from './Burger';
import RegisterScreenModal from './RegisterScreenModal.js';
import { handle } from 'express/lib/application';

const Navbar = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { requests, error, searchGithubUser, searchStock, isLoading, loggedUser, login, logout, loginError, showLogin, toggleLogin, loginwithgoogle, fetchUserGoogle } = React.useContext(
    GithubContext
  );
  
  const logoutHandler = () => {
    //e.preventDefault();
    logout();
  };
  
  const submitHandler = (e) => {
    e.preventDefault();
    login(email, password)
  };

  const showSettings =  (event) => {
    event.preventDefault();
  }

  const [show, setShow] = useState(false);
  const handleClose = () => { setShow(false); toggleLogin(false); setRegisterPath(true) } ;
  const handleShow = () => setShow(true);
  const [registerPath, setRegisterPath] = useState(true);
  const handleRegister = () => setRegisterPath(false);
  let props = {handleShow, handleRegister};

  useEffect(() => {
    
    if(showLogin==true)
      setShow(true);
    if(loggedUser) {
      handleClose();
    } 
    fetchUserGoogle();
  }, [showLogin,loggedUser]);

  return (
    <div>
      

      <Wrapper className='thenav'>
       <Burger {...props} />
      
      { loggedUser ? 
              (
                <div>          
                 Hey, {loggedUser.name}  <Styledwrap><Nav.Link onClick={logoutHandler}>Logout</Nav.Link> </Styledwrap>         
                </div>
              ) :
              (<div></div>)
              }
      
      
      <Container>
        {/* <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button> */}
    

          <Modal  show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Sign in</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              { loggedUser ? 
              (
                <div>          
                  <h4>Hey, {loggedUser.name}</h4>
                   
                      <Nav.Link onClick={logoutHandler}>   
                      </Nav.Link>
               
                </div>
              ) :
              (
                registerPath ?
                  (
                    <Row className="justify-content-md-center">
                      <Col xs={12} md={6}>
  
                        {loginError && <Message variant="danger">{loginError}</Message>}
    
                        <Form onSubmit={submitHandler}>
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
                        <div className="d-grid gap-2">
                        <Button type="submit" variant="primary" size="lg">
                          Sign in
                        </Button>
                        </div>
                      </Form>
                      <a href="/auth/google"><img src="/btn_google_signin_light_normal_web.png" alt="Login with Google"/></a>
                      New user?{" "}
                          <a onClick={(event) => {  setRegisterPath(false); event.preventDefault();   } } className="menu-item--small" href="">Register</a>
                    
                      </Col>
                    </Row>
                  ) :
                  (
                    <RegisterScreenModal path={setRegisterPath}  />
                  )
                
              )} 
              </Modal.Body>

            </Modal>        
             
      
      </Container>
      </Wrapper>
    </div>
)

};

const Styledwrap = styled.div`
  display:inline !important;
  .nav-link{
    font-size:.8rem;
    display: inline !important;
  }
  button {
    width:100% !important;
  }
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  div {

  }
`;


export default Navbar;
