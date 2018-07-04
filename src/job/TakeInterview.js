import React, { Component } from 'react';
import { Row, Col, Grid , Button,  Thumbnail  , Label, Table } from 'react-bootstrap';
import JobCard from "./JobCard"
import data from "../data/jobs.json";

class TakeInterview extends Component {
	
	goTo(route) {
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

                                {this.state.jobDetails !== [] ? (
								
                                    <Col xs={6} md={4}>
									<h2>Interview</h2>
									
									<Thumbnail> 
									 <h3><Label bsStyle="default"> Vivek</Label></h3>
									  
									   <p>Technical:
											<input type="range" min="1" max="100" value="50" />
										</p>
										<p>Team Skill:
											<input type="range" min="1" max="100" value="50" />
										</p>
										<p>Notice period:
											<input type="number" value="30" />
										</p>
										<p>Status : &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
											<select>
												<option selected>--Choose--</option>
												<option>Selected</option>
												<option>Rejected</option>
												<option>On-hold</option>
											</select>
										</p>
										
										<p>Feedback :<br/>
											<textarea row="10" cols="30"></textarea>
										</p>
										<p>
										  <Button bsStyle="primary">Save</Button>&nbsp;
										  <Button bsStyle="default"  onClick={this.goTo.bind(this, 'ViewInterviewApplicants')}>Cancel</Button>
										</p>
										</Thumbnail>
                                    </Col>
                                ) : "No Jobs Found"
                                }

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

export default TakeInterview;
