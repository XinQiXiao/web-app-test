import React, { Component } from 'react'
import {Row, Col} from 'antd'

// style
import './header.less'

export default class Header extends Component{

    state = {
        systemTime: '2013-3-31 10:00',
        userName: 'admin'
    }


    render(){
        const {systemTime, userName = ''} = this.state
        return (
            <div className="header-view">
                <Row className="header-top">
                    {/* <Col span={6} className="logo">
                        <img src="/assets/logo-ant.svg" alt="logo-ant-header"/>
                        <span>后台 通用信息页面</span>
                    </Col> */}
                    <Col span={24} className="welcome">
						<span>欢迎，{userName}</span>
						<span style={{marginLeft: 10, color: '#0000ff'}} onClick={this._signOut}>退出</span>
					</Col>
                </Row>
                <Row className="header-breadcrumb">
					{/* <Col span={4} className="breadcrumb-title">
						<span>{menuName}</span>
					</Col> */}
					<Col span={20} className="time-view">
						<span>{systemTime}</span>
					</Col>
				</Row>
            </div>
        )
    }
}