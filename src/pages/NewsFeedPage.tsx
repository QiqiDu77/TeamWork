/* eslint-disable @typescript-eslint/no-explicit-any */
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { BaseUpload } from '@app/components/common/BaseUpload/BaseUpload';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import * as S from '@app/pages/uiComponentsPages//UIComponentsPage.styles';
import { FONT_SIZE, FONT_WEIGHT } from '@app/styles/themes/constants';
import { notificationController } from '@app/controllers/notificationController';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import Column from 'antd/lib/table/Column';
import { Card, Progress } from 'antd';
import type { ProgressProps } from 'antd';
import { useEffect, useState } from 'react';

const DraggerIconWrapper = styled.div`
  font-size: 4rem;
  color: var(--primary-color);
`;
const DraggerTitle = styled.div`
  font-size: ${FONT_SIZE.xl};
  font-weight: ${FONT_WEIGHT.bold};
`;
const DraggerDescription = styled.div`
  font-size: ${FONT_SIZE.md};
  padding: 0 1rem;
`;

const twoColors: ProgressProps['strokeColor'] = {
  '0%': '#108ee9',
  '100%': '#87d068',
};

const UploadsPage: React.FC = () => {
  const { t } = useTranslation();
  const [isProcess, setIsProcess] = useState(0);
  const [count, setCount] = useState(0);
  const [count1, setCount1] = useState(0);

  const [count2, setCount2] = useState(0);

  const [count3, setCount3] = useState(0);

  const [count4, setCount4] = useState(0);

  const [count5, setCount5] = useState(0);

  let total = 0;
  let abnoraml = 0;
  let water = 0;
  let power = 0;
  let coal = 0;
  let steam = 0;
  const uploadProps = {
    name: 'csv_file',
    multiple: true,
    action: 'http://192.168.1.102:5000/api/upload_csv',
    onChange: (info: any) => {
      const { status, response } = info.file;

      // console.log(response);
      if (status == 'uploading') {
        setIsProcess(50);
      }
      if (status === 'done' && response) {
        setIsProcess(100);
        console.log(response.class);
        response.class.forEach((el: number) => {
          if (el === 1) {
            water = water + 1;
          } else if (el === 2) {
            power = power + 1;
          } else if (el === 3) {
            steam = steam + 1;
          } else if (el === 4) {
            coal = coal + 1;
          }
        });
        console.log(water, power, steam, coal);
        setCount(response.class.length);
        setCount1(water + power + steam + coal);
        setCount2(water);
        setCount3(power);
        setCount4(coal);
        setCount5(steam);
        notificationController.success({ message: `${info.file.name}检测完成,请前往详细信息查看！` });
      } else if (status === 'error') {
        setIsProcess(0);
        notificationController.error({ message: `${info.file.name}检测失败!` });
      }
    },
  };
  useEffect(() => {}, [count, count1, count2, count3, count4, count5]);

  return (
    <>
      <PageTitle>{t('common.upload')}</PageTitle>
      <div style={{ display: 'flex', gap: '15px', height: '460px', alignItems: 'stretch' }}>
        {/* <S.Card title={t('uploads.basic')}>
          <BaseUpload {...uploadProps}>
            <BaseButton icon={<UploadOutlined />}>{t('uploads.clickToUpload')}</BaseButton>
          </BaseUpload>
        </S.Card>
        <S.Card title={t('uploads.directory')}>
          <BaseUpload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" directory>
            <BaseButton icon={<UploadOutlined />}>{t('uploads.directory')}</BaseButton>
          </BaseUpload>
        </S.Card> */}
        <S.Card1 style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <BaseUpload.Dragger {...uploadProps}>
            <DraggerIconWrapper>
              <InboxOutlined />
            </DraggerIconWrapper>
            <DraggerTitle>{'点击或拖拽文件至此处检测'}</DraggerTitle>
            <DraggerDescription>{'仅支持多种格式的单个文件'}</DraggerDescription>
          </BaseUpload.Dragger>
        </S.Card1>
        <Card style={{ flex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr' }}>
            <div>
              <Card style={{ color: 'blue', fontWeight: '700' }} title="当前检测总数">
                {count}
              </Card>
            </div>
            <div>
              <Card style={{ color: 'red', fontWeight: '700' }} title="检测异常数">
                {count1}
              </Card>
            </div>
            <div>
              <Card style={{ color: 'red', fontWeight: '700' }} title="水消耗异常数">
                {count2}
              </Card>
            </div>
            <div>
              <Card style={{ color: 'red', fontWeight: '700' }} title="电消耗异常数">
                {count3}
              </Card>
            </div>
            <div>
              <Card style={{ color: 'red', fontWeight: '700' }} title="煤消耗异常数">
                {count4}
              </Card>
            </div>
            <div>
              <Card style={{ color: 'red', fontWeight: '700' }} title="汽消耗异常数">
                {count5}
              </Card>
            </div>
          </div>
        </Card>
      </div>
      <S.ACard1 title="检测进度">
        <Progress percent={isProcess} strokeColor={twoColors} />
      </S.ACard1>
    </>
  );
};

export default UploadsPage;
