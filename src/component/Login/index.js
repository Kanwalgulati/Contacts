import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Input from '../common/Inputs';
import Container from '../common/Container';
import CustomButton from '../common/CustomButton';
import styles from './style';
import {REGISTER} from '../../constants/RotesName';
import {useNavigation} from '@react-navigation/native';
import Message from '../common/Message';
import {useState} from 'react';
const LoginComponent = ({
  error,
  form,
  justSignedUp,
  onChange,
  onSubmit,
  loading,
}) => {
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const {navigate} = useNavigation();
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
        <Text style={styles.subTitle}>Please login here</Text>
        <View style={styles.form}>
          {justSignedUp ? (
            <Message
              success
              onDismiss={() => {}}
              message="Account Created Successfully"
            />
          ) : null}
          {error && !error.Error && (
            <Message
              danger
              onDismiss={() => {}}
              message="invalid credentials"
            />
          )}
          {error?.error && <Message danger onDismiss message={error?.error} />}
          <Input
            label={'User Name'}
            iconPosition="right"
            placeholder="Enter Username"
            value={form.userName || null}
            onChangeText={value => {
              onChange({name: 'userName', value});
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
            onChangeText={value => {
              onChange({name: 'password', value});
            }}
          />
          <CustomButton
            primary
            title="Submit"
            onPress={onSubmit}
            loading={loading}
            disabled={loading}
          />
          <View style={styles.createSection}>
            <Text style={styles.infoText}>Need a new account?</Text>
            <TouchableOpacity
              onPress={() => {
                navigate(REGISTER);
              }}>
              <Text style={styles.linkBtn}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default LoginComponent;
