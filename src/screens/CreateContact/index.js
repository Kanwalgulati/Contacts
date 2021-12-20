import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import CreateContactComponent from '../../component/CreateContactComponent';
import {CONTACT_DETAIL, CONTACT_LIST} from '../../constants/RotesName';
import createContact from '../../context/actions/Contacts/createContact';
import editContact from '../../context/actions/Contacts/editContact';
import {GlobalContext} from '../../context/Provider';
import uploadImage from '../../helpers/uploadImage';
import countryCodes from '../../utils/countryCodes';
const CreateContact = () => {
  const [getLoaclImage, setLoaclImage] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const {
    ContactsDispatch,
    contactsState: {
      createContacts: {loading, error},
    },
  } = useContext(GlobalContext);
  const {params} = useRoute();
  const [form, setForm] = useState({});
  const {navigate, setOptions} = useNavigation();
  const sheetRef = useRef(null);

  useEffect(() => {
    if (params?.contact) {
      setOptions({title:"Update Contact"})
      const {
        first_name: firstName,
        last_name: lastName,
        country_code: countryCode,
        phone_number: phoneNumber,
        // contact_picture,
        is_favorite: isFavorite,
      } = params.contact;
      console.log('Prev FOrm : ', form);
      setForm(prev => {
        return {
          ...prev,
          firstName,
          lastName,
          phoneNumber,
          isFavorite,
          phoneCode: countryCode,
        };
      });

      const country = countryCodes.find(item => {
        return item.value.replace('+', '') === countryCode;
      });

      if (country) {
        setForm(prev => {
          return {...prev, countryCode: country.key.toUpperCase()};
        });
      }

      if (params?.contact.contact_picture) {
        setLoaclImage(params?.contact.contact_picture);
      }
    }
  }, []);

  const onChangeText = ({name, value}) => {
    setForm({...form, [name]: value});
  };
  const closeSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.close();
    }
  };
  const openSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.open();
    }
  };
  const onSubmit = () => {
    if (params?.contact) {
      // console.log("Paraams : Contact : ",params?.contact)
      if (getLoaclImage?.size) {
        setIsUploading(true);
        uploadImage(getLoaclImage)(uri => {
          console.log('Form : : : :', form);
          setIsUploading(false);
          editContact(
            {...form, contactPicture: uri},
            params?.contact.id,
          )(ContactsDispatch)(item => {
            navigate(CONTACT_DETAIL, {item});
          });
        })(err => {
          setIsUploading(false);
          console.log('Error: ', err);
        });
      } else {
        console.log('form : : ', form);
        editContact(form, params?.contact.id)(ContactsDispatch)(item => {
          navigate(CONTACT_DETAIL, {item});
        });
      }
    } else {
      if (getLoaclImage?.size) {
        setIsUploading(true);
        uploadImage(getLoaclImage)(uri => {
          setIsUploading(false);
          createContact({...form, contactPicture: uri})(ContactsDispatch)(
            () => {
              navigate(CONTACT_LIST);
            },
          );
        })(err => {
          setIsUploading(false);
          console.log('Error: ', err);
        });
      } else {
        createContact(form)(ContactsDispatch)(() => {
          navigate(CONTACT_LIST);
        });
      }
    }
  };
  const toggleValueChange = () => {
    setForm({...form, isFavorite: !form.isFavorite});
  };
  const onFileSelected = images => {
    closeSheet();
    setLoaclImage(images);
  };
  return (
    <CreateContactComponent
      onChangeText={onChangeText}
      form={form}
      onSubmit={onSubmit}
      loading={(loading, isUploading)}
      setForm={setForm}
      toggleValueChange={toggleValueChange}
      sheetRef={sheetRef}
      closeSheet={closeSheet}
      openSheet={openSheet}
      onFileSelected={onFileSelected}
      getLoaclImage={getLoaclImage}
    />
  );
};

export default CreateContact;
