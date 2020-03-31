import React, { Component } from 'react'
import { Table, Card, Button } from 'antd'
import { PlusOutlined, EditOutlined } from '@ant-design/icons'
// import _ from 'lodash'
import moment from 'moment'


/**
 * 计算table width
 * @param {*} columns [table columns]
 */
function calculateTableWidth(columns){
	let retWidth = 0 
	for(const col of columns){
		retWidth += col.width
	}
	return retWidth
}

/**
 * 转换时间
 * @param {number} target
 */
function transformTime(target){
	return moment(target).format('YYYY-MM-DD HH:mm:ss')
}

function handleState(target){
    return (target === 9 ? '下架' : '上架')
}

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        fixed: 'left',
        key: 'id',
        width: 80,
    },
    {
        title: '店名',
        dataIndex: 'clinic_name',
        fixed: 'left',
        key: 'clinic_name',
        width: 220,
    },
    {
        title: '负责人',
        dataIndex: 'user_name',
        key: 'user_name',
        width: 140,
    },
    {
        title: '地区',
        dataIndex: 'large_address',
        key: 'large_address',
        width: 200,
    },
    {
        title: '街道',
        dataIndex: 'small_address',
        key: 'small_address',
        width: 300,
    },
    {
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time',
        width: 200,
        render: (tag)=>(
            <span>{transformTime(tag)}</span>
        )
    },
    {
        title: '更新时间',
        dataIndex: 'update_time',
        key: 'update_time',
        width: 200,
        render: (tag)=>(
            <span>{transformTime(tag)}</span>
        )
    },
    {
        title: '联系人',
        dataIndex: 'contact_name',
        key: 'contact_name',
        width: 120,
    },
    {
        title: '联系电话',
        dataIndex: 'contact_tel',
        key: 'contact_tel',
        width: 150,
    },
    {
        title: '经度',
        dataIndex: 'lng',
        key: 'lng',
        width: 200,
    },
    {
        title: '纬度',
        dataIndex: 'lat',
        key: 'lat',
        width: 200,
    },
    {
        title: '特色',
        dataIndex: 'special_info',
        key: 'special_info',
        width: 200,
    },
    {
        title: '备注',
        dataIndex: 'note',
        key: 'note',
        width: 200,
        textWrap: 'word-break',
    },
    {
        title: '状态',
        dataIndex: 'state',
        fixed: 'right',
        key: 'state',
        width: 120,
        render: (tag)=>(
            <span>{handleState(tag)}</span>
        ),
        
    },
]

export default class HomePage extends Component{

    state = {
        clinicList: [
            {
                id: 1,
                clinic_name: '门诊1',
                user_id: 1,
                user_name: '张三',
                area_id: 110000,
                large_address: '北京北京市海淀区',
                small_address: 'xx街道xx大厦',
                create_time: 1585207796000,
                update_time: 0,
                contact_tel: '13212344321',
                contact_name: '刘策',
                lat: '39.123456',
                lng: '116.121212',
                special_info: '',
                note: '',
                state: 1,
            },
            {
                id: 2,
                clinic_name: '门诊2',
                user_id: 1,
                user_name: '张三',
                area_id: 110000,
                large_address: '北京北京市海淀区',
                small_address: 'xx街道xx大厦',
                create_time: 1585207796000,
                update_time: 0,
                contact_tel: '13212344321',
                contact_name: '刘策',
                lat: '39.123456',
                lng: '116.121212',
                special_info: '',
                note: '',
                state: 1,
            },
        ],
    }

    tableWidth = calculateTableWidth(columns)

    _onRowChange = (selectedRowKeys, selectedRows)=>{

    }

    render(){
        return (
            <div style={{flex: 1}}>
                <Card>
                    <Button type="primary" onClick={()=>null}>
                        <PlusOutlined/>创建门诊
                    </Button>
                    <Button type="primary" style={{marginLeft: 20}} onClick={()=>null}>
                        <EditOutlined/>编辑门诊
                    </Button>
                </Card>
                <div style={{marginTop: 10}}>
                    <Table 
                        dataSource={this.state.clinicList} columns={columns}
                        rowKey={record => record.id}
                        bordered pagination={null}
                        rowSelection={{type: 'radio',
                            onChange: this._onRowChange
                        }}
                        scroll={{
                            x: this.tableWidth,
                        }}
                    />
                </div>
            </div>
        )
    }
}