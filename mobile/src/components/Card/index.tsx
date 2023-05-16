import { Text ,TouchableOpacity, TouchableOpacityProps, ImageBackground, ImageSourcePropType } from 'react-native';

import { styles } from './styles';

export interface CardProps {
    id:string;
    name:string;
    groups: string;
    cover: ImageSourcePropType;
}

interface Props extends TouchableOpacityProps{
    data: CardProps;
}

export function Card( { data, ...rest }:Props) {
  return (
    <TouchableOpacity style={styles.container}>
        <ImageBackground
            style={styles.cover}
            source={data.cover}
            >
            <Text style={styles.name}>
              {data.name}
            </Text>
            <Text style={styles.groups}>
              {data.groups} grupos
            </Text>
          </ImageBackground>

    </TouchableOpacity>
  );
}