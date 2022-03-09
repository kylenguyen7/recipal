import { StyleSheet, Text, ScrollView, Image, View, ImageBackground, Modal, Pressable, KeyboardAvoidingView, TextInput } from 'react-native';
import { useRef, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import RecipalButton from '../RecipalButton'
import RecipalHomeButton from '../RecipalHomeButton'
import Images from '../../constants/images'
import Colors from '../../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function HomePage() {
  let scrollView = useRef(null);
  let navigation = useNavigation();
  const [text, setText] = useState("")


  let categoryList = [];
  const categories = ['Breakfast', 'Brunch', 'Snack', 'Drink', 'Dessert', 'Burger', 'Soup', 'Salad', 'Italian', 'Mexican', 'African', 'Persian', 'Korean', 'Chinese', 'Japanese', 'Vietnamese']

  for(let i = 0; i < categories.length; i += 2) {
    categoryList.push(
      <View key={i} style={{margin: 4, flexDirection: 'row', justifyContent: 'space-between'}}>
        <RecipalHomeButton  text={categories[i]} fontSize={22} width={150} height={125}
                          onPress={() => navigation.navigate('RecipeSelect', {category: categories[i]})}/>
        {i < categories.length - 1 &&
        <RecipalHomeButton text={categories[i + 1]} fontSize={22} width={150} height={125}
                          onPress={() => navigation.navigate('RecipeSelect', {category: categories[i + 1]})}/>}
      </View>
    )
  }

  const funFacts = [
    "The oldest soup recognized was from 6,000 BC. The recipe was a stew of sparrow and hippopotamus meat.",
    //"Saffron is more expensive than gold. Each flower produces about three red stamens which must be hand-picked. For every 150 flowers, only 1 gram of saffron is produced. The lengthy process plus its rarity makes this precious spice cost $3,000 per kg.",
    "A chef traditionally wears white because the chef of the first prime minister of France (1815) believed that white was the most hygienic of all the colors.",
    "Historically, the taller the chef's hat, the more important or knowledgeable a chef was. Today, most chef hats are about 9–12 inches tall.",
    "The pound cake is so named because the original recipe called for a pound each of butter, flour, sugar, and eggs.",
    "A cluster of bananas is called a hand. A single banana is called a finger.",
    "Most vegetables retain more nutrients from microwaving than any other form of cooking, and therefore microwaving is the healthiest way to cook your veggies.",
    "Almond milk was heavily used in medieval cooking and sauces. It was considered far more grand and luxurious than cow milk.",
    "Chopsticks were invented for cooking, not eating.",
    "The holes in crackers prevent air bubbles from ruining the product during the baking process.",
    "Ketchup used to be used as a medicine because in the early 1800s, people thought tomatoes had medicinal qualities.",
    "Cheese is the most stolen food in the world—about 4% of all cheese made around the globe ends up stolen.",
    "An astronaut smuggled a corned beef sandwich on his spacecraft for a 6-hour mission.",
    "Ripe cranberries will bounce.",
    "A 2014 study found that 49% of Americans over 20 eat one sandwich every day.",
    "Tonic water glows in the dark.",
    "Goat meat is the most popular meat—it accounts for 70% of the red meat eaten globally."
  ]   
  const funFact = funFacts[Math.floor(Math.random() * funFacts.length)];

  let [name, setName] = useState("No Name")
  //Get history
  useEffect(() => {
    const getData = async () => {
      const value = await AsyncStorage.getItem('name')
      console.log("\nGot " + value + " from data store!")
      if (value !== null) {
        setName(value)
      } else {
        navigation.navigate("Welcome")
      }
    }
    getData().catch(console.error);
  }, []);
  
  
  return (
    <ImageBackground source={Images.butchers} style={styles.container}>
    <ScrollView ref={scrollView}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image style={styles.headerImg} source={Images.spoonInCircle}/>
          <Text style={[styles.text, styles.headerText]}>Recipal</Text>
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <View style={styles.greeting}>
          <Image style={styles.greetingImg} source={Images.spoonNoBg}/>
          <View style={styles.greetingTextContainer}>
            <Text style={[styles.text, {fontSize: 32, fontFamily: 'Avenir-Book'}]}>Welcome back,</Text>
            <Text style={[styles.text, {fontSize: 40}]}>{name}</Text>
          </View>
        </View>
        <View style={styles.funFact}>
          <Text style={[styles.text, {fontSize: 27, fontFamily: 'Avenir-Book'}]}>Fun Fact</Text>
          <Text style={{fontFamily: 'Avenir-Book', fontSize: 20}}>{funFact}</Text>
        </View>
        <RecipalButton text={'LET\'S COOK!'} fontSize={40} width={350} height={100}
                          onPress={() => scrollView.current.scrollTo({ x: 0, y: 650, animated: true })}/>
        <ImageBackground source={Images.notepad} style={styles.notebook}>
          <Text style={[styles.text, styles.headerText, {color: Colors.tomato, marginBottom: 10}]}>Recipes</Text>
          {categoryList}
        </ImageBackground>
      </View>
    </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  notebook: {
    marginTop: 10,
    paddingBottom: 40,
    paddingTop: 70,
    resizeMode: 'contain',
    height: undefined,
    width: 355,
    aspectRatio: 384 / 1349,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  header: {
    height: 100,
    display: 'flex',
    justifyContent: 'flex-end',
    paddingHorizontal: 8
  },
  headerContent: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerImg: {
    height: '100%',
    width: 40,
    resizeMode: 'contain',
    position: 'relative',
    bottom: 6,
    margin: 4
  },
  text: {
    fontFamily: 'Avenir-Black',
  },
  headerText: {
    fontSize: 40,
    //marginBottom: 10
  },
  greeting: {
    marginTop: 10,
    height: 250,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  greetingImg: {
    height: '100%',
    resizeMode: 'contain',
  },
  greetingTextContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  funFact: {
    width: 350,
    margin: 20,
    padding: 16,
    // borderColor: Colors.pasta,
    // borderWidth: 3,
    borderRadius: 20,
    backgroundColor: 'white',
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
  textinput: {
    height: 40,
    width: 40,
    backgroundColor: '#dddddd',
    borderRadius: 10,
    textAlign: 'center',
    fontFamily: 'Avenir-Book'
  },
});