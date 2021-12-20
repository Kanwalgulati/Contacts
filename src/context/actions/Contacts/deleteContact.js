import instance from '../../../helpers/axiosInterceptor';
import {
  DELETE_CONTACT_LOADING,
  DELETE_CONTACT_SUCCESS,
  DELETE_CONTACT_FAIL,
} from '../../../constants/actionTypes';

export default id => dispatch => onSucess => {
  dispatch({
    type: DELETE_CONTACT_LOADING,
  });
  instance
    .delete(`/contacts/${id}`)
    .then(() => {
      dispatch({
        type: DELETE_CONTACT_SUCCESS,
        payload: id,
      });
      onSucess();
    })
    .catch(err => {
      dispatch({
        type: DELETE_CONTACT_FAIL,
        payload: err.response
          ? err.response.data
          : {error: 'Something Went Wrong, try again'},
      });
    });
};
