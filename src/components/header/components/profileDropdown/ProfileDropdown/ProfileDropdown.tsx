import React from 'react';
import { ProfileOverlay } from '../ProfileOverlay/ProfileOverlay';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { useResponsive } from '@app/hooks/useResponsive';
import * as S from './ProfileDropdown.styles';
import { BasePopover } from '@app/components/common/BasePopover/BasePopover';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseAvatar } from '@app/components/common/BaseAvatar/BaseAvatar';
import { UserOutlined } from '@ant-design/icons';

export const ProfileDropdown: React.FC = () => {
  const { isTablet } = useResponsive();

  const user = useAppSelector((state) => state.user.user);

  return user ? (
    <BasePopover content={<ProfileOverlay />} trigger="click">
      <S.ProfileDropdownHeader as={BaseRow} gutter={[10, 10]} align="middle">
        <BaseCol>
          {/* <BaseAvatar src={user.imgUrl} alt="User" shape="circle" size={40} /> */}
          <BaseAvatar
            alt="User"
            shape="circle"
            size={40}
            icon={<UserOutlined />}
            style={{ backgroundColor: '#1488ee' }}
          />
        </BaseCol>
        {isTablet && (
          <BaseCol>
            {/* <span>{`${user.firstName} ${user.lastName[0]}`}</span> */}
            <span>车间主任</span>
          </BaseCol>
        )}
      </S.ProfileDropdownHeader>
    </BasePopover>
  ) : null;
};
