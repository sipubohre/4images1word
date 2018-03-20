import React from 'react';
import { BrowserRouter as Router, Route, Link, Prompt, Switch} from 'react-router-dom'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false , error:''};
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true , error: error});
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <div><h1>Something went wrong.</h1><p>{this.state.error}</p></div>;
    }
    return this.props.children;
  }
}