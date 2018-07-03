import React, { Component } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';

class Home extends Component {
 
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }
  login() {
    this.props.auth.login();
  }
  
   componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }
  
  render() {
	   const { profile } = this.state;
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        {
          isAuthenticated() && (
            <Jumbotron>
            <h1>Welcome 
			{profile.name == "Vivek Check" ? " Candidate" : " Employer" }</h1>
            <p>
              Follow below link
            </p>
			{profile.name == "Vivek Check" ?
			(
			<div>
				<Button bsStyle="primary"
               className="btn-margin "
               onClick={this.goTo.bind(this, 'search')}>Search Job</Button>
			    <Button bsStyle="primary"
               className="btn-margin "
               onClick={this.goTo.bind(this, 'search')}>Shortlist Candidates</Button>
			   </div>
			   ): (
			   <div>
			   <Button bsStyle="primary"
               className="btn-margin "
               onClick={this.goTo.bind(this, 'search')}>Short list</Button>
			   </div>
			)}
          </Jumbotron>
            )
        }
        {
          !isAuthenticated() && (
              <h4>
                You are not logged in! Please{' '}
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={this.login.bind(this)}
                >
                  Log In
                </a>
                {' '}to continue.
              </h4>
            )
        }
      </div>
    );
  }
}

export default Home;
