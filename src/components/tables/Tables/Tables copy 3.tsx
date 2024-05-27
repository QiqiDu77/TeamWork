import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './Tables.styles';
import { Table } from 'antd';
import axios from 'axios';

export const Tables: React.FC = () => {
  const { t } = useTranslation();
  const columns = [
    {
      title: '锅炉给水',
      dataIndex: 'boiler_feed_water',
      // width: '15%',
      editable: false,
    },
    {
      title: '一级反渗透浓水',
      dataIndex: 'ro_concentrate_water',
      // width: '25%',
      editable: true,
    },
    {
      title: '去糖间补水',
      dataIndex: 'inter_supply_water_supplementary_ton',
      // width: '25%',
      editable: true,
    },
    {
      title: '去糖间供水',
      dataIndex: 'inter_supply_water_volume_ton',
      // width: '25%',
      editable: true,
    },
    {
      title: '一级反渗透进水',
      dataIndex: 'ro_feed_water',
      // width: '25%',
      editable: true,
    },
  ];
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const response = await axios.get('http://192.168.1.102:5000/api/select_water_records_view');
    console.log(response);
    setData(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <S.TablesWrapper>
        <S.Card id="editable-table" title={'重要水指标'} padding="1.25rem 1.25rem 0">
          <Table columns={columns} dataSource={data} bordered />
        </S.Card>
      </S.TablesWrapper>
    </>
  );
};
