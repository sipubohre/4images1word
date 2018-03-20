var React = require('react')
import { BrowserRouter as Router, Route, Link, Prompt, Switch} from 'react-router-dom'

export default class handleerror extends React.Component {
  constructor(props) {
    super(props);
    this.state = 
      {
        errortext: ''
      };
  }

  componentDidMount() {
    console.log('err msg :' , this.props.errortext)
    this.setState({errortext : this.props.errortext});
  }

  componentWillReceiveProps(newProps) {
    console.log('err msg 234:' , newProps.errortext)
    this.setState({errortext : newProps.errortext});
  }

  windowRefresh() {
    window.location.reload()
  }

  render() {
    if(this.state.errortext){
        $('.alertbox').css('display','flex');
        var error, retry
          error = this.state.errortext
          retry = <Link className="alertretry" onClick={this.windowRefresh}>Refresh <i className="material-icons">autorenew</i></Link>
       }
    return (
      <div className="alertbox" style={{display: 'none'}}>
          <div className="alert">
              <div className="alerthead">Network Connection Failed</div>
              <p className="alerttext">{error}</p>
              {retry}
          </div>
      </div>
    )    
  }
}