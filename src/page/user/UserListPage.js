import React, { Component } from 'react'
import _ from 'lodash'
import { Card, Button, Form, Input, Table, Modal, message,} from 'antd'
import { PlusOutlined, EditOutlined } from '@ant-design/icons'

// const 
const FormItem = Form.Item
const USER_EDIT_TYPE = 2
const USER_ADD_TYPE = 1

const userListColumns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 80,
    },
    {
        title: '名字',
        dataIndex: 'user_name',
        key: 'user_name',
        width: 80,
    },
    {
        title: '电话',
        dataIndex: 'tel',
        key: 'tel',
        width: 150,
    },
    {
        title: '密码',
        dataIndex: 'password',
        key: 'password',
        width: 140,
    }
]

class UserPage extends Component{
    state = {
        userList: [
            {
                id: 3,
                user_name: 'leader',
                password: '12345678',
                tel: '15310010003',
            },
            {
                id: 4,
                user_name: 'root',
                password: '12345678',
                tel: '15310010004',
            },
        ],
        modalVisible: false,
        modalTitle: '',
        modalType: 0,
    }

    formRef = React.createRef();
    selectUser = null

    _onRowChange = (selectedRowKeys, selectedRows)=>{
        // console.log('selectedRowKeys =>', selectedRowKeys, '   selectedRows =>', selectedRows)
        this.selectUser = _.isArray(selectedRows) && _.isObject(selectedRows[0]) ? selectedRows[0] : {}
        if(this.formRef && this.formRef.current){
            const {setFieldsValue} = this.formRef.current
            if(_.isFunction(setFieldsValue)){
                setFieldsValue(this.selectUser)
            }
        }
    }

    _addClick = ()=>{
        this.setState({
            modalVisible: true,
            modalTitle: '创建用户',
            modalType:  USER_ADD_TYPE,
        })
    }

    _editClick= ()=>{
        if(!this._checkSelectUser())
            return
        this.setState({
            modalVisible: true,
            modalTitle: '编辑用户',
            modalType:  USER_EDIT_TYPE,
        })
    }

    _checkSelectUser = ()=>{
        if(!this.selectUser){
            message.warning('请选一个员工')
            return false
        }
        return true   
    }

    _modalConfirmClick = async ()=>{
        try{
            if(this.formRef && this.formRef.current){
                const {validateFields, resetFields} = this.formRef.current
                const values = await validateFields()
                await resetFields()

                console.log('_modalConfirmClick values=>', values)
            }
            this.setState({
                modalVisible: false
            })
        }catch(e){
            console.log('_modalConfirmClick e=>', e)
        }
    }

    _modalCancelClick = async ()=>{
        try{
            if(this.formRef && this.formRef.current){
                const {resetFields} = this.formRef.current
               
                await resetFields()
            }
            this.setState({
                modalVisible: false
            })
        }catch(e){
            console.log('_modalCancelClick e=>', e)
        }
    }

    render(){
        const {userList, modalVisible, modalTitle, modalType} = this.state
        const { selectUser } = this
        console.log('render selectUser=>', selectUser)
        return (
            <div style={{flex: 1}}>
                <Card>
                    <Button type="primary" onClick={this._addClick}>
                        <PlusOutlined/>创建员工
                    </Button>
                    <Button type="primary" style={{marginLeft: 20}} onClick={this._editClick}>
                        <EditOutlined/>编辑员工
                    </Button>
                </Card>
                <div style={{marginTop: 10}}>
                    <Table dataSource={userList} columns={userListColumns} 
                        rowKey={record => record.id}
                        bordered pagination={false}
                        rowSelection={{type: 'radio',
                            onChange: this._onRowChange
                        }}
                    />
                </div>
                <Modal visible={modalVisible} title={modalTitle}
                    okText="确认"
                    cancelText="取消"
                    onCancel={this._modalCancelClick}
                    onOk={this._modalConfirmClick}
                >
                    <Form 
                        ref={this.formRef}
                        initialValues={modalType === USER_EDIT_TYPE ? selectUser : null}
                    >
                        <FormItem label="名字" name="user_name" rules={[
                            {required: true, message: '请输入正确的姓名！'},
                            {max: 20, min: 1, message: '长度1~20位'}
                        ]}>
                            <Input placeholder='输入名字' />
                        </FormItem>
                        <FormItem label="密码" name="password" rules={[
                            {required: true, message: '请输入正确的密码！'},
                            {max: 20, min: 8, message: '长度8~20位'}
                        ]}>
                            <Input.Password placeholder='输入密码(8~20位)'/>
                        </FormItem>
                        <FormItem label="手机号" name="tel" rules={[
                            {required: true, message: '请输入正确的电话！'},
                            {pattern: /^1\d{10}/, message: '手机号不正确'}
                        ]}>
                            <Input placeholder='输入手机号' />
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default UserPage