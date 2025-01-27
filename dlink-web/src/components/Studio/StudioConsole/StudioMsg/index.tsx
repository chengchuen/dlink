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

import {StateType} from "@/pages/DataStudio/model";
import {connect} from "umi";
import React, {useEffect, useState} from "react";
import CodeShow from "@/components/Common/CodeShow";
import {getConsoleInfo} from "@/pages/SettingCenter/ProcessList/service";
import {RedoOutlined} from "@ant-design/icons";
import {Button} from "antd";

const StudioMsg = (props: any) => {

  const {current} = props;
  const [consoleInfo, setConsoleInfo] = useState<string>("");

  useEffect(() => {
    refreshConsoleInfo();
  }, []);

  const refreshConsoleInfo = () => {
    const res = getConsoleInfo();
    res.then((result) => {
      result.datas && setConsoleInfo(result.datas);
    });
  }

  return (
    <><Button
      icon={<RedoOutlined/>}
      onClick={refreshConsoleInfo}
    ></Button>
      <CodeShow code={consoleInfo} language='java'
                height='500px' theme="vs-dark"/>
    </>
  );
};

export default connect(({Studio}: { Studio: StateType }) => ({
  current: Studio.current,
}))(StudioMsg);
