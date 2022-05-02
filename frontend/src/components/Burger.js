import React from 'react';
import { slide as Menu } from 'react-burger-menu'
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { Nav} from "react-bootstrap";

class Burger extends React.Component {

  static contextType = GithubContext

  constructor (props) {
    super(props)
    this.state = {
      menuOpen: false,
    }
    this.closeMenu = this.closeMenu.bind(this);
    this.showSettings = this.showSettings.bind(this);
    this.toggleLogin = this.toggleLogin.bind(this);
    this.toggleRegister = this.toggleRegister.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);
    
  }
  handleStateChange (state) {
    this.setState({menuOpen: state.isOpen})  
  }

  closeMenu () {
    this.setState({menuOpen: false})
  }

  toggleMenu () {
    this.setState(state => ({menuOpen: !state.menuOpen}))
  }

  showSettings (event) {
    event.preventDefault(); 
    this.closeMenu();
    var element = document.getElementById("market-news");
    element.scrollIntoView();
  }

  toggleLogin (event) {
    event.preventDefault(); 
    this.closeMenu();
    this.props.handleShow();
    console.log('blahblah');
  }

  toggleRegister (event) {
    event.preventDefault(); 
    this.closeMenu();
    this.props.handleRegister();
    this.props.handleShow();
    console.log('blahblah2');
  }

  logoutHandler () {
    //e.preventDefault();
    this.context.logout();
  }
  


  render () {
    const { loggedUser, logout } =this.context;
    
    return (
      <Wrapper>
      <Menu 
          onClose={ this.handleOnClose }
          isOpen={this.state.menuOpen}
          onStateChange={(state) => this.handleStateChange(state)}
        >
         <ul>
           <li>
        <a id="contact" className="menu-item--small" href="#market-news" onClick={ this.showSettings }>Market news</a>
         </li>
         </ul>
        {!loggedUser ? (
          <ul>  
          <li><a onClick={ this.toggleLogin } className="menu-item--small" href="">Sign in</a></li>
        
          <li><a onClick={ this.toggleRegister } className="menu-item--small" href="">Register</a></li>
   
        </ul>
         ) :
        (
          <ul>
          <li> <a className="menu-item--small"  onClick={this.logoutHandler}>Logout</a> </li> </ul>
        ) }
      </Menu>
      </Wrapper>
    );
  }
}

export default Burger;

const Wrapper=styled.div`

/* Position and sizing of burger button */
.bm-burger-button {
  position: relative;
  width: 36px;
  height: 30px;
  left: 36px;
  top: 36px;
}

/* Color/shape of burger icon bars */
.bm-burger-bars {
  background: #373a47;
}

/* Color/shape of burger icon bars on hover*/
.bm-burger-bars-hover {
  background: #a90000;
}

/* Position and sizing of clickable cross button */
.bm-cross-button {
  height: 24px;
  width: 24px;
}

/* Color/shape of close button cross */
.bm-cross {
  background: #bdc3c7;
}

/*
Sidebar wrapper styles
Note: Beware of modifying this element as it can break the animations - you should not need to touch it in most cases
*/
.bm-menu-wrap {
  position: fixed;
  height: 100%;
}

/* General sidebar styles */
.bm-menu {
  background: #373a47;
  padding: 2.5em 1.5em 0;
  font-size: 1.15em;
}

/* Morph shape necessary with bubble or elastic */
.bm-morph-shape {
  fill: #373a47;
}

/* Wrapper for item list */
.bm-item-list {
  color: #b8b7ad;
  padding: 0.8em;
}

/* Individual item */
.bm-item {
  display: inline-block;
}

/* Styling of overlay */
.bm-overlay {
  background: rgba(0, 0, 0, 0.3);
}
`;