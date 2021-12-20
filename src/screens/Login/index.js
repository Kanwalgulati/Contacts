import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {useContext} from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import LoginComponent from '../../component/Login';
import loginUser from '../../context/actions/auth/loginUser';
import {GlobalContext} from '../../context/Provider';
const Login = () => {
  const [form, setForm] = useState({});
  const [justSignedUp, setJustSignedUp] = useState(false);
  const {params} = useRoute();
  const [errors, setError] = useState({});
  const {navigate} = useNavigation();

  useEffect(() => {
    if (params?.data) {
      setJustSignedUp(true);
      setForm({...form, userName: params.data.username});
    }
  }, [params]);
  const {
    authDispatch,
    authState: {error, loading, data},
  } = useContext(GlobalContext);
  const onChange = ({name, value}) => {
    setJustSignedUp(false);
    setForm({...form, [name]: value});
  };
  const onSubmit = () => {
    if (form.userName && form.password) {
      loginUser(form)(authDispatch);
    }
    //Validation
  };
  return (
    <LoginComponent
      onSubmit={onSubmit}
      onChange={onChange}
      form={form}
      error={error}
      loding={loading}
      justSignedUp={justSignedUp}
    />
  );
};
export default Login;
