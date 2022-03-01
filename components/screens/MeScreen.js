import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';

import Header from '../BackHeader'
import Images from '../../constants/images';
import RecipalButton from '../RecipalButton'
import Counter from '../Counter'
import RecipeItem from '../RecipeItem';


export default function MeScreen() {
  let scrollView = useRef(null);
  let navigation = useNavigation();
  
  // Temp data
  let historyList = [];
  let historyData = [ 
      {
        id: 0,
        title: "Fettucine Alfredo",
        time: "1.5 hours",
        image: Images.fettuccine
      },
      {
        id: 1,
        title: "Garlic Breadsticks",
        time: "1.5 hours",
        image: Images.fettuccine
      },
      {
        id: 2,
        title: "Caprese Pizza",
        time: "1.5 hours",
        image: Images.fettuccine
      },
      {
        id: 3,
        title: "Chicken Parm",
        time: "1.5 hours",
        image: Images.fettuccine
      },
      {
        id: 4,
        title: "Lasagna",
        time: "1.5 hours",
        image: Images.fettuccine
      },
    ]

  for(let i = 0; i < historyData.length; i++) {
    historyList.push(
      <RecipeItem id={historyData[i].id} title={historyData[i].title} time={historyData[i].time} image={historyData[i].image}/>
    )
  }


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
            <RecipalButton text={'My Dietary Restrictions'} fontSize={20} width={'90%'} height={50}
                           onPress={() =>  navigation.navigate('DietRestrictScreen')}/>
            <RecipalButton text={'My Nutritional Preferences'} fontSize={20} width={'90%'} height={50}
                           onPress={() =>  navigation.navigate('NutriPrefScreen')}/>
          </View>
        
          <Text style={styles.historyText}>My Latest Meals</Text>
          <View style={styles.historyContainer}>
            {historyList}
          </View>

        </View>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  content: {
    flex: 1,
    marginTop: 30,
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
    marginTop: 15,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
  },
  editDietButtons: {
    marginTop: 10,
    height: 140,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  historyText: {
    marginTop: 15,
    fontFamily: 'Avenir-Book',
    color: 'black',
    fontSize: 22,
    marginLeft: '7%'
  },
  historyContainer: {
    alignItems: 'center',
    marginBottom: 120
  },
})