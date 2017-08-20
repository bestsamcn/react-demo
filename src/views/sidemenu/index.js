import React from 'react';
import {
	Menu
} from 'antd';
import {
	Layout
} from 'antd';
const {
	Header,
	Footer,
	Sider,
	Content
} = Layout;
import {
	Tabs,
	Button
} from 'antd';
const TabPane = Tabs.TabPane;
import Frame from 'react-frame-component';
import '@/assets/css/sidemenu/index.css';
class SideMenu extends React.Component {
	constructor(props) {
		super(props);
		this.newTabIndex = 0;
		

		this.state = {
			name: '',
			todoList: [],
			completed: 0,
			activeKey: '',
			panes:[]
		}
	}
	onChange = (activeKey) => {
		this.setState({
			activeKey
		});
	}
	onEdit = (targetKey, action) => {
		this[action](targetKey);
	}
	add = () => {
		const panes = this.state.panes;
		const activeKey = `newTab${this.newTabIndex++}`;
		panes.push({
			title: 'New Tab',
			content: 'New Tab Pane',
			key: activeKey
		});
		this.setState({
			panes,
			activeKey
		});
	}
	remove = (targetKey) => {
		let activeKey = this.state.activeKey;
		let lastIndex;
		this.state.panes.forEach((pane, i) => {
			if (pane.key === targetKey) {
				lastIndex = i - 1;
			}
		});
		const panes = this.state.panes.filter(pane => pane.key !== targetKey);
		if (lastIndex >= 0 && activeKey === targetKey) {
			activeKey = panes[lastIndex].key;
		}
		this.setState({
			panes,
			activeKey
		});
	}
	setIframe(item){
		var obj = {
			title:item.key,
			view:item.key
		}
		console.log(this.state.panes.indexOf(obj), 'fffffffffffff')
		if(this.state.panes.indexOf(obj) >=0){
			this.setState({
				activeKey:this.state.panes.indexOf(obj).toString()
			});
			return;
		}
		this.state.panes.push(obj);
		this.setState({panes:this.state.panes, activeKey:this.state.panes.length.toString()})
	}
	render() {
		return (
			<div className="admin">
				<Layout>
					<Header>Header</Header>
					<Layout>
				        <Sider>
						    <div className="left-side" style={{width:200}}>
								<Menu mode="inline" theme="dark" onSelect={this.setIframe.bind(this)}>
								  	<Menu.Item key="as">菜单项</Menu.Item>
								  	<Menu.SubMenu title="子菜单">
								    	<Menu.Item key="/">子菜单项1</Menu.Item>
								    	<Menu.Item key="/todo">子菜单项2</Menu.Item>
								  	</Menu.SubMenu>
								  	<Menu.Item key="2">单项2</Menu.Item>
								</Menu>
							</div>
						</Sider>
				        <Content style={{position:'relative'}}>
							 	<Tabs
						          	hideAdd
						          	onChange={this.onChange}
						          	activeKey={this.state.activeKey}
						          	type="editable-card"
						          	onEdit={this.onEdit}
						        >
						          	{
						          		this.state.panes.map((pane,index) => <TabPane tab={pane.title} key={index}>
						          			<div className="page-box" style={{width:'100%', height:'100%', position:'fixed'}}>
									     		<iframe width="100%" height="100%" src={pane.view} />
									     	</div>
						          		</TabPane>)}
						     	</Tabs>
						     	
				        </Content>
			        </Layout>
			    </Layout>
			</div>
		)
	}
}

export default SideMenu;