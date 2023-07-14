import { Text ,TouchableOpacity, TouchableOpacityProps, ImageBackground, ImageSourcePropType } from 'react-native';

import { styles } from './styles';

export interface CardProps {
    id:string;
    title:string;
    _count : {
       groups: number;
      };
    imageUrl: string;
}

interface Props extends TouchableOpacityProps{
    data: CardProps;
}

export function Card( { data, ...rest }:Props) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
        <ImageBackground
            style={styles.cover}
            source={{uri: data.imageUrl}}
            >
            <Text style={styles.name}>
              {data.title}
            </Text>
            <Text style={styles.groups}>
              {data._count.groups} grupos
            </Text>
          </ImageBackground>

    </TouchableOpacity>
  );
}