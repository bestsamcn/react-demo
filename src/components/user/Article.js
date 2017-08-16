import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table } from 'antd';
import ACTS from '@/redux/actions';
class Article extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
		}	
	}
	componentWillMount() {
		this.props.getArticleList()
	}
	render(){
		const columns = [
			{title:'标题', dataIndex:'title'},
			{title:'浏览', dataIndex:'readNum'},
		]
		let articleList  = this.props.auth.articleList;
		console.log(this.props.auth)
		return(
			<div>
				<Table columns={columns} rowKey={record=>record._id} dataSource={articleList} />
			</div>
		)
	}
}
const mapStatePorps = state=>{
	return{
		...state
	}
}

const mapStateProps = dispatch=>{
	return{
		dispatch,
		getArticleList:(params)=>dispatch(ACTS.auth.getArticleList(params))
	}
}

export default connect(mapStatePorps, mapStateProps)(Article);