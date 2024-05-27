import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './Tables.styles';
import { Table } from 'antd';
import axios from 'axios';

export const Tables: React.FC = () => {
  const { t } = useTranslation();
  const columns = [
    {
      title: '供气焓值',
      dataIndex: 'steam_supply_enthalpy_sugar_removal',
      // width: '15%',
      editable: false,
    },
    {
      title: '汽轮机进气量',
      dataIndex: 'sewage_gas',
      // width: '25%',
      editable: true,
    },
    {
      title: '汽轮机排气量',
      dataIndex: 'sodium_hypochlorite',
      // width: '25%',
      editable: true,
    },
    {
      title: '去糖间供汽',
      dataIndex: 'inter_steam_supply_volume',
      // width: '25%',
      editable: true,
    },
    {
      title: '制糖供汽',
      dataIndex: 'gas_supply_sugar',
      // width: '25%',
      editable: true,
    },
  ];
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const response = await axios.get('http://192.168.1.102:5000/api/select_sugar_records_view');
    console.log(response);
    setData(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <S.TablesWrapper>
        <S.Card id="editable-table" title={'重要汽消耗指标'} padding="1.25rem 1.25rem 0">
          <Table columns={columns} dataSource={data} bordered />
        </S.Card>
      </S.TablesWrapper>
    </>
  );
};
