var React = require('react');
var ReactDOM = require('react-dom');
var Calendar = require('react-ghcal');

var App = React.createClass({
	render () {
		return (
			<div>
				<Calendar />
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
