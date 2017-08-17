import React from 'react';
import './index.css';
class TodoList extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			name:'',
			todoList:[],
			completed:0
		}
	}
	onInputChange(e){
		this.setState({
			name:e.target.value
		})
	}
	onButtonClick(e){
		e.preventDefault();
		if(!this.state.name) return;
		var obj = {
			name:this.state.name,
			isCompleted:false
		}
		this.setState({
			todoList:this.state.todoList.concat(obj),
			name:''
		});
	}
	onItemClick(item, index){
		this.state.todoList[index].isCompleted = !this.state.todoList[index].isCompleted;
		var _length = 0;
		this.state.todoList.map(item=>{
			item.isCompleted && _length++;
		})
		this.setState({
			completed:_length,
			todoList:this.state.todoList
		}) 
	}
	onDelClick(index){
		this.state.todoList.splice(index, 1);
		this.setState({
			todoList:this.state.todoList
		})
	}
	render(){
		return(
			<div className="todolist">
				<div className="form">
					<input type="text" onChange={this.onInputChange.bind(this)} value={this.state.name} />
					<button onClick={this.onButtonClick.bind(this)}>add</button>
				</div>
				<ul>
				 	{this.state.todoList.map((item, index)=>(
				 		<li style={{backgroundColor: item.isCompleted ? '#f1f1f1' : ''}} key={index}>
				 			<span style={{textDecoration: item.isCompleted ? 'line-through' : ''}}  onClick={this.onItemClick.bind(this, item, index)}>{item.name}</span>
				 			<a href="javascript:;" onClick={this.onDelClick.bind(this, index)}>删除</a>
				 		</li>
				 	))}
				</ul>
				<p className="footer">完成：{this.state.completed}/{this.state.todoList.length}</p>
			</div>
		)
	}
}

export default TodoList;