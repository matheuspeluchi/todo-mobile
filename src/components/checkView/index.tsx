import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './styles';

interface CheckViewProps {
  doneAt: Date | null;
}
const CheckView: React.FC<CheckViewProps> = ({doneAt}) => {
  return (
    <View style={doneAt ? styles.done : styles.pending}>
      <Icon name="check" size={20} color="#FFF" />
    </View>
  );
};

export default CheckView;
