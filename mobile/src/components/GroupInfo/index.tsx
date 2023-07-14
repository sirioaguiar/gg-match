import { View,Text, ColorValue } from 'react-native';

import { styles } from './styles';
import { THEME } from '../../theme';

interface Props {
    label: string;
    value: string;
    colorText?: ColorValue;
}

export function GroupInfo({ label,value,colorText = THEME.COLORS.TEXT} : Props) {
  return (
    <View style={styles.container}>
        <Text style={styles.label}>
            {label}
        </Text>

        <Text style={[styles.value, {color: colorText}]}>
            {value}
        </Text>
    </View>
  );
}