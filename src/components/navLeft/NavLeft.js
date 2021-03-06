import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, } from 'antd'

// style
import './navleft.less'

// const 
const SubMenu = Menu.SubMenu 
const MenuItem = Menu.Item

export default class Navleft extends Component{

    state = {
        menuTreeNode: [],
        currentKey: ''
    }

    componentDidMount(){
        this._setMenu()
    }

    _setMenu = ()=>{
        const menuList = [
            {   
                title:'首页',
		        key:'/'
            },
            {
                title:'用户',
		        key:'/user'
            }
        ]
        const menuTreeNode = this._renderMenu(menuList)
        this.setState({
            menuTreeNode,
            currentKey: window.location.hash.replace(/#|\?.*$/g, ''), 
        })
    }

    _renderMenu = (list)=>{
        return list.map((item)=>{
			if(item.children){
				return (
					<SubMenu title={item.title} key={item.key}>
						{this._renderMenu(item.children)}
					</SubMenu>
				)
			}
			return (
				<MenuItem key={item.key} title={item.title}>
					<NavLink to={item.key}>{item.title}</NavLink>
				</MenuItem>
			)
		})
    }

    _menuItemClick = ({item, key})=>{
		this.setState({
			currentKey: key,
		})
	}

    render(){
        const {menuTreeNode, currentKey} = this.state
        return (
            <div className="nav-left-view">
                <div className="menu-title">
					<h1>后台系统</h1>
				</div>
                <Menu theme="dark" selectedKeys={[currentKey]} onClick={this._menuItemClick}>
                    {menuTreeNode}
                </Menu>
            </div>
        )
    }
}