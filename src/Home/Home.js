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
	
	const {role} = window.localStorage.getItem("role");
    return (
      <div className="container">
        {
          isAuthenticated() && (
            <Jumbotron>
            <h1>Welcome to verizon
			</h1>
            <p>
              Follow below link
            </p>
			{profile.name == "Vivek Check" ?
			(
			<div>
			 {(role == "CANDI")? (
				<div>
				<Button bsStyle="primary"
               className="btn-margin "
               onClick={this.goTo.bind(this, 'search')}>Search Job</Button>
			   <Button bsStyle="primary"
               className="btn-margin "
               onClick={this.goTo.bind(this, 'OnBoarding')}>On-Boarding</Button>
			   </div>
			   ): ""
			 }
			 {(role !== "CANDI")? (
			 <div>
			    <Button bsStyle="primary"
               className="btn-margin "
               onClick={this.goTo.bind(this, 'applicant')}>View Applicants</Button>
			    <Button bsStyle="primary"
               className="btn-margin "
               onClick={this.goTo.bind(this, 'ViewInterviewApplicants')}>Interview Pannel View</Button>
			    <Button bsStyle="primary"
               className="btn-margin "
               onClick={this.goTo.bind(this, 'IR')}>IR</Button>
			   </div>
			 ): ""}
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
