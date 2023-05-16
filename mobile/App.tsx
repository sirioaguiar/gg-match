import { StatusBar } from 'react-native';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_900Black
} from '@expo-google-fonts/roboto'

import { Home } from './src/pages/Home';
import { Background } from './src/components/Background';
import { Loading } from './src/components/Loading';

export default function App() {
  const [fontsLoader] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_900Black
  });

  return (
    <Background >
      <StatusBar 
        barStyle={"light-content"}
        backgroundColor={"transparent"}
        translucent
        />

        { fontsLoader ? <Home /> : <Loading /> }
    </Background>
  );
};
