import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import colors from '../../assets/theme/colors.js';
import Icon from '../../component/common/Icon/index.js';
import ContactDetailsComponent from '../../component/ContactDetailsComponent.js';
import {CONTACT_LIST} from '../../constants/RotesName.js';
import deleteContact from '../../context/actions/Contacts/deleteContact.js';
import editContact from '../../context/actions/Contacts/editContact.js';
import {GlobalContext} from '../../context/Provider.js';
import uploadImage from '../../helpers/uploadImage.js';
const ContactDetail = () => {
  const {
    params: {item = ({} = {})},
  } = useRoute() || {};
  const {
    ContactsDispatch,
    contactsState: {
      deleteContact: {loading},
    },
  } = useContext(GlobalContext);
  const {navigate, setOptions} = useNavigation();
  const sheetRef = useRef(null);
  const [getLocalImage, setLocalImage] = useState(null);
  const [updatingImage, setUpdatingImage] = useState(false);
  const [uploadSucceeded, setUploadSucceeded] = useState(false);

  useEffect(() => {
    if (item) {
      setOptions({
        headerRight: () => {
          return (
            <View style={{paddingRight: 10, flexDirection: 'row'}}>
              <TouchableOpacity>
                <Icon
                  color={colors.grey}
                  name={item.is_favorite ? 'star' : 'star-border'}
                  type="material"
                  size={25}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{paddingLeft: 10}}
                onPress={() => {
                  Alert.alert(
                    'Delete Contact',
                    'Are You Sure You Want To Delete This Contact',
                    [
                      {text: 'Cancel', onPress: () => {}},
                      {
                        text: 'Yes',
                        onPress: () => {
                          deleteContact(item.id)(ContactsDispatch)(() => {
                            navigate(CONTACT_LIST);
                          });
                        },
                      },
                    ],
                  );
                }}>
                {loading ? (
                  <ActivityIndicator size="small" color={colors.primary} />
                ) : (
                  <Icon
                    name="delete"
                    color={colors.grey}
                    type="material"
                    size={25}
                  />
                )}
              </TouchableOpacity>
            </View>
          );
        },
      });
    }
  }, [loading]);
  const closeSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.close();
    }
  };
  const openSheet = () => {
    console.log('isme AYYA');
    if (sheetRef.current) {
      console.log('isme BHi aaya');
      sheetRef.current.open();
    }
  };

  const onFileSelected = images => {
    closeSheet();
    setLocalImage(images);
    setUpdatingImage(true);
    uploadImage(images)(uri => {
      setUpdatingImage(false);
      console.log('Image : ', uri);
      const {
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        country_code: phoneCode,
        is_favorite: isFavorite,
      } = item;
      editContact(
        {
          firstName,
          lastName,
          phoneCode,
          isFavorite,
          phoneCode,
          contactPicture: uri,
          phoneNumber,
        },
        item.id,
      )(ContactsDispatch)(item => {
        setUploadSucceeded(true);
        setUpdatingImage(false);
      });
    })(err => {
      setUpdatingImage(false);
      console.log('Error: ', err);
    });
  };
  return (
    <ContactDetailsComponent
      contact={item}
      openSheet={openSheet}
      closeSheet={closeSheet}
      onFileSelected={onFileSelected}
      getLocalImage={getLocalImage}
      sheetRef={sheetRef}
      updatingImage={updatingImage}
      uploadSucceeded={uploadSucceeded}
    />
  );
};

export default ContactDetail;
