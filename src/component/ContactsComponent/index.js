import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import colors from '../../assets/theme/colors';
import AppModal from '../common/AppModal';
import Message from '../common/Message';
import Icon from '../common/Icon';
import styles from './style';
import {CONTACT_DETAIL, CREATE_CONTACT} from '../../constants/RotesName';
import {useNavigation} from '@react-navigation/native';
const ContactsComponent = ({
  modalVisible,
  setModalVisible,
  data,
  loading,
  sortBy,
}) => {
  let {navigate} = useNavigation();

  const ListEmptyComponent = () => {
    return (
      <View style={{paddingVertical: 100, paddingHorizontal: 100}}>
        <Message info message="No Contacts To Show" />
      </View>
    );
  };
  const renderItem = ({item}) => {
    let {contact_picture, last_name, first_name, phone_number, country_code} =
      item;
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigate(CONTACT_DETAIL, {item})}>
        <View style={styles.item}>
          {contact_picture ? (
            <Image
              style={{width: 45, height: 45, borderRadius: 100}}
              source={{uri: contact_picture}}
            />
          ) : (
            <View
              style={{
                width: 45,
                height: 45,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.grey,
                borderRadius: 100,
              }}>
              <Text style={[styles.name, {color: colors.white}]}>
                {first_name[0]}
              </Text>
              <Text style={[styles.name, {color: colors.white}]}>
                {last_name[0]}
              </Text>
            </View>
          )}
          <View style={{paddingLeft: 20}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.name}>{first_name} </Text>
              <Text style={styles.name}>{last_name}</Text>
            </View>
            <Text style={styles.phoneNumber}>
              {country_code} {phone_number}
            </Text>
          </View>
        </View>
        <Icon type="ant" size={18} color={colors.grey} name="right" />
      </TouchableOpacity>
    );
  };
  return (
    <>
      <View style={{backgroundColor: colors.white}}>
        <AppModal
          modalFooter={<></>}
          modalBody={
            <View>
              <Text>Hello</Text>
            </View>
          }
          title="My Profile"
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
        {loading && (
          <View style={{paddingVertical: 100, paddingHorizontal: 100}}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        )}
        {!loading && (
          <View style={{paddingVertical: 20}}>
            <FlatList
              keyExtractor={item => String(item.id)}
              renderItem={renderItem}
              data={
                sortBy
                  ? data.sort((a, b) => {
                      if (sortBy === 'First Name') {
                        if (b.first_name > a.first_name) {
                          return -1;
                        } else {
                          return 1;
                        }
                      } else {
                        if (b.last_name > a.last_name) {
                          return -1;
                        } else {
                          return 1;
                        }
                      }
                    })
                  : data
              }
              ListEmptyComponent={ListEmptyComponent}
              ListFooterComponent={<View style={{height: 150}} />}
              ItemSeparatorComponent={() => (
                <View style={{height: 0.5, backgroundColor: colors.grey}} />
              )}
            />
          </View>
        )}
      </View>
      <TouchableOpacity
        style={styles.floatingActioButton}
        onPress={() => {
          navigate(CREATE_CONTACT);
        }}>
        <Icon name="plus" size={21} />
      </TouchableOpacity>
    </>
  );
};

export default ContactsComponent;
