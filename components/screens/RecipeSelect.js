import { StyleSheet, Text, Image, Pressable, ImageBackground, View } from 'react-native';
import { useState } from 'react';
import { SearchableFlatList } from "react-native-searchable-list";
import { SearchBar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Header from '../BackHeader'
import Images from '../../constants/images';
import Colors from '../../constants/colors'
import RecipeData from '../../constants/recipe-data'

export default function RecipeSelect() {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState("");

  const searchAttribute = "title";
  const ignoreCase = true;

  function renderRecipe(recipe) {
    const { title, time, image, calories } = recipe
    return (
      <Pressable style={styles.recipeContainer} onPress={() => {navigation.navigate("Ingredients", {currRecipe: JSON.parse(JSON.stringify(recipe))})}}>
        <Image style={styles.recipeImg} source={image}/>
        <View style={styles.recipeTextContainer}>
          <Text style={styles.recipeTitle}>{title}</Text>
          <Text style={styles.recipeSubtitle}>Time: {time}</Text>
          <Text style={styles.recipeSubtitle}>Calories: {calories} cal</Text>
        </View>
      </Pressable>
    )
  }

  return ( 
    <ImageBackground source={Images.butchers} style={styles.container}>
      <Header onBackButtonPress={() => navigation.goBack()}></Header>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <View style={styles.titleTextContainer}>
            <Text style={styles.titleText}>Italian</Text>
            <Text style={styles.titleText}>Recipes</Text>
          </View>
          <Image source={Images.spoonInCircle} style={styles.titleImg}></Image>
        </View>
        <ImageBackground source={Images.notepad} style={styles.notebook}>
          <View style={{width: '110%'}}>
            <SearchBar
              platform='ios'
              placeholder="Search..."
              onChangeText={(search) => setSearchTerm(search)}
              value={searchTerm}
            />
          </View>  
          <View style={styles.listContainer}>
            <SearchableFlatList
              contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
              style={styles.list} data={RecipeData} searchTerm={searchTerm}
              searchAttribute={searchAttribute} ignoreCase={ignoreCase}
              renderItem={({ item }) => renderRecipe(item)}
              keyExtractor={(item) => item.title} />
          </View>
        </ImageBackground>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  content: {
    flex: 1,
    alignItems: 'center'
  },
  titleContainer: {
    height: 110,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleImg: {
    height: '110%',
    width: 110,
    resizeMode: 'contain',
    position: 'relative',
    bottom: 10,
  },
  titleTextContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 25
  },
  titleText: {
    fontFamily: 'Avenir-Black',
    color: 'black',
    fontSize: 32,
  },
  notebook: {
    padding: 30,
    paddingLeft: 70,
    resizeMode: 'contain',
    height: 1300,
    width: undefined,
    aspectRatio: 384 / 1349,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  listContainer: {
    height: 430,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    width: '100%'
  },
  recipeContainer: {
    height: 100,
    width: 250,
    margin: 7,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5
  },
  recipeImg: {
    height: '80%',
    width: '30%',
    resizeMode: 'cover',
    backgroundColor: Colors.tomato,
  },
  recipeTextContainer: {
    marginLeft: 10,
    width: 140
  },
  recipeTitle: {
    fontFamily: 'Avenir-Book',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16
  },
  recipeSubtitle: {
    fontFamily: 'Avenir-Book',
    color: 'black',
    fontSize: 12
  }
});