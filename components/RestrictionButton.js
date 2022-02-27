import { StyleSheet, Text, Pressable, Image } from 'react-native';
import Colors from '../constants/colors';
import Images from '../constants/images'

/**
 * EXAMPLE USAGE:
 * 
 * let onButtonPress = () => {
 *    console.log("Button was pressed!");
 * }
 * 
 * <RecipalButton width={200} height={50} text={'Press Me!'} onPress={onButtonPress}></RecipalButton>
 */

export default function RestrictionButton({title, description, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>{title}</Text>
        <Image style={styles.infoButton} source={Images.infoButton}/>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 70,
    width: '48%',
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: Colors.tomato,
    backgroundColor: 'white',
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 15,

    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5,
  },
  buttonPressed: {
    borderWidth: 5,
    borderColor: Colors.tomato,
    backgroundColor: Colors.tomato,
    borderRadius: 1000,
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
    fontSize: 13
  },
  buttonPressedText: {
    // Font
    fontFamily: 'Avenir-Black',
    color: 'white',
    fontSize: 10
  }, 
  infoButton: {
    height: 30,
    width: 30,
  }
});
  