import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useRef} from 'react';
import {useState, useContext, useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from '../../component/common/Icon';
import ContactsComponent from '../../component/ContactsComponent';
import getContacts from '../../context/actions/Contacts/getContacts';
import {GlobalContext} from '../../context/Provider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from '../../navigations/RootNavigator';
import {CONTACT_DETAIL} from '../../constants/RotesName';
const Contacts = () => {
  const {setOptions, toggleDrawer} = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [sortBy, setSortBy] = useState(null);
  const contactRef = useRef([]);
  const {
    contactsState: {
      getContacts: {data, loading, error},
    },
    contactsState,
    ContactsDispatch,
  } = useContext(GlobalContext);
  console.log('srot by : ', sortBy);
  useFocusEffect(
    React.useCallback(() => {
      getSettings();
      return () => {};
    }, []),
  );
  const getSettings = async () => {
    const sortPref = await AsyncStorage.getItem('sortBy');
    console.log('Setttings :  : :', sortPref);
    if (sortPref) {
      setSortBy(sortPref);
    }
  };
  useEffect(() => {
    const prev = contactRef.current;
    contactRef.current = data;
    const newList = contactRef.current;
    if (newList.length - prev.length === 1) {
      const newContact = newList.find(
        item => !prev.map(i => i.id).includes(item.id),
      );
      navigate(CONTACT_DETAIL, {item: newContact});
    }
  }, [data.length]);
  useEffect(() => {
    getContacts()(ContactsDispatch);
  }, []);
  useEffect(() => {
    setOptions({
      headerLeft: () => {
        return (
          <TouchableOpacity
            onPress={() => {
              toggleDrawer();
            }}>
            <Icon type="material" name="menu" size={25} style={{padding: 10}} />
          </TouchableOpacity>
        );
      },
    });
  }, []);
  return (
    <ContactsComponent
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      data={data}
      loading={loading}
      sortBy={sortBy}
    />
  );
};

export default Contacts;
