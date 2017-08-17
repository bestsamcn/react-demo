import React from 'react';
import { Menu } from 'antd';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import '@/assets/css/sidemenu/index.css';
class SideMenu extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			name:'',
			todoList:[],
			completed:0
		}
	}
	render(){
		return(
			<div className="admin">
				<Layout>
					<Header>Header</Header>
					<Layout>
				        <Sider>
						    <div className="left-side" style={{width:200}}>
								<Menu mode="inline" theme="dark">
								  	<Menu.Item>菜单项</Menu.Item>
								  	<Menu.SubMenu title="子菜单">
								    	<Menu.Item>子菜单项1</Menu.Item>
								    	<Menu.Item>子菜单项2</Menu.Item>
								  	</Menu.SubMenu>
								  	<Menu.Item>单项2</Menu.Item>
								</Menu>
							</div>
						</Sider>
				        <Content>Content</Content>
			        </Layout>
			    </Layout>
			</div>
		)
	}
}

export default SideMenu;