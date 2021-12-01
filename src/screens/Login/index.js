import React from 'react';
import {useState} from 'react';
import {Text, View} from 'react-native';
import Container from '../../component/common/Container';
import Input from '../../component/common/Inputs';
const Login = () => {
  const [value, onChangeText] = useState('UseLess Text');
  return (
    <Container>
      <Input label={"User Name"} value={value} onChangeText={onChangeText} />
    </Container>
  );
};
export default Login;
