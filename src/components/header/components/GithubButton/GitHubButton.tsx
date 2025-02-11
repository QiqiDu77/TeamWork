import React from 'react';
import { GithubOutlined, ApiOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { BASE_COLORS } from '@app/styles/themes/constants';
import { BaseButton as BaseButton } from '@app/components/common/BaseButton/BaseButton';

export const GitHubButton: React.FC = (props) => {
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <Button
      type="default"
      href="http://111.47.28.118:18090/Login.aspx"
      icon={<ApiOutlined />}
      target="_blank"
      $isDark={theme === 'dark'}
      {...props}
    >
      动力日报
    </Button>
  );
};

const Button = styled(BaseButton)<{ $isDark: boolean }>`
  color: ${(props) => BASE_COLORS[props.$isDark ? 'white' : 'black']};
  background: ${(props) => BASE_COLORS[props.$isDark ? 'black' : 'white']};
  border-radius: 50px;
  padding-top: 0;
  padding-bottom: 0;
  display: flex;
  align-items: center;

  &:hover,
  &:active,
  &:focus {
    color: ${(props) => BASE_COLORS[props.$isDark ? 'black' : 'white']};
    background: ${(props) => BASE_COLORS[props.$isDark ? 'white' : 'black']};
  }
`;

const GithubIcon = styled(GithubOutlined)`
  font-size: 1.5rem;
  vertical-align: middle;
`;
