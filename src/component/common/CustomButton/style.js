import {StyleSheet} from 'react-native';
import colors from '../../../assets/theme/colors';
export default styles = StyleSheet.create({
  inputContainer: {
    paddingVertical: 12,
  },
  wrapper: {
    height: 40,
    paddingHorizontal: 5,
    marginVertical: 5,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  textInput: {
    flex: 1,
    width: '100%',
  },
  error: {color: colors.danger, paddingTop: 4, fontSize: 12},
  loaderSection: {flexDirection: 'row'},
});
