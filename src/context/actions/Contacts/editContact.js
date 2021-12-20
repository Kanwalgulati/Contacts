import instance from '../../../helpers/axiosInterceptor';
import {
  EDIT_CONTACTS_LOADING,
  EDIT_CONTACT_FAIL,
  EDIT_CONTACT_SUCCESS,
} from '../../../constants/actionTypes';

export default (form, id) => dispatch => onSuccess => {
  console.log('Id : : :', form);
  const requestPayload = {
    country_code: form.phoneCode || '',
    first_name: form.firstName || '',
    last_name: form.lastName || '',
    phone_number: form.phoneNumber,
    contact_picture: form.contactPicture || null,
    is_favorite: form.isFavorite || false,
  };
  dispatch({
    type: EDIT_CONTACTS_LOADING,
  });
  instance
    .put(`/contacts/${id}`, requestPayload)
    .then(res => {
      dispatch({
        type: EDIT_CONTACT_SUCCESS,
        payload: res.data,
      });

      onSuccess(res.data);
    })
    .catch(err => {
      console.log('err', err);
      dispatch({
        type: EDIT_CONTACT_FAIL,
        payload: err.response
          ? err.response.data
          : {error: 'Something went wrong, try again'},
      });
    });
};
