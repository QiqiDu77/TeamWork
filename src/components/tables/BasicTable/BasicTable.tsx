import React, { useEffect, useState, useCallback } from 'react';
import { BasicTableRow, Pagination } from 'api/table.api';
import { BaseTable } from '@app/components/common/BaseTable/BaseTable';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { useTranslation } from 'react-i18next';
import { notificationController } from 'controllers/notificationController';
import { useMounted } from '@app/hooks/useMounted';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import { List, Button, Modal, Card, Table } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import axios from 'axios';

interface DataType {
  name: string;
  value?: number;
  average: number;
  max_value: number;
  min_value: number;
  status?: number;
  label_value?: number;
  detection_label?: string;
}

interface DataDetail {
  name: string;
  value?: number;
  average: number;
  max_value: number;
  min_value: number;
  status?: number;
  label_value?: number;
  detection_label?: string;
}

export const BasicTable: React.FC = () => {
  const [tableData, setTableData] = useState<{ data: BasicTableRow[]; loading: boolean }>({
    data: [],
    loading: false,
  });
  const initemData = [
    {
      title: '异常编号',
      content: 0,
    },
    {
      title: '创建时间',
      content: 0,
    },
    {
      title: '操作人',
      content: '车间主任',
    },
    {
      title: '异常类型',
      content: 0,
    },
    {
      title: '异常指标',
      content: '未知',
    },
    {
      title: '异常值',
      content: 0,
    },
  ];
  const [itemData, setItemData] = useState(initemData);

  const { t } = useTranslation();
  const { isMounted } = useMounted();
  // const [buttonDisabled, setButtonDisabled] = useState(false);
  const [dataDetails, setdataDetails] = useState<DataDetail[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatTime = (time: any) => {
    const date = new Date(time);
    return `${date.getFullYear()}/${
      date.getMonth() + 1
    }/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  };
  const toData = (obj: any) => {
    const dataArray = [];
    let name;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (key === 'boiler_feed_water') {
          name = '锅炉给水';
        } else if (key === 'inter_supply_water_supplementary_ton') {
          name = '去糖间补水';
        } else if (key === 'inter_supply_water_volume_ton') {
          name = '去糖间供水';
        } else if (key === 'ro_concentrate_water') {
          name = '一级反渗透浓水';
        } else if (key === 'ro_feed_water') {
          name = '一级反渗透进水';
        } else if (key === 'grid_electricity_external') {
          name = '外网电';
        } else if (key === 'intermediate_electricity_sugar') {
          name = '糖间用电';
        } else if (key === 'maintenance_electricity') {
          name = '维修用电';
        } else if (key === 'self_generated_electricity') {
          name = '自发电';
        } else if (key === 'power_electricity') {
          name = '动力用电';
        } else if (key === 'gas_supply_sugar') {
          name = '制糖供汽';
        } else if (key === 'inter_steam_supply_volume') {
          name = '去糖间供汽';
        } else if (key === 'sodium_hypochlorite') {
          name = '汽轮机排气量';
        } else if (key === 'sewage_gas') {
          name = '汽轮机进气量';
        } else if (key === 'steam_supply_enthalpy_sugar_removal') {
          name = '供汽涵值';
        } else if (key === 'coal_feeder_coal_supply_1') {
          name = '进煤量1';
        } else if (key === 'coal_feeder_coal_supply_2') {
          name = '进煤量2';
        }
        dataArray.push({ name, ...value }); // 创建新的对象并放入数组中
      }
    }
    return dataArray;
  };

  const showModal = (record: any) => {
    const { load_time, label, id, ro_feed_water, maintenance_electricity, sewage_gas } = record;
    // console.log(load_time);
    const formattedTime = formatTime(load_time);
    let detectType = '正常';
    let detectName = '无';
    let detectValue = 0;
    if (label === '1') {
      detectType = '水消耗异常';
      detectName = '一级反渗透进水';
      detectValue = ro_feed_water;
    } else if (label === '2') {
      detectType = '电消耗异常';
      detectName = '维修用电';
      detectValue = maintenance_electricity;
    } else if (label === '3') {
      detectType = '汽消耗异常';
      detectName = '汽轮机进气量';
      detectValue = sewage_gas;
    } else if (label === '4') {
      detectType = '煤消耗异常';
    }
    const item = [
      {
        title: '异常编号',
        content: id,
      },
      {
        title: '检测时间',
        content: formattedTime,
      },
      {
        title: '操作人',
        content: '车间主任',
      },
      {
        title: '异常类型',
        content: detectType,
      },
      {
        title: '异常指标',
        content: detectName,
      },
      {
        title: '异常值',
        content: detectValue,
      },
    ];
    fetchRecord();
    setItemData(item);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetch = useCallback(() => {
    setTableData((tableData) => ({ ...tableData, loading: true }));
    axios.get('http://192.168.1.102:5000/api/select_all_records_view').then((res) => {
      console.log(res);
      if (isMounted.current) {
        setTableData({ data: res.data, loading: false });
      }
    });
  }, [isMounted]);

  const fetchRecord = async () => {
    await axios.get('http://192.168.1.102:5000/api/select_avg_records_view').then((res) => {
      const result = toData(res.data);
      setdataDetails(result);
    });
  };

  const handleTableChange = (pagination: Pagination) => {
    fetch();
  };

  const columns1: TableProps<DataType>['columns'] = [
    {
      title: '指标名称',
      width: 100,
      dataIndex: 'name',
      key: '指标名称',
      fixed: 'left',
    },
    {
      title: '阈值下界',
      width: 100,
      dataIndex: 'min_value',
      key: '阈值下界',
      fixed: 'left',
    },
    {
      title: '阈值上界',
      dataIndex: 'max_value',
      key: '外阈值上界',
      width: 150,
    },
    {
      title: '平均数值',
      dataIndex: 'average',
      key: '平均数值',
      width: 150,
    },
  ];

  const columns = [
    {
      title: '异常编号',
      dataIndex: 'id',
      // width: 100,
      // fixed: 'left',
      sorter: (a: any, b: any) => a.id - b.id,
      filterSearch: true,
    },
    {
      title: 'EDI产水',
      // width: 100,
      dataIndex: 'edi_feed_water',
      // sorter: (a: any, b: any) => a.edi_feed_water - b.edi_feed_water,
      showSorterTooltip: false,
    },
    {
      title: 'EDI进水',
      // width: 100,
      dataIndex: 'edi_produced_water',
    },
    {
      title: '一级反渗透进水',
      dataIndex: 'ro_feed_water',
      // width: 100,
    },
    {
      title: '一级反渗透浓水',
      dataIndex: 'ro_concentrate_water',
      // width: 100,
    },
    {
      title: '主汽温度(2#棚)',
      dataIndex: 'steam_temperature_main_2_shed',
      // width: 100,
    },
    {
      title: '汽轮机进气量',
      dataIndex: 'sewage_gas',
      // width: 100,
    },
    {
      title: '汽轮机排气量',
      dataIndex: 'sodium_hypochlorite',
      // width: 100,
    },
    {
      title: '制糖供汽',
      dataIndex: 'gas_supply_sugar',
      // width: 100,
    },
    {
      title: '动力用电',
      dataIndex: 'power_electricity',
      // width: 100,
    },
    {
      title: '糖间用电',
      dataIndex: 'intermediate_electricity_sugar',
      // width: 100,
    },
    {
      title: '自发电',
      dataIndex: 'self_generated_electricity',
      // width: 100,
    },
    {
      title: '锅炉给水',
      dataIndex: 'boiler_feed_water',
      // width: 100,
    },
    {
      title: '去糖间补水',
      dataIndex: 'inter_supply_water_supplementary_ton',
      // width: 100,
    },
    {
      title: '去糖间供水',
      dataIndex: 'inter_supply_water_volume_ton',
      // width: 100,
    },
    {
      title: '去糖间供汽',
      dataIndex: 'inter_steam_supply_volume',
      // width: 100,
    },
    {
      title: '外网电',
      dataIndex: 'grid_electricity_external',
      // width: 100,
    },
    {
      title: '检测日期',
      dataIndex: 'load_time',
      render: (text: any) => {
        const date = new Date(text);
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
      },
      // fixed: 'right',
      // width: 100,
    },
    {
      title: '操作',
      dataIndex: 'actions',
      width: 180,
      render: (text: string, record: any) => {
        return (
          <BaseSpace>
            <BaseButton
              type="ghost"
              onClick={() => {
                // setButtonDisabled(true);
                // handleButtonClick(record);
                const newData = tableData.data.map((item) => {
                  if (item.id === record.id) {
                    return { ...item, disabled: true };
                  }
                  return item;
                });
                setTableData({ data: newData, loading: false });
                notificationController.info({ message: '该条异常数据已处理' });
              }}
              disabled={record.disabled}
            >
              处理
            </BaseButton>
            <BaseButton type="default" danger onClick={() => showModal(record)}>
              查看
            </BaseButton>
          </BaseSpace>
        );
      },
    },
  ];
  // const handleButtonClick = (record: any) => {
  //   // 更新按钮状态
  //   const newData = tableData.data.map((item) => {
  //     if (item.key === record.key) {
  //       return { ...item, buttonDisabled: true };
  //     }
  //     return item;
  //   });
  //   tableData.data = { ...newData };
  //   console.log(tableData);
  //   setTableData(tableData);
  // };

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <>
      <BaseTable
        columns={columns}
        dataSource={tableData.data}
        pagination={{ defaultPageSize: 5 }}
        // pagination={tableData.pagination}
        loading={tableData.loading}
        onChange={handleTableChange}
        scroll={{ x: 1000 }}
        bordered
      />
      <Modal title="详细信息查看" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000}>
        <>
          <Card style={{ boxShadow: '1px 1px 1px 1px rgba(0,0,0,0.1)' }}>
            <List
              grid={{
                gutter: 4,
                column: 6,
              }}
              dataSource={itemData}
              renderItem={(item) => (
                <List.Item>
                  <Card style={{ color: 'blue', fontWeight: '700', height: '160px' }} title={item.title}>
                    {item.content}{' '}
                  </Card>
                </List.Item>
              )}
            />
          </Card>
          <Button
            type="primary"
            ghost
            // style={{ backgroundColor: 'lightblue' }}
            className="text-blue-500 "
            icon={<DownloadOutlined />}
            size="large"
          >
            导出表格
          </Button>
          <Table
            columns={columns1}
            dataSource={dataDetails}
            scroll={{
              x: 1000,
              y: 550,
            }}
            bordered
            rowClassName={(record, index) => {
              // 根据不同的状态返回不同的类名
              switch (record.status) {
                case 0:
                  return '';
                case 1:
                  return 'text-red-600';
                default:
                  return '';
              }
            }}
          />
        </>
      </Modal>
    </>
  );
};
