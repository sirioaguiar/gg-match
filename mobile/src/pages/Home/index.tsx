import {useEffect, useState} from 'react'
import { Image,FlatList } from 'react-native';
import { SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

import logoGG from '../../assets/logo-gg.png';

import { styles } from './styles';
import { Header } from '../../components/Header';
import { Card, CardProps } from '../../components/Card';
import { Background } from '../../components/Background';

export function Home() {
  const [cards, setCards] = useState<CardProps[]>([]);

  const navigation = useNavigation();

  function handleOpenGroup({id,title,imageUrl}:CardProps){
    navigation.navigate('groups',{ id, title, imageUrl});
  }

  useEffect(() => {
<<<<<<< HEAD
    fetch('http://192.168.25.9:3333/games')
=======
    fetch('http://192.168.25.12:3333/games')
>>>>>>> 077626b1c9677d0a547e9f3cf5e13629a1b5ece6
    .then(response => response.json())
    .then(data => setCards(data));
  },[]);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image 
          source ={logoGG}
          style={styles.logo}
          />

          <Header
            title='Jogue entre amigos.'
            subtitle='Crie ou entre em um grupo e vamos jogar.'
          />

          <FlatList
            contentContainerStyle={styles.gameList}
            data={cards}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item})=>(
              <Card 
                data={item}
                onPress={()=> handleOpenGroup(item)}
              />
              )}
          />
      </SafeAreaView>
    </Background>
  );
}