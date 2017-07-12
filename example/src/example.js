var React = require('react');
var ReactDOM = require('react-dom');
var Calander = require('react-ghcal');

var App = React.createClass({
	render () {
		return (
			<div>
				<Calander />
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
