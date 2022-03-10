import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import Colors from '../constants/colors';
import Images from '../constants/images'
import { Ionicons } from '@expo/vector-icons';

export default function XHeader({onPress}) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      {({ pressed }) => (
      <View style={{backgroundColor: pressed ? Colors.tomato : 'white', width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 1000,}}>
        <Ionicons name="close-outline" size={40} color={pressed ? 'white' : Colors.tomato} />
      </View>
      )}
    </Pressable>
  );
}


{/* <Pressable onPress={onPress} style={({ pressed }) => [ pressed ? styles.buttonPressed : styles.button, {width: width, height: height}]}>
      {({ pressed }) => (
        <Text style={[pressed ? styles.buttonPressedText : styles.buttonText, {fontSize: fontSize}]}>{text}</Text>
      )}
    </Pressable> */}

let styles = StyleSheet.create({
  container: {
    height: 90,
    width: 60,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
})