import { StyleSheet, Text, ScrollView, Image, View, ImageBackground } from 'react-native';
import { useRef, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RecipalButton from '../RecipalButton'
import BackHeader from '../BackHeader'
import Images from '../../constants/images'
import Colors from '../../constants/colors';

export default function RecipeFinish({ navigation, route }) {
  let { currRecipe } = route.params;

  function toRecipeHistory() {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Me' }],
    });
  }
  
  
  const [history, setHistory] = useState({});
  // Store data
  useEffect(() => {
    const storeData = async () => {
      const stringValue = JSON.stringify(history)
      console.log("History variable is now " + stringValue)

      if (stringValue !== "{}") {
        await AsyncStorage.setItem('history', stringValue)
        console.log("Stored " + stringValue + " in data store!")
      }
      // await AsyncStorage.setItem('history', "{}")
      // console.log("Stored " + "{}" + " in data store!")
    }
    storeData().catch(console.error)
  }, [history]);
  
  // Update data
  useEffect(() => {
    const updateData = async (title) => {
      if (title === undefined) { return; }
      const value = await AsyncStorage.getItem('history')
      console.log("Got " + value + " from data store!")
      let jsonValue = JSON.parse(value)

      if (value === null) {
        let tempHistory = {};
        tempHistory[title] = 1;
        setHistory(tempHistory)
        console.log("Manipulation 1: Init")
      } else {
        if (jsonValue.hasOwnProperty(title)) {
          let newCount = jsonValue[title] + 1
          jsonValue[title] = newCount;
          console.log("Manipulation 2: Increment counter");}
        else {
          jsonValue[title] = 1;
          console.log("Maniuplation 3: Added recipe"); 
        }
        setHistory(jsonValue)
      }
    }
  updateData(currRecipe.title).catch(console.error);
}, []);

let numTimes = history[currRecipe.title] + "th";
switch (history[currRecipe.title]) {
  case 1: {numTimes = "1st"; break;}
  case 2: {numTimes = "2nd"; break;}
  case 3: {numTimes = "3rd"; break;}
}

let [name, setName] = useState("No Name")
  //Get history
  useEffect(() => {
    const getData = async () => {
      const value = await AsyncStorage.getItem('name')
      console.log("\nGot " + value + " from data store!")
      if (value !== null) {
        setName(value)
      }
    }
    getData().catch(console.error);
  }, []);
  
return (
  <ImageBackground source={Images.butchers} style={styles.container}>
    <BackHeader onBackButtonPress={() => navigation.goBack({currRecipe: currRecipe})}></BackHeader>
    <View style={{alignItems: 'center'}}>
      <View style={styles.greeting}>
        <Image style={styles.greetingImg} source={Images.spoonNoBg}/>
        <View style={styles.greetingTextContainer}>
          <Text style={[styles.text, {fontSize: 32, fontFamily: 'Avenir-Book'}]}>We did it,</Text>
          <Text style={[styles.text, {fontSize: 40}]}>{name}!</Text>
          <Text style={[styles.text, {fontSize: 64}]}>🎉</Text>
        </View>
      </View>
      <View style={styles.funFact}>
        <Text style={[styles.text, {fontSize: 32}]}>Well done!</Text>
        <Text style={{fontFamily: 'Avenir-Book', fontSize: 20}}>This is the {numTimes} time you've made this recipe with me!</Text>
      </View>
      <RecipalButton width={350} height={50} fontSize={20} text={'View my Recipe History'} onPress={() => toRecipeHistory()}/>
    </View>
  </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    fontFamily: 'Avenir-Black',
  },
  greeting: {
    marginTop: 10,
    height: 350,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  greetingImg: {
    height: '100%',
    resizeMode: 'contain',
    marginHorizontal: 15,
  },
  greetingTextContainer: {
    height: '100%',
    marginHorizontal: 15,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  funFact: {
    width: 350,
    margin: 20,
    padding: 16,
    borderRadius: 20,
    backgroundColor: 'white',
  }
});