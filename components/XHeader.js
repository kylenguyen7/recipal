import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import Colors from '../constants/colors';
import Images from '../constants/images'
import { Ionicons } from '@expo/vector-icons';

export default function XHeader() {
  let navigation = useNavigation();

  function onXButtonPress() {
    navigation.navigate('Home');
  }

  return (
    <Pressable style={styles.container} onPress={onXButtonPress}>
      <Ionicons name="exit-outline" size={32} color={Colors.tomato} />
    </Pressable>
  );
}

let styles = StyleSheet.create({
  container: {
    height: 40,
    width: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
})