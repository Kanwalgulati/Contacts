import React from 'react';
import {View, Text, TextInput} from 'react-native';
import styles from './style';

const Input = ({label, onChangeText, style, value}) => {
  return (
    <View>
      {label ? (
        <View>
          <Text>{label}</Text>
        </View>
      ) : null}
      <View style={[styles.wrapper]}>
        <View>{icon && icon}</View>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={[style, styles.Input]}
        />
      </View>
    </View>
  );
};

export default Input;
