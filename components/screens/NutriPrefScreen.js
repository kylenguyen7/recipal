import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Images from '../../constants/images';
import Header from '../BackHeader'
import RecipalButton from '../RecipalButton'
import Counter from '../Counter'
import { useRef } from 'react';

export default function NutriPrefScreen() {
  let scrollView = useRef(null);

  return (
    <View>
      <Header></Header>
      <ScrollView ref={scrollView}>
        <View style={styles.content}>
          
          <View style={styles.titleContainer}>
            <Image source={Images.spoonInCircle} style={styles.titleImg}></Image>
            <Text style={styles.bubbleText}>Tap below to specify your recipe needs!</Text>
          </View>

          <Text style={styles.titleText}>MY NUTRITIONAL PREFERENCES</Text>

        </View>
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleImg: {
    height: '100%',
    width: 100,
    resizeMode: 'contain',
    position: 'relative',
    bottom: 10,
  },
  bubbleText: {
    width: 190,
    padding: 10,
    margin: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'black',
    textAlign: 'center',
    fontFamily: 'Avenir-Book',
    color: 'black',
    fontSize: 17,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  titleText: {
    fontFamily: 'Avenir-Black',
    color: 'black',
    fontSize: 21,
    marginTop: 15
  },
})