import { BrowserRouter as Router,Route,Link,Prompt} from 'react-router-dom'


 export default class Nomatch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render(){
		return (
			<div>
        		<h1>sorry!!! you are not authorised for this type of content..</h1>
			</div>
			);
	}
};
