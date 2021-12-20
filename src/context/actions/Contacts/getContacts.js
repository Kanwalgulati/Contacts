import instance from '../../../helpers/axiosInterceptor';
import {
  GET_CONTACTS_LOADING,
  GET_CONTACTS_SUCCESS,
  GET_CONTACTS_FAIL,
} from '../../../constants/actionTypes';

export default () => dispatch => {
  dispatch({
    type: GET_CONTACTS_LOADING,
  });
  instance
    .get('/contacts/')
    .then(res => {

      dispatch({
        type: GET_CONTACTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: GET_CONTACTS_FAIL,
        payload: err.response
          ? err.response.data
          : {error: 'Something Went Wrong, try again'},
      });
    });
};
