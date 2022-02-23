import { StyleSheet, Text, View, Button } from 'react-native';
import Colors from '../constants/color';

export default function RecipalButton({ width, height, text, onPress }) {
  return (
    <Button onPress={onPress} style={[{width: width, height: height}, styles.button]}>
      <Text>{text}</Text>
    </Button>
  );
}

export default function BackButton({}) {
  return (
    <Button onPress={onPress} style={[{width: width, height: height}, styles.button]}>
      <Text>{text}</Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.tomato,
    borderRadius: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
  