import React from 'react';
import { Route, Router } from 'react-router-dom';
import App from './App';
import Home from './Home/Home';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';
import Search from './job/Search';
import ShortList from './job/ShortList';
import ViewApplicant from './job/ViewApplicant';
import ViewInterviewApplicants from './job/ViewInterviewApplicants';
import TakeInterview from './job/TakeInterview';
import OnBoarding from './job/OnBoarding';
import Roles from './job/Roles';
import InfoRad from './job/InfoRad';

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
      <Router history={history}>
        <div>
          <Route path="/" render={(props) => <App auth={auth} {...props} />} />
          <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
          <Route path="/search" render={(props) => <Search auth={auth} {...props} />} />
		  <Route path="/shortlist" render={(props) => <ShortList auth={auth} {...props} />} />
		  <Route path="/applicant" render={(props) => <ViewApplicant auth={auth} {...props} />} />
		   <Route path="/ViewInterviewApplicants" render={(props) => <ViewInterviewApplicants auth={auth} {...props} />} />
		    <Route path="/TakeInterview" render={(props) => <TakeInterview auth={auth} {...props} />} />
			<Route path="/OnBoarding" render={(props) => <OnBoarding auth={auth} {...props} />} />
			<Route path="/role" render={(props) => <Roles auth={auth} {...props} />} />
			
			<Route path="/IR" render={(props) => <InfoRad auth={auth} {...props} />} />
		  
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} /> 
          }}/>
        </div>
      </Router>
  );
}
