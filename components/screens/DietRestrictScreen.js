import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Images from '../../constants/images';
import Header from '../BackHeader'
import RecipalButton from '../RecipalButton'
import Counter from '../Counter'
import { useRef } from 'react';

export default function DietRestrictScreen() {
  let scrollView = useRef(null);

  return (
    <View>
    <Header></Header>
    <ScrollView ref={scrollView}>
      <Text>Dietary Restrictions</Text>
    </ScrollView>
  </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30
  },
  titleContainer: {
    height: 110,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleImg: {
    height: '90%',
    width: 70,
    resizeMode: 'contain',
    position: 'relative',
    bottom: 10,
  },
  titleText: {
    fontFamily: 'Avenir-Black',
    color: 'black',
    fontSize: 28,
  },
  counterContainer: {
    height: 120,
    width: '100%',
    marginTop: 15,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
  },
  editDietButtons: {
    height: 140,
    justifyContent: 'space-evenly'
  }
})