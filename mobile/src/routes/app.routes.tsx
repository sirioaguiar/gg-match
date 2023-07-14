import {createNativeStackNavigator} from '@react-navigation/native-stack';

import { Home } from '../pages/Home';
import { GroupList } from '../pages/GroupList';

const {Navigator, Screen} = createNativeStackNavigator();

export function AppRoutes(){
    return (      
    <Navigator
        screenOptions={{headerShown:false}}
    >
            <Screen
                name='home'
                component={Home}
            />
            
            <Screen
                name='groups'
                component={GroupList}
            />
        </Navigator>
    )
}