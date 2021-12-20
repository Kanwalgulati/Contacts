import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import envs from '../config/env';
import {navigate} from '../navigations/RootNavigator';
import {CREATE_CONTACT, LOGOUT} from '../constants/RotesName';
import logoutUser from '../context/actions/auth/logoutUser';
let headers = {};
const instance = axios.create({
  baseURL: envs.BACKEND_URL,
  headers,
});

instance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  errors => {
    return Promise.reject(errors);
  },
);

instance.interceptors.response.use(
  response =>
    new Promise((resolve, reject) => {
      resolve(response);
    }),
  error => {
    if (!error.response) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
    if (error.response.status == 403) {
      navigate(LOGOUT, {tokenExpired: true});
    } else {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  },
);

export default instance;
