import instance from '../../../helpers/axiosInterceptor';
import {
  CREATE_CONTACTS_LOADING,
  CREATE_CONTACTS_SUCCESS,
  CREATE_CONTACTS_FAIL,
} from '../../../constants/actionTypes';

export default form => dispatch => onSuccess => {
  const requestPayload = {
    country_code: form.phoneCode || '',
    first_name: form.firstName || '',
    last_name: form.lastName || '',
    phone_number: form.phoneNumber,
    contact_picture: form.contactPicture || null,
    is_favorite: form.isFavorite || false,
  };
  dispatch({
    type: CREATE_CONTACTS_LOADING,
  });
  instance
    .post('/contacts/', requestPayload)
    .then(res => {
      dispatch({
        type: CREATE_CONTACTS_SUCCESS,
        payload: res.data,
      });
      onSuccess();
    })
    .catch(err => {
      console.log('error ', err);
      dispatch({
        type: CREATE_CONTACTS_FAIL,
        payload: err.response
          ? err.response.data
          : {error: 'Something Went Wrong, try again'},
      });
    });
};
