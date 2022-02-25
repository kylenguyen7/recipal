import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Images from '../../constants/images';
import Header from '../BackHeader'
import RecipalButton from '../RecipalButton'
import Counter from '../Counter'
import { useRef } from 'react';

export default function MeScreen() {
  let scrollView = useRef(null);

  return (
    <View>
      <Header></Header>
      <ScrollView ref={scrollView}>
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Image source={Images.spoonInCircle} style={styles.titleImg}></Image>
            <Text style={styles.titleText}>ABOUT ME</Text>
          </View>

          <View style={styles.counterContainer}>
            <Counter number={'27'} category={'Meals'}/>
            <Counter number={'18'} category={'Recipes'}/>
            <Counter number={'82'} category={'Hours'}/>
          </View>

          <View style={styles.editDietButtons}>
            <RecipalButton text={'My Dietary Restrictions'} fontSize={20} width={350} height={50}/>
            <RecipalButton text={'My Nutritional Preferences'} fontSize={20} width={350} height={50}/>
            </View>
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