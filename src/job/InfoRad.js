import React, { Component } from 'react';
import { Row, Col, Grid , Button,  Jumbotron, Nav, NavItem } from 'react-bootstrap';
import data from "../data/jobs.json";

class InfoRad extends Component {
	
	goTo(route,role) {
	window.localStorage.setItem("role",role)
    this.props.history.replace(`/${route}`)
  }

    state = {
        jobDetails: data,
        searchString: ""
    };

    constructor() {
        super();
        this.getjobDetails();
        //console.log(this.state.jobDetails);
    }

    getjobDetails = () => {
        
		fetch("http://localhost:3001/api/job/view", {
			method: 'GET',
		})
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({ jobDetails: result.jobs });
		  console.log(result.jobs);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          alert('Error in fetching data');
        }
      )
        //console.log(data);
        return data;
    };

    render() {
        const { isAuthenticated } = this.props.auth;
        return (
            <div className="container">
                {
                    isAuthenticated() && (
                        <Grid>
                            <Row>

                                <Col xs={3}>
								 <Nav bsStyle="pills" stacked>
									<NavItem eventKey={1} title="Item">
									  Hiring Ratio
									</NavItem>
									<NavItem eventKey={2} title="Item2">
									  Qualified Ratio
									</NavItem>
									<NavItem eventKey={3} title="Item">
									  Joining Index 
									</NavItem>
								  </Nav>
								</Col>

                            </Row>
                        </Grid>
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

export default InfoRad;
