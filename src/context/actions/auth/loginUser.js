import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LOGIN_FAIL,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
} from '../../../constants/actionTypes';
import instance from '../../../helpers/axiosInterceptor';

export default ({password, userName: username}) =>
  dispatch => {
    dispatch({type: LOGIN_LOADING});
    instance
      .post('auth/login', {
        password,
        username,
      })
      .then(response => {
        AsyncStorage.setItem('token', response.data.token);
        AsyncStorage.setItem('user', JSON.stringify(response.data.user));
        dispatch({type: LOGIN_SUCCESS, payload: response.data});
      })
      .catch(err => {
        dispatch({
          type: LOGIN_FAIL,
          payload: err.response
            ? err.response.data
            : {error: 'Something went Wrong'},
        });
      });
  };
