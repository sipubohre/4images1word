import React from 'react';
import Config from 'Config'
import HandleError from './handleerror'
import {Helmet} from "react-helmet";
import { BrowserRouter as Router, Route, Link, Prompt, Switch} from 'react-router-dom'
var retry = true;


export default class home extends React.Component {

  constructor(props) {
    super(props);
    this.state = 
      {
        'errortext':''
      };
  }

  render() {
    var apierr
    if(this.state.retryBtn){
        apierr = this.state.retryBtn
    }
    else{
        apierr = ""
    }
    var networkerror
    if(this.state.errortext)
      networkerror=<HandleError errortext={this.state.errortext} />
    return (
      <div>
        <Helmet>
          <title>React basic setup</title>
          <meta name="description" content= "This is main page of basic setup of react using routing"/>
          <meta itemprop="name" content="React setup" />
          <meta itemprop="description" content="This is a project named React basic setup" />
        </Helmet>
        <div>
          {networkerror}
          <div id="apierror"></div>
          {apierr}
          <div>
            Welcome in react basic setup
          </div>
        </div>
      </div>
    );
  }
}