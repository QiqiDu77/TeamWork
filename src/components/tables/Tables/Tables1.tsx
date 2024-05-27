import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './Tables.styles';
import { Table } from 'antd';
import axios from 'axios';

export const Tables1: React.FC = () => {
  const { t } = useTranslation();
  const columns = [
    {
      title: '动力用电',
      dataIndex: 'power_electricity',
      // width: '15%',
      editable: false,
    },
    {
      title: '糖间用电',
      dataIndex: 'intermediate_electricity_sugar',
      // width: '25%',
      editable: true,
    },
    {
      title: '维修用电',
      dataIndex: 'maintenance_electricity',
      // width: '25%',
      editable: true,
    },
    {
      title: '自发电',
      dataIndex: 'self_generated_electricity',
      // width: '25%',
      editable: true,
    },
    {
      title: '外网电',
      dataIndex: 'grid_electricity_external',
      // width: '25%',
      editable: true,
    },
  ];
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const response = await axios.get('http://192.168.1.102:5000/api/select_electricity_records_view');
    setData(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <S.TablesWrapper>
        <S.Card id="editable-table" title={'重要电指标消耗'} padding="1.25rem 1.25rem 0">
          <Table columns={columns} dataSource={data} bordered />
        </S.Card>
      </S.TablesWrapper>
    </>
  );
};
