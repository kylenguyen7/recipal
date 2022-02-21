import { StyleSheet, Text, View } from 'react-native';
import RecipalButton from '../RecipalButton'

export default function HomeScreen() {
  let onButtonPress = () => {
    console.log("Button was pressed!");
  }

  return (
    <View style={styles.container}>
      <RecipalButton width={200} height={50} text={'Press Me!'} onPress={onButtonPress}></RecipalButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
