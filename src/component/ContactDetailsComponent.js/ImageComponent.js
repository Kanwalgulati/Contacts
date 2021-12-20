import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import styles from './style';

export default function ImageComponent({src}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const onLoadStart = () => {
    setIsLoading(true);
  };
  const onError = () => {
    setIsLoading(false);
    setError(true);
  };
  const onLoadEnd = () => {
    setIsLoading(false);
  };
  console.log('Use effecnt  ::: ', src);
  return (
    <View style={styles.imageContainer}>
      {isLoading && <Text style={styles.loading}>Loading</Text>}
      <View>
        <Image
          onLoadStart={onLoadStart}
          onLoadEnd={onLoadEnd}
          onError={onError}
          source={{uri: src}}
          style={styles.detialPhoto}
        />
      </View>
    </View>
  );
}
