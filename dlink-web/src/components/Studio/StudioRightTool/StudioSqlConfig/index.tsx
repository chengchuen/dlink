/*
 *
 *  Licensed to the Apache Software Foundation (ASF) under one or more
 *  contributor license agreements.  See the NOTICE file distributed with
 *  this work for additional information regarding copyright ownership.
 *  The ASF licenses this file to You under the Apache License, Version 2.0
 *  (the "License"); you may not use this file except in compliance with
 *  the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */


import {connect,useIntl} from "umi";
import {StateType} from "@/pages/DataStudio/model";
import {
  Form, InputNumber, Select, Tag, Row, Col,  Tooltip, Button,
} from "antd";
import {MinusSquareOutlined} from "@ant-design/icons";
import styles from "./index.less";
import {useEffect, useState} from "react";
import { Scrollbars } from 'react-custom-scrollbars';

const { Option } = Select;

const StudioSqlConfig = (props: any) => {

  const international = useIntl();
  const l = (key: string, defaultMsg?: string) => international.formatMessage({id: key,defaultMsg})

  const {current,form,dispatch,tabs,database,toolHeight} = props;

  form.setFieldsValue(current.task);


  const onValuesChange = (change:any,all:any)=>{
    let newTabs = tabs;
    for(let i=0;i<newTabs.panes.length;i++){
      if(newTabs.panes[i].key==newTabs.activeKey){
        for(let key in change){
          newTabs.panes[i].task[key]=change[key];
        }
        break;
      }
    }

    dispatch&&dispatch({
      type: "Studio/saveTabs",
      payload: newTabs,
    });
  };


  const getDataBaseOptions = () => {
    const itemList = [];
    for (const item of database) {
      if(item.type.toUpperCase() === current.task.dialect.toUpperCase()) {
        const tag = (<><Tag color={item.enabled ? "processing" : "error"}>{item.type}</Tag>{item.alias === "" ? item.name : item.alias}</>);
        itemList.push(<Option key={item.id} value={item.id} label={tag}>
          {tag}
        </Option>)
      }
    }
    return itemList;
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <div style={{float: "right"}}>
            <Tooltip title="最小化">
              <Button
                type="text"
                icon={<MinusSquareOutlined />}
              />
            </Tooltip>
          </div>
        </Col>
      </Row>
      <Scrollbars style={{height:(toolHeight-32)}}>
    <Form
      form={form}
      layout="vertical"
      className={styles.form_setting}
      onValuesChange={onValuesChange}
    >
      <Row>
        <Col span={24}>
          <Form.Item label={l('pages.datastudio.label.datasource','数据源')} tooltip={`选择 Sql 语句执行的数据源`}
                     name="databaseId"
                     className={styles.form_item}>
            <Select
              style={{width: '100%'}}
              placeholder="选择数据源"
              optionLabelProp="label"
            >
              {getDataBaseOptions()}
            </Select>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label={l('pages.datastudio.label.maxrows','最大行数')}  className={styles.form_item} name="maxRowNum"
            tooltip='预览数据的最大行数'
          >
            <InputNumber min={1} max={9999} defaultValue={100} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
      </Scrollbars>
      </>
  );
};

export default connect(({Studio}: { Studio: StateType }) => ({
  database: Studio.database,
  current: Studio.current,
  tabs: Studio.tabs,
  toolHeight: Studio.toolHeight,
}))(StudioSqlConfig);
