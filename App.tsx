import React, {useEffect} from "react";
import LoadAssets from "./src/LoadAssets";
import { Provider as ThemeProvider } from "./src/theme";
import Root from "./src/Root";
import { Provider } from "react-redux";
import {store} from './src/store'
import Moment from 'moment'
import { StatusBar } from 'expo-status-bar';
import "react-native-url-polyfill/auto";
import 'moment/locale/tr';

export default function App() {

  useEffect(() => {
    Moment.locale("tr");
  }, [])
  return (
    <LoadAssets>
      <Provider {...{store}}>
        <ThemeProvider>
          <Root />
        </ThemeProvider>
        <StatusBar style="dark" />
      </Provider>
    </LoadAssets>
  );
}
