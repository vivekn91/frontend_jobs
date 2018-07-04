import React, { Component } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import './App.css';

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a onClick={this.goTo.bind(this, 'home')}>iJob portal</a>
            </Navbar.Brand>
            <Button
              bsStyle="primary"
              className="btn-margin pull-right"
              onClick={this.goTo.bind(this, 'home')}
            >
              Home
           </Button>
            </Navbar.Header>
            <Nav pullRight>
            
            {
              !isAuthenticated() && (
                  <Button
                    id="qsLoginBtn"
                    bsStyle="primary"
                    className="btn-margin pull-right"
                    onClick={this.login.bind(this)}
                  >
                    Log In
                  </Button>
				  
                )
            }
            {
              isAuthenticated() && (
			  <div>
                 
				   
			 <Button
              bsStyle="primary"
              className="btn-margin pull-right"
              onClick={this.goTo.bind(this, 'role')}
            >
              Change Role
            </Button>
			
			 <Button
                    id="qsLogoutBtn"
                    bsStyle="primary"
                    className="btn-margin "
                    onClick={this.logout.bind(this)}
                  >
                    Log Out
                  </Button>
			</div>
                )
            }
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default App;
