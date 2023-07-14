import { View,TouchableOpacity,Text } from 'react-native';
import { THEME } from '../../theme';
import { styles } from './styles';
import { GroupInfo } from '../GroupInfo';
import { GameController } from 'phosphor-react-native';

export interface GroupProps {
  id: string,
  name: string,
  hourEnd: string,
  hourInit: string,
  useMicrophone: boolean,
  gameDays: string[],
}

interface Props {
  data:GroupProps;
  onEnterGroup: () => void;
}
export function Group({data, onEnterGroup}: Props) {
  return (
    <View style={styles.container}>
      <GroupInfo 
      label='Nome'
      value={data.name}
      />
      <GroupInfo 
      label='Disponibilidade'
      value={`${data.gameDays.length} dias | ${data.hourInit} -  ${data.hourEnd}` }
      />
      <GroupInfo 
      label='Microfone'
      value={data.useMicrophone ? 'Sim' : 'Não'}
      colorText={data.useMicrophone ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
      
      />

      <TouchableOpacity
        style={styles.button}
        onPress={onEnterGroup}
      >
        <GameController
          color={THEME.COLORS.TEXT}
          size={20}
        />
       <Text style={styles.buttonTitle}>
        Entrar no grupo
        </Text> 
      </TouchableOpacity>
    </View>
  );
}