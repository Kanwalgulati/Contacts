import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import colors from '../../../assets/theme/colors';
import Icon from '../Icon';
import styles from './style';
import ImageCropPicker from 'react-native-image-crop-picker';
const ImagePicker = React.forwardRef(({onFileSelected}, ref) => {
  const options = [
    {
      name: 'Take from Camera',
      icon: <Icon name="camera" color={colors.grey} size={21} />,
      onPress: () => {
        ImageCropPicker.openCamera({
          width: 300,
          height: 300,
          cropping: true,
          freeStyleCropEnabled: true,
        })
          .then(images => {
            onFileSelected(images);
          })
          .catch(error => {
            console.log('Error: ', error);
          });
      },
    },
    {
      name: 'Choose From Gallery',
      icon: <Icon name="image" color={colors.grey} size={21} />,
      onPress: () => {
        ImageCropPicker.openPicker({
          width: 300,
          height: 300,
          cropping: true,
          freeStyleCropEnabled: true,
        })
          .then(images => {
            onFileSelected(images);
          })
          .catch(error => {
            console.log('Error: ', error);
          });
      },
    },
  ];
  return (
    <View style={styles.wrapper}>
      <RBSheet
        ref={ref}
        height={170}
        openDuration={250}
        closeOnDragDown
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            // justifyContent: 'center',
            // alignItems: 'center',
          },
        }}>
        <View style={styles.optionsWrapper}>
          {options.map(({name, icon, onPress}) => {
            return (
              <TouchableOpacity
                style={styles.pickerOptions}
                key={name}
                onPress={onPress}>
                {icon}
                <Text style={styles.text}>{name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </RBSheet>
    </View>
  );
});

export default ImagePicker;
