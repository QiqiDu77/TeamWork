import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tables } from '@app/components/tables/Tables/Tables';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { BasicTable } from '@app/components/tables/BasicTable/BasicTable';
import { EditableTable } from '@app/components/tables/editableTable/EditableTable';
import * as S from '@app/components/tables/Tables/Tables.styles';

const DataTablesPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <S.TablesWrapper>
        <S.Card id="basic-table" padding="1.25rem 1.25rem 0">
          <BasicTable />
        </S.Card>
        {/* <S.Card id="tree-table" title={t('tables.treeTable')} padding="1.25rem 1.25rem 0">
          <TreeTable />
        </S.Card>
        */}
        {/* <S.Card id="editable-table" title={t('tables.editableTable')} padding="1.25rem 1.25rem 0">
          <EditableTable />
        </S.Card> */}
      </S.TablesWrapper>
    </>
  );
};

export default DataTablesPage;
