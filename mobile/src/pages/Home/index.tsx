import { View, Image,Text,FlatList } from 'react-native';

import logoGG from '../../assets/logo-gg.png';

import { styles } from './styles';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';

import { GAMES } from '../../utils/games';

export function Home() {
  return (
    <View style={styles.container}>
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
          data={GAMES}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item})=>(
            <Card 
              data={item}
            />
            )}
        />



    </View>
  );
}