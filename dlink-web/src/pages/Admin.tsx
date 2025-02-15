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


import React from 'react';
import {HeartTwoTone, SmileTwoTone} from '@ant-design/icons';
import {Alert, Card, Typography} from 'antd';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {useIntl} from 'umi';

export default (): React.ReactNode => {

  const international = useIntl();
  const l = (key: string, defaultMsg?: string) => international.formatMessage({id: key, defaultMessage: defaultMsg})

  return (
    <PageHeaderWrapper
      content={l('pages.admin.subPage.title',' 这个页面只有 admin 权限才能查看')}
    >
      <Card>
        <Alert
          message={l('pages.welcome.alertMessage','实时计算平台 Dlink & Apache Flink 即将发布，目前为体验版，版本号为0.1.0。')}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 48,
          }}
        />
        <Typography.Title level={2} style={{textAlign: 'center'}}>
          <SmileTwoTone/> Ant Design Pro <HeartTwoTone twoToneColor="#eb2f96"/> You
        </Typography.Title>
      </Card>
      <p style={{textAlign: 'center', marginTop: 24}}>
        Want to add more pages? Please refer to{' '}
        <a href="https://pro.ant.design/docs/block-cn" target="_blank" rel="noopener noreferrer">
          use block
        </a>
        。
      </p>
    </PageHeaderWrapper>
  );
};
