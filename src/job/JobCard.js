import React, { Component } from 'react';
import { Button,  Thumbnail , Label} from 'react-bootstrap';

class JobCard extends Component {
	

	applyJob = () => {
        
		fetch("http://localhost:3001/api/job/update", {
			method: 'PUT',
			headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: this.props.JobDetails._id,
				appliedUsers: { user:"Vivek"}
			})
		})
		.then(res => res.json())
		.then((response) =>{
			console.log(response)
			if(response.success){
				alert("Applied Job");
			}else{
				alert("Error occured");
			}
		},(error) => {
          alert('Error in fetching data');
        })
    };

	
	render() {
		var membersToRender = (this.props.JobDetails.appliedUsers !== undefined) ? this.props.JobDetails.appliedUsers.length : 0;
		
		var d =this.props.JobDetails.appliedUsers;
		console.log(membersToRender);
    return (
	
      <div>
        {this.props.JobDetails ? (
            
            <Thumbnail>
            <h3>{this.props.JobDetails.jobTitle}</h3>
            <p>{this.props.JobDetails.skillSet}</p>
			<p>Applied Count ::{membersToRender}</p>
			<Label bsStyle="success">Shortlisted</Label><br/><br/>
            <p>
            <Button bsStyle="primary" onClick={this.applyJob}>Apply</Button>&nbsp;
			 <Button bsStyle="primary" >Book Slot</Button>&nbsp;
			 <Button bsStyle="primary" >Download IC</Button>
			
			
            </p>
        </Thumbnail>
        ) : null}
      </div>
    );
	}
  };

export default JobCard;