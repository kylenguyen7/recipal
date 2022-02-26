import { StyleSheet, Text, View, Pressable } from 'react-native';
import { withBadge } from 'react-native-elements';
import Colors from '../constants/colors';

export default function Counter({ number, category }) {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{number}</Text>
      <Text style={styles.categoryText}>{category}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    borderRadius: 25,
    backgroundColor: Colors.green,
    justifyContent: 'center',
    alignItems: 'center',

    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5,
  },
  numberText: {
    fontFamily: 'Avenir-Book',
    color: 'white',
    fontSize: 45
  },
  categoryText: {
    fontFamily: 'Avenir-Book',
    color: 'white',
    fontSize: 15
  }
});
  