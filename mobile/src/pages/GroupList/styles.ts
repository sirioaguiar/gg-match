import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    
  },
  header:{
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    marginTop: 28,
    justifyContent: 'space-between',
  },
  logo:{
    width: 80,
    height: 40
  },
  right: {
    width: 50,
    height: 40
  },
  cover:{
    width: 311,
    height:160,
    borderRadius:8,
    marginTop:32
  },
  containerList: {
    width:'100%',
  },
  contentList:{
    paddingLeft:32,
    paddingRight:64,
    alignItems:'flex-start'
  },
  emptyListText: {
    color: THEME.COLORS.TEXT,
    fontSize: THEME.FONT_SIZE.MD,
    fontFamily: THEME.FONT_FAMILY.BOLD
  }

});