import type { ReactNode } from 'react';
import { TamaguiProvider, Theme } from '@tamagui/core';
import config from '../../design-system/tamagui.config';

type Props = {
  children: ReactNode;
};

export default function TamaguiRoot({ children }: Props) {
  return (
    <TamaguiProvider config={config} defaultTheme="light" disableInjectCSS>
      <Theme name="light">{children}</Theme>
    </TamaguiProvider>
  );
}
