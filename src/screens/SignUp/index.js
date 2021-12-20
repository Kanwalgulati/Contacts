import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useState, useEffect, useCallback} from 'react';
import {useContext} from 'react';
import RegisterComponent from '../../component/Signup';
import {LOGIN} from '../../constants/RotesName';
import register, {clearAuthState} from '../../context/actions/auth/register';
import {GlobalContext} from '../../context/Provider';
const SignUp = () => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const {navigate} = useNavigation();

  const {
    authDispatch,
    authState: {error, loading, data},
  } = useContext(GlobalContext);

  useEffect(() => {}, [data]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (data || error) {
          clearAuthState()(authDispatch);
        }
      };
    }, [data, error]),
  );

  const onChange = ({name, value}) => {
    setForm({...form, [name]: value});
    if (value !== '') {
      if (name === 'password') {
        if (value.length < 6) {
          setErrors(prev => {
            return {...prev, [name]: 'Password cannot be less then 6 char'};
          });
        } else {
          setErrors(prev => {
            return {...prev, [name]: null};
          });
        }
      } else {
        setErrors(prev => {
          return {...prev, [name]: null};
        });
      }
    } else {
      setErrors(prev => {
        return {...prev, [name]: 'This Field is Required'};
      });
    }
  };
  const onSubmit = () => {
    if (!form.userName) {
      setErrors(prev => {
        return {...prev, userName: 'UserName can not be empty'};
      });
    }
    if (!form.firstName) {
      setErrors(prev => {
        return {...prev, firstName: 'Firstname can not be empty'};
      });
    }
    if (!form.lastName) {
      setErrors(prev => {
        return {...prev, lastName: 'lastname can not be empty'};
      });
    }

    if (!form.email) {
      setErrors(prev => {
        return {...prev, email: 'email can not be empty'};
      });
    }
    if (!form.password) {
      setErrors(prev => {
        return {...prev, password: 'password can not be empty'};
      });
    }
    //Validation
    if (
      Object.values(form).length === 5 &&
      Object.values(form).every(item => item.trim().length > 0) &&
      Object.values(errors).every(item => !item)
    ) {
      register(form)(authDispatch)(response => {
        navigate(LOGIN, {data: response});
      });
    }
  };
  return (
    <RegisterComponent
      onSubmit={onSubmit}
      onChange={onChange}
      form={form}
      errors={errors}
      error={error}
      loading={loading}
    />
  );
};
export default SignUp;
