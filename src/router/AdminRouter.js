import React, { Component } from 'react'

class AdminRouter extends Component{
    render(){
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default AdminRouter