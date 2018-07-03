import React, { Component } from 'react';
import { Button,  Thumbnail } from 'react-bootstrap';

class Shortlisted extends Component {
	

	applyJob = () => {
        
		fetch("http://localhost:3001/api/job/update", {
			method: 'PUT',
			headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: this.props.JobDetails._id,
				shortlistedUsers: {user:"Vivek"}
			})
		})
		.then(res => res.json())
		.then((response) =>{
			console.log(response)
			if(response.success){
				alert("Shortlisted Job");
			}else{
				alert("Error occured");
			}
		},(error) => {
          alert('Error in fetching data');
        })
    };

	
	render() {
		var membersToRender = (this.props.JobDetails.shortlistedUsers !== undefined) ? this.props.JobDetails.shortlistedUsers.length : 0;
		
		var d =this.props.JobDetails.shortlistedUsers;
		console.log(membersToRender);
    return (
	
      <div>
        {this.props.JobDetails ? (
            
            <Thumbnail>
            <h3>{this.props.JobDetails.jobTitle}</h3>
            <p>{this.props.JobDetails.skillSet}</p>
            <p>
			
            <Button bsStyle="primary" onClick={this.applyJob}>Shortlist</Button>&nbsp;
            <Button bsStyle="default disabled">Shorlisted count : {membersToRender}</Button>
            </p>
        </Thumbnail>
        ) : null}
      </div>
    );
	}
  };

export default Shortlisted;