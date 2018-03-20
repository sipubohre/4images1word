import React from 'react';
import {render} from 'react-dom';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, IndexRoute, Route, Link, Prompt, Switch} from 'react-router-dom'
import ErrorBoundary from './errorboundary';
import LandingPage from './landingpage';
import HomePage from './home';
import NoMatch from './nomatch'
import Auth from './auth'

ReactDOM.render(
	<ErrorBoundary>
	  <Router>
	  		<Switch>
			    <LandingPage>
			    	<Route exact path="/" component={HomePage}/>
			    	<Route path="/home" component={HomePage}/>
			    	{/*<Route path='/scholarship' render={() => ( localStorage['usertoken'] ? (<Scholarship/>) : (<Auth/>) )} />*/}
			    </LandingPage>
			    <Route component={NoMatch}/>
		    </Switch>
	  </Router>
  </ErrorBoundary>, document.getElementById('app'))