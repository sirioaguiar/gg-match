import { useEffect,useState } from 'react';
import { SafeAreaView} from 'react-native-safe-area-context';
import { useRoute, useNavigation} from '@react-navigation/native';
import {GroupParams } from '../../@types/navigation'
import {FlatList, Image,TouchableOpacity, View,Text} from 'react-native';
import {Entypo} from '@expo/vector-icons';

import logoGG from '../../assets/logo-gg.png';

import { styles } from './styles';
import {THEME} from '../../theme';

import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { Group,GroupProps } from '../../components/Group';
import { GroupModal } from '../../components/GroupModal';


export function GroupList() {
  const [groups, setGroups] = useState<GroupProps[]>([]);
  const [discordGroupSelected, setDiscordGroupSelected] = useState('');


  const navigation = useNavigation();
  const route = useRoute();
  const group = route.params as GroupParams;

  function handleGoBack() {
    navigation.goBack();
  }
  
 async function getDiscord(groupId: string){
<<<<<<< HEAD
    fetch(`http://192.168.25.9:3333/groups/${groupId}/discord`)
=======
    fetch(`http://192.168.25.12:3333/groups/${groupId}/discord`)
>>>>>>> 077626b1c9677d0a547e9f3cf5e13629a1b5ece6
    .then(response => response.json())
    .then(data => setDiscordGroupSelected(data.discord));
  };



  useEffect(() => {
<<<<<<< HEAD
    fetch(`http://192.168.25.9:3333/games/${group.id}/groups`)
=======
    fetch(`http://192.168.25.12:3333/games/${group.id}/groups`)
>>>>>>> 077626b1c9677d0a547e9f3cf5e13629a1b5ece6
    .then(response => response.json())
    .then(data => setGroups(data));
  },[]);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name='chevron-thin-left'
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

        <Image 
          source ={logoGG}
          style={styles.logo}
          />
          <View style={styles.right}/>

        </View>
        
        <Image 
          source={{uri:group.imageUrl}}
          style={styles.cover}
          resizeMode='cover'
        />
        <Header 
          title={group.title}
          subtitle='Conecte-se e comece a jogar'
          />

          <FlatList
          data={groups}
          keyExtractor={item => item.id}
          renderItem={({ item}) => (
            <Group 
            data={item}
            onEnterGroup={()=>getDiscord(item.id)}
            />
            )}
            horizontal
            style={styles.containerList}
            contentContainerStyle={styles.contentList}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={()=>(
            <Text style={styles.emptyListText}>Não há grupos para este jogo ainda</Text>)}
          />
        <GroupModal
        visible={discordGroupSelected.length > 0} 
        discord={discordGroupSelected}
        onClose={() => setDiscordGroupSelected('') }

        />

      </SafeAreaView>
    </Background>
  );
}