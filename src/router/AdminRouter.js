import React, { Component } from 'react'
import { Row, Col } from 'antd'

// style
import '../style/common.less'

// components
import { Header, Footer, NavLeft } from '../components'

class AdminRouter extends Component{
    render(){
        return (
            <Row className="container">
                <Col span={4} className="nav-left">
                    <NavLeft />
                </Col>
                <Col span={20} className="main">
                    <Header />
                    <div className="content">
                        {this.props.children}
                    </div>
                    <Footer />
                </Col>
            </Row>
        )
    }
}

export default AdminRouter