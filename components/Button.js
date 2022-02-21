import { StyleSheet, Text, View, Button } from 'react-native';

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
    backgroundColor: '#e85927',
    borderRadius: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
  