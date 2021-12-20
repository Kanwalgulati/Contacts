import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';
const getIconFont = type => {
  switch (type) {
    case 'zocial':
      return Zocial;
    case 'simpleLineIcons':
      return SimpleLineIcons;
    case 'octicons':
      return Octicons;
    case 'material':
      return MaterialIcons;
    case 'materialCommunity':
      return MaterialCommunityIcons;
    case 'ionicon':
      return Ionicons;
    case 'foundation':
      return Foundation;
    case 'fontisto':
      return Fontisto;
    case 'fontAwesome5Pro':
      return FontAwesome5Pro;
    case 'fontAwesome5':
      return FontAwesome5;
    case 'fontAwesome':
      return FontAwesome;
    case 'feather':
      return Feather;
    case 'feather':
      return Feather;
    case 'evil':
      return EvilIcons;
    case 'entypo':
      return Entypo;
    case 'ant':
      return AntDesign;

    default:
      return FontAwesome;
  }
};
const Icon = ({type, ...props}) => {
  const FontIcon = getIconFont(type);
  return <FontIcon {...props} />;
};

export default Icon;
