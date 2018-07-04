import React, { Component } from 'react';
import { Row, Col, Grid , Button,  Thumbnail , Label, Table } from 'react-bootstrap';
import JobCard from "./JobCard"
import data from "../data/jobs.json";

class ViewInterviewApplicants extends Component {
	
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
                                    <Col xs={12} md={12}>
									<h3>List of Candidates</h3>
                                        <Table striped bordered condensed hover>
  <thead>
    <tr>
      <th>Candidate Name</th>
      <th>Job Id</th>
	  <th>Pannel Id</th>
	  <th>Interviewed For</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Vivek</td>
      <td>Job - 12345 (Node Js Dev)</td>
      <td>PAN_8964</td>
	  <td>Level 1</td>
      <td>
	  <Button bsStyle="primary" onClick={this.goTo.bind(this, 'TakeInterview')}>Take Interview</Button>
	  </td>
    </tr>
	<tr>
      <td>Dinesh</td>
      <td>Job - 12345 (Node Js Dev)</td>
      <td>PAN_8964</td>
	  <td>Level 1</td>
      <td>
	  <Button bsStyle="primary" onClick={this.goTo.bind(this, 'TakeInterview')}>Take Interview</Button>
	  </td>
    </tr>
   
  </tbody>
</Table>
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

export default ViewInterviewApplicants;
