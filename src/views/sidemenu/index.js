import React from 'react';
import {
	Menu,
	Layout,
	Spin,
	Icon
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
			panes:[],
			collapsed:false,
			spinning:false
		}
	}
	onChange(activeKey){
		this.setState({
			activeKey
		});
	}
	onEdit(targetKey, action){
		console.log(targetKey, action)
		this[action](targetKey);
	}
	add(){
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
	remove(targetKey){
		console.log(this.state.panes)
		let activeKey = this.state.activeKey;
		let lastIndex;
		this.state.panes.forEach((pane, i) => {
			if (pane.key === targetKey) {
				lastIndex = i - 1;
			}
		});
		const panes = this.state.panes.filter(pane => pane.key != targetKey);

		console.log(panes, 'filter')
		if (lastIndex >= 0 && activeKey === targetKey) {
			activeKey = panes[lastIndex].key;
		}
		this.setState({
			panes,
			activeKey
		});
	}
	setIframe(item){
		console.log(item, this.state.panes)
		var obj = {
			title:item.key,
			view:item.key,
			isLoading:true,
			key:this.state.panes.length
		}
		for(var i=0; i<this.state.panes.length; i++){
			if(this.state.panes[i].view == obj.view ){
				this.setState({activeKey:i.toString()});
				return;
			}
		}
		this.state.panes.push(obj);
		this.setState({panes:this.state.panes, activeKey:(this.state.panes.length-1).toString()})
	}
	iframeOnload(pane, index){
		pane.isLoading = false;
		this.state.panes.splice(index, 1, pane);
		this.setState({panes:this.state.panes})
		
	}
	toggleCollapsed(){
		this.setState({
	     	collapsed: !this.state.collapsed,
	    });
	}
	render() {
		return (
			<div className="admin">
				<Layout>
					<Header></Header>
					<Layout>
				        <Sider>
						    <div className="left-side">
						    	<div className="toggle-sidebar">
						    		<a href="javascript:;" onClick={this.toggleCollapsed.bind(this)}>
							          	<Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
							        </a>
						    	</div>
								<Menu mode="inline" theme="dark" inlineCollapsed={this.state.collapsed} onSelect={this.setIframe.bind(this)}>
								  	<Menu.Item key="as"><span><Icon type="home" /><span>菜单一</span></span></Menu.Item>
								  	<Menu.SubMenu title={<span><Icon type="appstore" /><span>菜单二</span></span>}>
								    	<Menu.Item key="/">子菜单项1</Menu.Item>
								    	<Menu.Item key="/todo">子菜单项2</Menu.Item>
								  	</Menu.SubMenu>
								  	<Menu.Item key="2"><span><Icon type="mail" /><span>菜单三</span></span></Menu.Item>
								</Menu>
							</div>
						</Sider>
				        <Content style={{position:'relative'}}>
							 	<Tabs
						          	hideAdd
						          	onChange={this.onChange.bind(this)}
						          	activeKey={this.state.activeKey}
						          	type="editable-card"
						          	onEdit={this.onEdit.bind(this)}
						        >

						          	{
						          		this.state.panes.map((pane,index) => <TabPane tab={pane.title} key={index}>
						          			<div className="page-box moveup">
						          				<div style={{width:'100%', height:'100%', position:'absolute' ,display:'flex', alignItems:'center', justifyContent:'center'}}>
								        			<Spin spinning={pane.isLoading} delay={500} />
											    </div>
									     		<iframe onLoad={this.iframeOnload.bind(this, pane, index)} width="100%" height="100%" src={pane.view} />
									     	</div>
						          		</TabPane>)
						          	}
						     	</Tabs>
						     	
				        </Content>
			        </Layout>
			    </Layout>
			</div>
		)
	}
}

export default SideMenu;