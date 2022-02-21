import { StyleSheet, Text, View, Pressable } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';

export default function RecipalButton({ width, height, text, onPress }) {
  let [fontsLoaded] = useFonts({
    'AvenirLTStd-Black': require('../assets/fonts/AvenirLTStd-Black.otf'),
  });

  if (!fontsLoaded) {
    return AppLoading;
  }

  return (
    <Pressable onPress={onPress} style={[{width: width, height: height}, styles.button]}>
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 5,
    borderColor: '#e85927',
    backgroundColor: 'white',
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
    fontFamily: 'AvenirLTStd-Black',
    color: '#e85927',
    fontSize: 20
  }
});
  