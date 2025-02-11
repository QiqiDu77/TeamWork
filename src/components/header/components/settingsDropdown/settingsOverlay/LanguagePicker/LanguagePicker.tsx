import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import { RadioBtn } from '../SettingsOverlay/SettingsOverlay.styles';
import { useLanguage } from '@app/hooks/useLanguage';
import { BaseRadio } from '@app/components/common/BaseRadio/BaseRadio';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';

export const LanguagePicker: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <BaseRadio.Group defaultValue={language} onChange={(e) => setLanguage(e.target.value)}>
      <BaseSpace direction="vertical">
        <RadioBtn value="de">
          <BaseSpace align="center">
            中文
            <ReactCountryFlag svg countryCode="CN" />
          </BaseSpace>
        </RadioBtn>
        <RadioBtn value="en">
          <BaseSpace align="center">
            英语
            <ReactCountryFlag svg countryCode="GB" />
          </BaseSpace>
        </RadioBtn>
      </BaseSpace>
    </BaseRadio.Group>
  );
};
