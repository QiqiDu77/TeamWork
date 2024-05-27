import React, { useEffect, useMemo, useState } from 'react';
import { Card } from 'antd';
import axios from 'axios';
import { StarOutlined, TagsOutlined } from '@ant-design/icons';

export const StatisticsCards: React.FC = () => {
  const [statistics, setStatistics] = useState({
    anomaly_count_sum: 0,
    total_checks_sum: 0,
  });

  useEffect(() => {
    // 调用函数获取数据

    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.1.102:5000/api/select_all_bad_records_view');
        console.log(response.data);
        setStatistics(response.data); // 设置数据到状态
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div style={{ display: 'flex', gap: '100px' }}>
        <Card
          style={{ color: 'blue', fontWeight: '700', width: '300px', boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)' }}
          bordered={false}
          title={
            <div style={{ fontSize: '1.5rem', marginRight: '8px', color: '#fffff', fontWeight: 'bolder' }}>
              <TagsOutlined style={{ marginRight: '8px', color: '#1890ff', fontWeight: 'bolder' }} />
              检测能耗总数
            </div>
          }
        >
          {statistics.total_checks_sum}
        </Card>
        <Card
          style={{ color: 'red', fontWeight: '700', width: '300px', boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)' }}
          bordered={false}
          title={
            <div style={{ fontSize: '1.5rem', marginRight: '8px', fontWeight: 'bolder' }}>
              <StarOutlined style={{ marginRight: '8px', color: '#F03D3D' }} />
              异常能耗数
            </div>
          }
        >
          {statistics.anomaly_count_sum}
        </Card>
      </div>
    </>
  );
};
