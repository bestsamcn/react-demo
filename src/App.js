import React from 'react';

class App extends React.Component{
	constructor(props) {
		super(props);
	}
	render(){
		return(
			<div className="router-view">
				{this.props.children}
			</div>
		)
	}
}

export default App;