import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Input from '../common/Inputs';
import Container from '../common/Container';
import CustomButton from '../common/CustomButton';
import styles from './style';
import {LOGIN} from '../../constants/RotesName';
import {useNavigation} from '@react-navigation/native';
import Message from '../common/Message';
import {useState} from 'react';
const RegisterComponent = ({
  onSubmit,
  onChange,
  form,
  errors,
  loading,
  error,
}) => {
  const {navigate} = useNavigation();
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  return (
    <Container>
      <Image
        height={70}
        width={70}
        source={require('../../assets/images/logo.png')}
        style={styles.logoImage}
      />
      <View>
        <Text style={styles.title}>Welcome To RNContacts</Text>
        <Text style={styles.subTitle}>Create a Free Account</Text>
        <View style={styles.form}>
          {error?.error && (
            <Message
              danger
              retry
              retryFn={() => {
                console.log('Retry Fun');
              }}
              message={error?.error}
            />
          )}
          <Input
            label={'User Name'}
            iconPosition="right"
            placeholder="Enter Username"
            onChangeText={value => {
              onChange({name: 'userName', value});
            }}
            error={errors.userName || error?.username?.[0]}
          />
          <Input
            label={'First Name'}
            iconPosition="right"
            placeholder="Enter First Name"
            onChangeText={value => {
              onChange({name: 'firstName', value});
            }}
            error={errors.firstName || error?.first_name?.[0]}
          />
          <Input
            label={'Last Name'}
            iconPosition="right"
            placeholder="Enter Last Name"
            onChangeText={value => {
              onChange({name: 'lastName', value});
            }}
            error={errors.lastName || error?.last_name?.[0]}
          />
          <Input
            label={'Email'}
            iconPosition="right"
            placeholder="Enter Email"
            error={errors.email || error?.email?.[0]}
            onChangeText={value => {
              onChange({name: 'email', value});
            }}
          />
          <Input
            label={'Password'}
            placeholder="Enter Password"
            icon={
              <TouchableOpacity
                onPress={() => {
                  setIsSecureEntry(prev => !prev);
                }}>
                <Text>{isSecureEntry ? 'Show' : 'Hide'}</Text>
              </TouchableOpacity>
            }
            secureTextEntry={isSecureEntry}
            iconPosition="right"
            error={errors.password || error?.password?.[0]}
            onChangeText={value => {
              onChange({name: 'password', value});
            }}
          />
          <CustomButton
            onPress={onSubmit}
            primary
            title="Create Account"
            loading={loading}
            disabled={loading}
          />
          <View style={styles.createSection}>
            <Text style={styles.infoText}>Already have an account?</Text>
            <TouchableOpacity
              onPress={() => {
                navigate(LOGIN);
              }}>
              <Text style={styles.linkBtn}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default RegisterComponent;
