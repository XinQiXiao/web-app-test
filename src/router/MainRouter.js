import React, { Component } from 'react'
import { Route, HashRouter, Switch, Redirect } from 'react-router-dom'

// router
import AdminRouter from './AdminRouter'

// page
import { HomePage, UserListPage } from '../page'

class App extends Component{
    render(){
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default class RouterComponent extends Component{
    render(){
        return (
            <HashRouter>
                <App>
                    <Switch>
                        <Route path="/" render={()=>
                            <AdminRouter>
                                <Switch>
                                    <Route path="/home" component={HomePage}/>
                                    <Route path="/user" component={UserListPage}/>
                                    <Redirect to="/home"/>
                                </Switch>
                            </AdminRouter>
                        }/>
                    </Switch>
                </App>
            </HashRouter>
        )
    }
}