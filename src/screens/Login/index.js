import React from 'react';
import {useState} from 'react';
import {Text, View} from 'react-native';
import Container from '../../component/common/Container';
import Input from '../../component/common/Inputs';
const Login = () => {
  const [value, onChangeText] = useState('');
  return (
    <Container>
      <Input
        label={'User Name'}
        value={value}
        onChangeText={onChangeText}
        iconPosition="right"
        // error={"This Field is Required"}
      />
      <Input
        label={'Password'}
        value={value}
        onChangeText={onChangeText}
        icon={<Text>Hide</Text>}
        iconPosition
        iconPosition="right"
      />
    </Container>
  );
};
export default Login;
