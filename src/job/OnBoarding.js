import React, { Component } from 'react';
import { Row, Col, Grid , Button,  Thumbnail  , FormGroup, ControlLabel,Form, FormControl, Checkbox, Radio } from 'react-bootstrap';
import data from "../data/jobs.json";

class OnBoarding extends Component {
	
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
									<h2>On boarding</h2>
									<Thumbnail>
									<Form horizontal>
									<FormGroup controlId="formHorizontalPassword">
										<Col componentClass={ControlLabel} sm={2}>
										  Offer Letter
										</Col>
										<Col sm={10}>
										   <Button type="buton">Download</Button>
										</Col>
									  </FormGroup>
									  <FormGroup controlId="formHorizontalEmail">
										<Col componentClass={ControlLabel} sm={2}>
										  Acknowledge Offer
										</Col>
										<Col sm={10}>
										  <Radio name="radioGroup" inline>
												Accept Offer
											  </Radio>{' '}
											  <Radio name="radioGroup" inline>
												Reject
											  </Radio>{' '}
											  <Radio name="radioGroup" inline>
												Review
											  </Radio>
										</Col>
									  </FormGroup>

									  <FormGroup controlId="formHorizontalPassword">
										<Col componentClass={ControlLabel} sm={2}>
										  Joining Date
										</Col>
										<Col sm={2}>
										  <FormControl type="date" placeholder="Joining Date" />
										</Col>
									  </FormGroup>
									  
									   <FormGroup controlId="formHorizontalPassword">
										<Col componentClass={ControlLabel} sm={2}>
										  Upload Docs
										</Col>
										<Col sm={10}>
										  <FormControl type="file" placeholder="docs" />
										</Col>
									  </FormGroup>

									  <FormGroup>
										<Col smOffset={2} sm={10}>
										  <Checkbox>Digitally signing all docs</Checkbox>
										</Col>
									  </FormGroup>

									  <FormGroup>
										<Col smOffset={2} sm={10}>
										  <Button type="submit">Submit</Button>
										</Col>
									  </FormGroup>
									</Form>
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

export default OnBoarding;
