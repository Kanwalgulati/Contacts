import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import colors from '../../assets/theme/colors';
import AppModal from '../common/AppModal';
import Icon from '../common/Icon';
const SettingsComponent = ({
  modalVisible,
  setModalVisible,
  SettingsOptions,
  prefOptions = [],
}) => {
  let extraProps = {disabled: true};
  return (
    <ScrollView style={{backgroundColor: colors.white}}>
      {SettingsOptions.map(({title, subTitle, onPress}) => {
        return (
          <>
            <AppModal
              modalVisible={modalVisible}
              title="Sort By"
              setModalVisible={setModalVisible}
              extraProps={extraProps}
              modalBody={
                <View>
                  {prefOptions.map(({name, selected, onPress}) => {
                    return (
                      <View style={{paddingLeft: 20}}>
                        <TouchableOpacity
                          onPress={onPress}
                          style={{
                            flexDirection: 'row',
                            paddingVertical: 5,
                            alignItems: 'center',
                          }}>
                          {selected && (
                            <Icon size={17} name="check" type="material" />
                          )}
                          <Text
                            style={{
                              fontSize: 17,
                              paddingLeft: selected ? 15 : 30,
                            }}>
                            {name}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
              }
              modalFooter={<></>}
            />
            <TouchableOpacity key={title} onPress={onPress}>
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingBottom: 20,
                  paddingTop: 20,
                }}>
                <Text style={{fontSize: 17}}>{title}</Text>
                {subTitle && (
                  <Text style={{fontSize: 14, opacity: 0.6, paddingTop: 5}}>
                    {subTitle}
                  </Text>
                )}
              </View>
              <View style={{height: 0.5, backgroundColor: colors.grey}} />
            </TouchableOpacity>
          </>
        );
      })}
    </ScrollView>
  );
};

export default SettingsComponent;
