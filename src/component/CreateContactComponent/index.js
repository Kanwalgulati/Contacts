import React from 'react';
import {View, Text, Image, Switch, TouchableOpacity} from 'react-native';
import Container from '../common/Container';
import CustomButton from '../common/CustomButton';
import Input from '../common/Inputs';
import styles from './style';
import CountryPicker from 'react-native-country-picker-modal';
import {DEFAULT_IMAGE_URI} from '../../constants/general';
import colors from '../../assets/theme/colors';
import ImagePicker from '../common/ImagePicker';
const CreateContactComponent = ({
  onChangeText,
  error,
  form,
  onSubmit,
  setForm,
  sheetRef,
  openSheet,
  closeBottomSheet,
  toggleValueChange,
  onFileSelected,
  getLoaclImage,
}) => {
  return (
    <View style={styles.container}>
      <Container>
        <Image
          width={150}
          height={150}
          source={{
            uri: getLoaclImage?.path || getLoaclImage || DEFAULT_IMAGE_URI,
          }}
          style={styles.imageView}
        />
        <TouchableOpacity
          onPress={() => {
            openSheet();
          }}>
          <Text style={styles.chooseText}>Choose Image</Text>
        </TouchableOpacity>
        <Input
          label="First Name"
          value={form.firstName || ''}
          placeholder="Enter First Name"
          onChangeText={value =>
            onChangeText({name: 'firstName', value: value})
          }
        />
        <Input
          label="Last Name"
          value={form.lastName || ''}
          placeholder="Enter Last Name"
          onChangeText={value => onChangeText({name: 'lastName', value: value})}
        />
        <Input
          icon={
            <CountryPicker
              withFilter
              withFlag
              countryCode={form.countryCode || undefined}
              withCountryNameButton={false}
              withCallingCodeButton
              withCallingCode
              withEmoji
              onSelect={({callingCode, cca2}) => {
                callingCode = callingCode[0];
                setForm({...form, phoneCode: callingCode, countryCode: cca2});
              }}
            />
          }
          style={{paddingLeft: 10}}
          iconPosition="left"
          label="Phone Number"
          placeholder="Enter Phone Number"
          value={form.phoneNumber || ''}
          onChangeText={value =>
            onChangeText({name: 'phoneNumber', value: value})
          }
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 17}}>Add to Favorites</Text>
          <Switch
            trackColor={{false: '#767577', true: colors.primary}}
            thumbColor="#ffffff"
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleValueChange}
            value={form.isFavorite || false}
          />
        </View>
        <CustomButton primary title="Submit" onPress={onSubmit} />
      </Container>
      <ImagePicker ref={sheetRef} onFileSelected={onFileSelected} />
    </View>
  );
};

export default CreateContactComponent;
