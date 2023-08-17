import React, { useEffect } from "react";
import { ThemeProvider } from 'styled-components';

import GlobalStyle from './useTheme';
import { GlobalStyles as BaseStyles } from 'twin.macro'


const MainLayout = (props) => {

  let { children, theme } = props;


  const currentTheme = () => {

    let setCurrentTheme = {
      primaryColor: '#0054A3',
      secondaryColor: '#FDB813',
      infoColor: '#F0F8FF',
      successColor: '#16AB21',
      warningColor: '#f39c12',
      dangerColor: '#FF2326',
      lightColor: '#ffffff',
      darkColor: '#000000',
      textDark: '#222222',
      textColor: '#4A4A4A',
      bgColor: '#f3f4f6',
      borderColor: '#979797',
      themeColor: '#f9fafb',
      wizardBg: '#959B9E',
      tableEven: '#e5e7eb',
      tableHeader: '#e2e4e9',
      panelHeader: '#F0F8FF',
      borderPrimary: '#00128E',
      focusColor: '#091442'
    }

    return setCurrentTheme
  }


    return (
        <ThemeProvider theme={() => currentTheme(theme)}>
            <>
                <BaseStyles />
                <GlobalStyle />

                {children}
            </>
        </ThemeProvider>
    );
}

export default MainLayout;