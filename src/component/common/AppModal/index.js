import React from 'react';
import {View, Text, Modal, TouchableOpacity, ScrollView} from 'react-native';
import styles from './style';
import Icon from '../Icon';

const AppModal = ({
  modalVisible,
  title,
  setModalVisible,
  modalBody,
  modalFooter,
  extraProps = {},
}) => {
  let {disabled = false} = extraProps;
  return (
    <Modal visible={modalVisible} transparent>
      <TouchableOpacity
        style={styles.wrapper}
        disabled={disabled}
        onPress={() => {
          setModalVisible(false);
        }}>
        <View style={styles.modalView}>
          <ScrollView>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                }}>
                <Icon size={27} type="evil" name="close" />
              </TouchableOpacity>
              <Text style={styles.title}>{title || 'Contacts'}</Text>
              <View />
              <View />
              <View />
              <View />
            </View>
            <View style={styles.body}>{modalBody}</View>
            <View style={styles.footer}>
              {modalFooter}

              {!modalFooter && (
                <View>
                  <>
                    <View style={styles.footerSeparator} />
                    <View style={styles.footerItems}>
                      <View style={styles.footer}>
                        <Text style={styles.footerText}>Privacy Policy</Text>
                        <View style={styles.termsView} />
                        <Text style={styles.footerText}>Terms of Services</Text>
                      </View>
                    </View>
                  </>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default AppModal;
