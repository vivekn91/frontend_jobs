import React, { Component } from 'react';
import { Button,  Thumbnail } from 'react-bootstrap';

const JobCard = props => {
    return (
      <div>
        {props.JobDetails ? (
            
            <Thumbnail>
            <h3>{props.JobDetails.jobTitle}</h3>
            <p>{props.JobDetails.skillSet}</p>
            <p>
            <Button bsStyle="primary">Apply</Button>&nbsp;
            <Button bsStyle="default">Button</Button>
            </p>
        </Thumbnail>
        ) : null}
      </div>
    );
  };

export default JobCard;