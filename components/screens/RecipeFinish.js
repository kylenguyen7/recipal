import { StyleSheet, Text, ScrollView, Image, View, ImageBackground } from 'react-native';
import { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
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

  return (
    <ImageBackground source={Images.butchers} style={styles.container}>
    <BackHeader onBackButtonPress={() => navigation.goBack({currRecipe: currRecipe})}></BackHeader>
    <View style={{alignItems: 'center'}}>
      <View style={styles.greeting}>
        <Image style={styles.greetingImg} source={Images.spoonNoBg}/>
        <View style={styles.greetingTextContainer}>
          <Text style={[styles.text, {fontSize: 32}]}>We did it,</Text>
          <Text style={[styles.text, {fontSize: 40}]}>Andy!</Text>
          <Text style={[styles.text, {fontSize: 64}]}>🎉</Text>
        </View>
      </View>
      <View style={styles.funFact}>
        <Text style={[styles.text, {fontSize: 32}]}>Well done!</Text>
        <Text style={{fontFamily: 'Avenir-Book', fontSize: 20}}>This is the 5th time you've made this recipe with me!</Text>
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
    borderColor: Colors.pasta,
    borderWidth: 3,
    borderRadius: 20,
    backgroundColor: 'white',
  }
});