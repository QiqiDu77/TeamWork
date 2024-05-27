/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { TableProps } from 'antd';
import * as S from './BaseTable.styles';

export type BaseTableProps<T> = TableProps<T>;

// TODO make generic!
export const BaseTable = (props: any) => {
  return <S.Table {...props} />;
};
