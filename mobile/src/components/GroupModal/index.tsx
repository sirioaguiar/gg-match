import { View,Modal,ModalProps,Text ,TouchableOpacity, Alert, ActivityIndicator} from 'react-native';
import { useState } from 'react';

import {MaterialIcons} from '@expo/vector-icons';
import {Activity, CheckCircle} from 'phosphor-react-native';

import * as Clipboard from 'expo-clipboard';

import { styles } from './styles';
import { THEME } from '../../theme';
import { Header } from '../Header';

interface Props extends ModalProps {
    discord: string;
    onClose: () => void;
}

export function GroupModal({ discord ,onClose, ...rest} : Props) {
    const [isCopping, setIsCopping] = useState(false);

    async function handleCopyToClipboard(){
        setIsCopping(true);
        await Clipboard.setStringAsync(discord);

        Alert.alert('Copiado','Discord copiado para área de transferência');
        setIsCopping(false);
    }


    return (
        <Modal
        transparent
        statusBarTranslucent
        {...rest}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity style={styles.closeIcon}
                    onPress={onClose}
                    >
                    <MaterialIcons name='close' size={20} color={THEME.COLORS.CAPTION_500} />
                    </TouchableOpacity>
                    <CheckCircle 
                        size={64}
                        color={THEME.COLORS.SUCCESS}
                        weight='bold'
                    />

                <Header 
                    title='Go GG!'
                    subtitle='Agora é hora do show!'
                    style={{alignItems: 'center',marginTop:24}}
                />

                <Text style={styles.label}>
                    Adicione no seu discord
                </Text>
                <TouchableOpacity style={styles.discordButton}
                onPress={handleCopyToClipboard}
                disabled={isCopping}
                >
                    <Text style={styles.discord}>
                      {isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord }

                    </Text>
                </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
  }