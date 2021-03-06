import { StyleSheet, Text, View, Pressable } from 'react-native';
import Colors from '../constants/colors';

/**
 * EXAMPLE USAGE:
 * 
 * let onButtonPress = () => {
 *    console.log("Button was pressed!");
 * }
 * 
 * <RecipalButton width={200} height={50} text={'Press Me!'} onPress={onButtonPress}></RecipalButton>
 */

export default function RecipalHomeButton({ width, height, text, fontSize, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [ pressed ? styles.buttonPressed : styles.button, {width: width, height: height}]}>
      {({ pressed }) => (
        <Text style={[pressed ? styles.buttonPressedText : styles.buttonText, {fontSize: fontSize}]}>{text}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    borderColor: Colors.tomato,
    backgroundColor: 'white',
    borderRadius: 30,
    margin: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5,
  },
  buttonPressed: {
    borderWidth: 2,
    borderColor: Colors.tomato,
    backgroundColor: Colors.tomato,
    borderRadius: 30,
    margin: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5,
  },
  buttonText: {
    // Font
    fontFamily: 'Avenir-Black',
    color: Colors.tomato,
    fontSize: 20
  },
  buttonPressedText: {
    // Font
    fontFamily: 'Avenir-Black',
    color: 'white',
    fontSize: 20
  }
});
  