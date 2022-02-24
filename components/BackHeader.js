import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import Colors from '../constants/colors';
import Images from '../constants/images'

export default function BackHeader() {
  let navigation = useNavigation();

  function onBackButtonPress() {
    navigation.goBack();
  }

  return (
    <Pressable style={styles.container} onPress={onBackButtonPress}>
      <Image style={styles.image} source={Images.backButton}/>
    </Pressable>
  );
}

let styles = StyleSheet.create({
  container: {
    height: 80,
    width: 32 / 0.4,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
  },
  image: {
    marginLeft: 10,
    height: 30,
    width: undefined,
    aspectRatio: 1/0.4,
    resizeMode: 'contain'
  }
})