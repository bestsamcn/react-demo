import React from 'react';
import { Button, Article } from '@/components/user';
import ACTS from '../../redux/actions';
import { connect } from 'react-redux';
import '@/assets/css/user/index.css';
import store from '@/redux';

class Add extends React.Component{
	constructor(props) {
		super(props);
		this.state={
			name:'',
			password:''
		}
	}
	onSubmit(){
		this.props.dispatch(ACTS.auth.setLogin(!this.props.state.auth.isLogin));
		this.props.dispatch(ACTS.auth.setUserInfo(this.state));
		console.log(store.getState());
	}
	onInputChange(e){
		this.setState({
			[e.target.name]:e.target.value
		});
	}
	render(){
		return(
			<form className="user">
				<input type="text" name="name" onChange={this.onInputChange.bind(this)}/>
				<input type="text" name="password" onChange={this.onInputChange.bind(this)}/>
				<Button buttonText={'Add'} onButtonClick={this.onSubmit.bind(this)}/>
				<Article />
			</form>
		)
	}
}
const mapStateProps = state=>{
	return{
		state
	}
}
const mapDispatchProps = dispatch=>{
	return {
		dispatch
	}
}
export default connect(mapStateProps, mapDispatchProps)(Add);