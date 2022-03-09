import { StyleSheet, Text, View, Image, ScrollView, Modal, Pressable } from 'react-native';
import { useRef, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Images from '../../constants/images';
import Colors from '../../constants/colors';
import RecipalButton from '../RecipalButton'
import Counter from '../Counter'
import RecipeItem from '../RecipeItem';
import { recipeData, findRecipeByTitle } from '../../constants/recipe-data'
import { resetLimits } from '../../constants/keys';


export default function MeScreen() {
  let scrollView = useRef(null);
  let navigation = useNavigation();
  const [history, setHistory] = useState({});
  const [modalVisible, setModalVisible] = useState(false); 

  function toHome() {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
    //navigation.navigate("Welcome")
  }

  const ResetModal = () => (
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={[styles.modalText, {fontFamily: 'Avenir-Black', fontSize: 20}]}>Warning!</Text>
            <Text style={[styles.modalText, {fontSize: 16}]}>You are about to wipe your account data and start over. Are you sure?</Text>
            <View style={styles.modalButtonContainer}>
              <Pressable
                  style={[styles.button, styles.buttonExit]}
                  onPress={() => {
                    setModalVisible(false);
                  }}>
                <Text style={[styles.textStyle, styles.exitTextStyle]}>No, go back</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => {
                  AsyncStorage.setItem('history', "{}");
                  AsyncStorage.setItem('restrictions', "[]");
                  AsyncStorage.setItem('firstTime', "true");
                  resetLimits();
                  setModalVisible(false);
                  toHome();
                }}
              >
                <Text style={[styles.textStyle, styles.cancelTextStyle]}>Yes, start over</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
  );

  

  //Get history
  useEffect(() => {
    const getData = async () => {
      const value = await AsyncStorage.getItem('history')
      console.log("\nGot " + value + " from data store!")
      if (value !== null) {
        setHistory(JSON.parse(value))
      }
    }
    getData().catch(console.error);
  }, []);

  
  // Store data
  useEffect(() => {
    const storeData = async () => {
      const jsonValue = JSON.stringify(history)
      //AsyncStorage.setItem("history", "null")
      await AsyncStorage.setItem('history', jsonValue)
      console.log("Stored " + jsonValue + " in data store!")
    }
    storeData(history).catch(console.error);
  }, [history]);


  // Render history
  let historyList = [];
  let historyData = Object.keys(history);
  for(let i = 0; i < historyData.length; i++) {
    const recipe = findRecipeByTitle(historyData[i]);
    historyList.push(
      <RecipeItem id={i} recipe={recipe}/>
    )
  }
  let historyRendered = undefined
  if (historyList.length > 0) {
    historyRendered = historyList
  } else {
    historyRendered = 
      <Text style={styles.firstTime}>You haven't cooked any meals yet!</Text>
  }


  let totalTime = 0;
  for (const [recipe, times] of Object.entries(history)) {
    totalTime += findRecipeByTitle(recipe).time * times
  }
  
  

  return (
    <View style={{flex: 1, paddingTop: 50}}>
      <ResetModal/>
      <ScrollView ref={scrollView}>
        <View style={styles.content}>

          <View style={styles.titleContainer}>
            <Image source={Images.spoonInCircle} style={styles.titleImg}></Image>
            <Text style={styles.titleText}>ABOUT ME</Text>
          </View>

          <View style={styles.counterContainer}>
            <Counter number={Object.values(history).reduce((partialSum, a) => partialSum + a, 0)} category={'Meals'}/>
            <Counter number={Object.keys(history).length} category={'Recipes'}/>
            <Counter number={totalTime} category={'Hours'}/>
          </View>

          <View style={styles.editDietButtons}>
            <RecipalButton text={'My Dietary Restrictions'} fontSize={20} width={'90%'} height={50}
                           onPress={() =>  navigation.navigate('DietRestrictScreen')}/>
            <RecipalButton text={'My Nutritional Preferences'} fontSize={20} width={'90%'} height={50}
                           onPress={() =>  navigation.navigate('NutriPrefScreen')}/>
            <RecipalButton text={'Restore Account'} fontSize={20} width={'90%'} height={50}
                           onPress={() => setModalVisible(true)}/>
          </View>
        
          <Text style={styles.historyText}>My Latest Recipes 🧑‍🍳</Text>
          <View style={styles.historyContainer}>
            {historyRendered}
          </View>
        </View>
        <View style={{marginVertical: 10, alignItems: 'center', width: '100%'}}>
          <View style={{width: '90%'}}>
            <Text style={{fontSize: 10, textAlign: 'center', color: 'gray', fontStyle: 'italic'}}>Unfortunately, Recipal currently only supports customary units of measure. Plans to support metric units are in the works!</Text>
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
    justifyContent: 'center',
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
    //height: 120,
    marginTop: 15,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
  },
  editDietButtons: {
    marginTop: 10,
    height: 190,
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
    alignItems: 'center'
  },
  firstTime: {
    backgroundColor: 'white',
    width: '90%',
    margin: 10,
    padding: 10,
    fontFamily: 'Avenir-Book',
    textAlign: 'center',
    borderRadius: 20,
    overflow: 'hidden',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalButtonContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    borderRadius: 1000,
    padding: 10,
    elevation: 2,
    borderColor: Colors.tomato,
    borderWidth: 3
  },
  buttonExit: {
    backgroundColor: Colors.white,
  },
  buttonCancel: {
    backgroundColor: Colors.tomato,
  },
  textStyle: {
    fontFamily: 'Avenir-Book',
    fontWeight: "bold",
    textAlign: "center"
  },
  exitTextStyle: {
    color: Colors.tomato
  },
  cancelTextStyle: {
    color: 'white'
  },
  modalText: {
    fontFamily: 'Avenir-Book',
    fontSize: 14,
    marginBottom: 15,
    textAlign: "center"
  },
})