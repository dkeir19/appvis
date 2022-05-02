import React, { useState, useEffect }  from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import Message from "./Message.js";
import { Form, Button, Row, Col, Container, Nav, Modal} from "react-bootstrap";
import { GithubContext } from '../context/context';
import Burger from './Burger';
import RegisterScreenModal from './RegisterScreenModal.js';

const Navbar = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { requests, error, searchGithubUser, searchStock, isLoading, loggedUser, login, logout, loginError, showLogin, toggleLogin } = React.useContext(
    GithubContext
  );
  const logoutHandler = () => {
    //e.preventDefault();
    logout();
  };

  // const {
  //   isAuthenticated,
  //   loginWithRedirect,
  //   logout,
  //   loggedUser,
  //   user,
  //   isLoading,
  // } = useAuth0();
  // const isUser = isAuthenticated && user;
  
  const submitHandler = (e) => {
    e.preventDefault();
    login(email, password)
  };

  const showSettings =  (event) => {
    event.preventDefault();
  }

  const [show, setShow] = useState(false);
  const handleClose = () => { setShow(false); toggleLogin(false) } ;
  const handleShow = () => setShow(true);
  const [registerPath, setRegisterPath] = useState(true);
  const handleRegister = () => setRegisterPath(false);
  let props = {handleShow, handleRegister};

  useEffect(() => {
    if(showLogin==true)
      setShow(true);
  }, [showLogin]);

  return (
    <div>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
      { loggedUser ? 
              (
                <div>          
                 Hey, {loggedUser.name}  <Styledwrap><Nav.Link onClick={logoutHandler}>Logout</Nav.Link> </Styledwrap>         
                </div>
              ) :
              (<div></div>)
              }
        </Col>
      </Row>
      
      <Container>
        {/* <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button> */}
    

          <Modal  show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              { loggedUser ? 
              (
                <div>          
                  <h4>Hey, {loggedUser.name}</h4>
                   
                      
                      <Nav.Link onClick={logoutHandler}>
                        <i className="fas fa-shopping-cart"></i> Cart
                      </Nav.Link>
               
                </div>
              ) :
              (
                registerPath ?
                  (
                    <Row className="justify-content-md-center">
                      <Col xs={12} md={6}>
                        <h1>Sign in</h1>
                        {loginError && <Message variant="danger">{loginError}</Message>}
                        {/* {loading && <Loader />}  */}
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
                        <Button type="submit" variant="primary">
                          Sign in
                        </Button>
                      </Form>
                      New user?{" "}
                          <a onClick={(event) => {  setRegisterPath(false); event.preventDefault();   } } className="menu-item--small" href="">Register</a>
                    
                      </Col>
                    </Row>
                  ) :
                  (
                    <RegisterScreenModal/>
                  )
                
              )} 
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer> 
            </Modal>        
             
        <Burger {...props} />
      </Container>
    </div>
)

  // return (
  //   <Wrapper>
  //     {isUser && user.picture && <img src={user.picture} alt={user.name} />}
  //     {isUser && user.name && (
  //       <h4>
  //         Welcome, <strong>{user.name.toUpperCase()}</strong>
  //       </h4>
  //     )}
  //     {isUser ? (
  //       <button
  //         onClick={() => {
  //           logout({ returnTo: window.location.origin });
  //         }}
  //       >
  //         logout
  //       </button>
  //     ) : (
  //       <button onClick={loginWithRedirect}>login</button>
  //     )}
  //   </Wrapper>
  // );
};

const Styledwrap = styled.div`
  display:inline !important;
  .nav-link{
    font-size:.8rem;
    display: inline !important;
  }
`;

// const Wrapper = styled.nav`
  // display:inline;
  // & .nav-link {
  //   display:inline !important;
  // }
  // padding: 1.5rem;
  // background: var(--clr-white);
  // text-align: center;
  // display: grid;
  // grid-template-columns: auto auto 100px;
  // justify-content: center;
  // align-items: center;
  // gap: 1.5rem;
  // h4 {
  //   margin-bottom: 0;
  //   font-weight: 400;
  // }
  // img {
  //   width: 35px !important;
  //   height: 35px;
  //   border-radius: 50%;
  //   object-fit: cover;
  // }
  // button {
  //   background: transparent;
  //   border: transparent;
  //   font-size: 1.2rem;
  //   text-transform: capitalize;
  //   letter-spacing: var(--spacing);
  //   color: var(--clr-grey-5);
  //   cursor: pointer;
  // }
// `;

export default Navbar;
