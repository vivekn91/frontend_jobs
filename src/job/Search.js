import React, { Component } from 'react';
import { Row, Col, Grid } from 'react-bootstrap';
import JobCard from "./JobCard"
import data from "../data/jobs.json";

class Search extends Component {

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
        this.setState({ jobDetails: data });
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
                                        {this.state.jobDetails.map(currentJob => (
                                            <JobCard JobDetails={currentJob} />

                                        ))}
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

export default Search;
