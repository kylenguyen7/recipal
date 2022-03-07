import { StyleSheet, Text, ScrollView, Image, View, ImageBackground } from 'react-native';
import { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import RecipalButton from '../RecipalButton'
import RecipalHomeButton from '../RecipalHomeButton'
import Images from '../../constants/images'
import Colors from '../../constants/colors';


export default function HomePage() {
  let scrollView = useRef(null);
  let navigation = useNavigation();

  let categoryList = [];
  const categories = ['Breakfast', 'Brunch', 'Snack', 'Drink', 'Dessert', 'Burger', 'Soup', 'Salad', 'Italian', 'Mexican', 'African', 'Persian', 'Korean', 'Chinese', 'Japanese', 'Vietnamese']

  for(let i = 0; i < categories.length; i += 2) {
    categoryList.push(
      <View key={i} style={{margin: 4, flexDirection: 'row', alignContent: 'space-between'}}>
        <RecipalHomeButton  text={categories[i]} fontSize={22} width={135} height={135}
                          onPress={() => navigation.navigate('RecipeSelect', {category: categories[i]})}/>
        {i < categories.length - 1 &&
        <RecipalHomeButton text={categories[i + 1]} fontSize={22} width={135} height={135}
                          onPress={() => navigation.navigate('RecipeSelect', {category: categories[i + 1]})}/>}
      </View>
    )
  }

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
            <Text style={[styles.text, {fontSize: 32}]}>Good morning,</Text>
            <Text style={[styles.text, {fontSize: 40}]}>Andy!</Text>
          </View>
        </View>
        <View style={styles.funFact}>
          <Text style={[styles.text, {fontSize: 32}]}>Fun Fact</Text>
          <Text style={{fontFamily: 'Avenir-Book', fontSize: 20}}>Black pepper was so valuable, it used to be a currency in the Middle Ages!</Text>
        </View>
        <RecipalButton text={'LET\'S COOK!'} fontSize={40} width={350} height={100}
                          onPress={() => scrollView.current.scrollTo({ x: 0, y: 650, animated: true })}/>
        <ImageBackground source={Images.notepad} style={styles.notebook}>
          <Text style={[styles.text, styles.headerText, {color: Colors.tomato}]}>Recipes</Text>
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
    padding: 40,
    paddingLeft: 85,
    resizeMode: 'contain',
    height: 1300,
    width: undefined,
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
    borderColor: Colors.pasta,
    borderWidth: 3,
    borderRadius: 20,
    backgroundColor: 'white',
  },
});