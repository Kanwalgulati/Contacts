import React from 'react';
import {View, Text, TextInput} from 'react-native';
import colors from '../../../assets/theme/colors';
import styles from './style';

const Input = ({
  label,
  onChangeText,
  style,
  value,
  icon,
  iconPosition,
  error,
  ...props
}) => {
  const [focused, setFocused] = React.useState(false);
  const getFlexDirection = () => {
    if (icon && iconPosition) {
      if (iconPosition === 'left') {
        return 'row';
      } else if (iconPosition === 'right') {
        return 'row-reverse';
      }
    }
  };
  const getBorderColor = () => {
    if (focused) {
      return colors.primary;
    }
    if (error) {
      return colors.danger;
    } else {
      return colors.grey;
    }
  };
  return (
    <View style={[styles.inputContainer]}>
      {label ? (
        <View>
          <Text>{label}</Text>
        </View>
      ) : null}
      <View
        style={[
          styles.wrapper,
          {alignItems: icon ? 'center' : 'baseline'},
          {flexDirection: getFlexDirection(), borderColor: getBorderColor()},
        ]}>
        <View>{icon && icon}</View>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={[style, styles.textInput]}
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
          }}
          {...props}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default Input;
