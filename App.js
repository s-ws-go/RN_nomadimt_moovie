import { Text, Image, useColorScheme } from 'react-native';
import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';

// font 와 asset 적용하기
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
///
import { NavigationContainer } from '@react-navigation/native';

import { ThemeProvider } from 'styled-components/native';
import { SdarkTheme, SlightTheme } from './styled';
import Root from './Navigations/Root';

import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

// 폰트, 이미지를 여러개 적용하고 싶어! : 배열 활용
const loadingFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));
// const loadingImages = (images) =>
//   images.map((image) => {
//     if (typeof image === 'string') {
//       return Image.prefetch(image);
//     } else {
//       return Asset.loadAsync(image);
//     }
//   });
export default function App() {
  const [ready, setReady] = useState(false);
  const onFinish = () => setReady(true);
  const startLoading = async () => {
    const fonts = loadingFonts([Ionicons.font]);
    // const images = loadingImages([require('./images/mypic.jpeg'), 'https://reactnative.dev/img/header_logo.svg']);
    await Promise.all([...fonts]);
  };
  const isDark = useColorScheme() === 'dark';
  if (!ready) {
    return <AppLoading startAsync={startLoading} onFinish={onFinish} onError={console.error} />;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? SdarkTheme : SlightTheme}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

//https://unsplash.com/photos/sr2IUk0neIU
