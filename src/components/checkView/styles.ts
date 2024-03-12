import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  pending: {
    height: 25,
    width: 25,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#555',
    justifyContent: 'center',
    alignContent: 'center',
  },
  done: {
    height: 25,
    width: 25,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#555',
    backgroundColor: '#4D9811',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
