import React, { Component } from 'react';
import { Row, Col, Grid, Table, Button, Tabs, Tab } from 'react-bootstrap';
import Shortlisted from "./Shortlisted"
import data from "../data/jobs.json";

class ShortList extends Component {

    state = {
        jobDetails: data,
        searchString: ""
    };

    constructor() {
        super();
        this.getjobDetails();
        //console.log(this.state.jobDetails);
    }
	
	applyJob = () => {
		alert("User Shorlisted")
	}
	
	reject = () =>{
		alert("User Rejected")
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
							<h1>Node Js Dev</h1>
							{this.state.jobDetails !== [] ? (
							 <Col xs={12} md={12}>
                               <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
  <Tab eventKey={1} title="Applied users">
    <Table striped bordered condensed hover>
								  <thead>
									<tr>
									  <th>#</th>
									  <th>Users</th>
									  <th>Resume</th>
									  <th>Action</th>
									</tr>
								  </thead>
								  <tbody>
                                 <tr>
									  <td>1</td>
									  <td><a href="#">Vivek</a></td>
									   <td><a href="#">vivek_resume.pdf</a></td>
									  <td><Button bsStyle="primary" onClick={this.applyJob}>Shortlist</Button>&nbsp;
									  <Button bsStyle="disabled"  onClick={this.reject}>Reject</Button></td>
									</tr>
									<tr>
									  <td>2</td>
									  <td><a href="#">Kumar</a></td>
									   <td><a href="#">kumar_resume.doc</a></td>
									  <td><Button bsStyle="disabled" onClick={this.applyJob}>Shortlist</Button>&nbsp;
									  <Button bsStyle="danger" onClick={this.reject}>Reject</Button></td>
									</tr>
									 </tbody>
								</Table>
  </Tab>
  <Tab eventKey={2} title="Shorlisted">
    <Table striped bordered condensed hover>
								  <thead>
									<tr>
									  <th>#</th>
									  <th>Users</th>
									   <th>Pannel Id</th>
									  <th>Interview Status</th>
									</tr>
								  </thead>
								  <tbody>
                                 <tr>
									  <td>1</td>
									  <td><a href="#">Vivek</a></td>
									  <td> <a href="#">PNL 123545</a></td>
									  <td>Level 1</td>
									</tr>
									<tr>
									   <td>2</td>
									  <td><a href="#">Arun</a></td>
									  <td> <a href="#">PNL 123545</a></td>
									  <td>Yet to attended</td>
									</tr>
									 </tbody>
								</Table>
  </Tab>
  <Tab eventKey={3} title="Rejected" disabled>
    Tab 3 content
  </Tab>
</Tabs>
								
								
								
                                        
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

export default ShortList;
