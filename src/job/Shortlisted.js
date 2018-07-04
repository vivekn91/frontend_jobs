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
		
    return (
	
      <div>
        {this.props.JobDetails ? (
            

			<tr>
			  <td>1</td>
			  <td>{this.props.JobDetails.user}</td>
			  <td><Button bsStyle="primary" onClick={this.applyJob}>Shortlist</Button></td>
			</tr>
		 
        ) : null}
      </div>
    );
	}
  };

export default Shortlisted;