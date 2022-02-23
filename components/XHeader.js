import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import Colors from '../constants/colors';
import Images from '../constants/images'
import { Ionicons } from '@expo/vector-icons';

export default function XHeader({onPress}) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Ionicons name="close-outline" size={40} color={Colors.tomato} />
    </Pressable>
  );
}

let styles = StyleSheet.create({
  container: {
    height: 50,
    width: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
})