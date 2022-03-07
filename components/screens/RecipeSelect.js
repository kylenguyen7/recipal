import { StyleSheet, Text, Image, Pressable, ImageBackground, View, Modal, ScrollView } from 'react-native';
import { useState, useEffect, cloneElement } from 'react';
import { SearchableFlatList } from "react-native-searchable-list";
import { SearchBar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../BackHeader'
import Images from '../../constants/images';
import Colors from '../../constants/colors'
import RecipeData from '../../constants/recipe-data'
import IngredientsData, { findIngredientByTitle } from '../../constants/ingredients-data';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RecipeSelect({navigation, route}) {
  const [searchTerm, setSearchTerm] = useState("");
  let { category } = route.params;

  const searchAttribute = "title";
  const ignoreCase = true;
  

    // CREATE RECIPE LIST
    const filteredRecipes = RecipeData.filter(checkCategory);
    function checkCategory(recipe) {
      if (recipe.category === category) {return recipe;}
    }
    let recipeList = undefined;
    if (filteredRecipes.length > 0) { // Case 1: Recipes exist
      recipeList =
        <View style={{alignItems: 'center'}}>
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
            ListEmptyComponent={<Text style={[styles.listNotAvailable, {width: 230}]}>Sorry, there are no recipes under this search term.</Text>}
            style={styles.list} data={filteredRecipes} searchTerm={searchTerm}
            searchAttribute={searchAttribute} ignoreCase={ignoreCase}
            renderItem={({ item }) => renderRecipe(item)}
            keyExtractor={(item) => item.title} />
        </View>
        </View>
    } else { // Case 2: No recipes
      recipeList =
      <Text style={styles.listNotAvailable}>Sorry, there are no recipes available in this category yet.</Text>
    }


  // START WARNINGS 
  // 1. Get user data
  const [restrictions, setRestrictions] = useState([]);
  useEffect(() => { 
    const getData = async () => {
      const stringValue = await AsyncStorage.getItem('restrictions')
      const value = JSON.parse(stringValue)
      setRestrictions(value);
    }
    getData().catch(console.error);
  }, []);

  // 2. Loop each ingredient
  function alreadyAdded(allViolations, ingredient) {
    for (let k = 0; k < allViolations.length; k++) {
      if (allViolations[k].ingredient === ingredient) {
        return true
      }  
    }
    return false
  }

  function checkViolations(steps) {
    let allViolations = []
    for (let i = 0; i < steps.length; i++) {
      for (let j = 0; j < steps[i].ingredients.length; j++)  {
        //console.log(steps[i].ingredients[j].title)
        let conflicts = checkIngredient(steps[i].ingredients[j].title)
        if (alreadyAdded(allViolations, steps[i].ingredients[j].title)) {
          continue;
        }
        //console.log(conflicts)
        if (conflicts.length > 0) {
          allViolations.push({
            ingredient: steps[i].ingredients[j].title,
            violations: conflicts
          })
        }
      }
    }
   return allViolations
  }

  // 3. check individual ingredient
  function checkIngredient(ingredient) {
    let violations = [];
    let ingredientData = findIngredientByTitle(ingredient)
    if (ingredientData.restrictions === undefined) return violations
    for (let i = 0; i < ingredientData.restrictions.length; i++) {
      if (restrictions.includes(ingredientData.restrictions[i])) {
        violations.push(ingredientData.restrictions[i]);
      }
    }
    return violations
  }

  // 4. Render 
  const [warningModalMessage, setWarningModalMessage] = useState(undefined);
  const [recipeForNav, setRecipe] = useState(undefined);

  function showModal(violationInfo, recipe) {
    setRecipe(recipe)
    let violationsRendered = []
    for (let i = 0; i < violationInfo.length; i++) {
      let violationsList = "";
      for(let j = 0; j < violationInfo[i].violations.length; j++) {
        violationsList += "• " + violationInfo[i].violations[j] + (j == violationInfo[i].violations[j].length - 1 ? "" : "\n");
      }
      violationsRendered.push(
        <View>
          <Text style={{fontSize: 16, fontFamily: 'Avenir-Black'}}>{violationInfo[i].ingredient}</Text>
          <Text style={[styles.modalText, {fontSize: 16, textAlign: 'left', marginBottom: 0}]}>{violationsList}</Text>
        </View>
      )
    }
    setWarningModalMessage(violationsRendered);
  }

  function WarningModal() {
    return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={warningModalMessage !== undefined}
        onRequestClose={() => {
          setWarningModalMessage("");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={[styles.modalText, {fontSize: 20, fontFamily: 'Avenir-Black'}]}>Warning</Text>
            <Text style={[styles.modalText, {fontSize: 16}]}>The following ingredients violate some of your dietary restrictions!</Text>
            <Text style={[styles.modalText, {fontSize: 16, textAlign: 'left'}]}>
                {warningModalMessage}
            </Text>
            <View style={styles.modalButtonContainer}>
              <Pressable
                style={[styles.button, styles.buttonExit]}
                onPress={() => {
                  navigation.navigate("Ingredients", {currRecipe: JSON.parse(JSON.stringify(recipeForNav))}),
                  setWarningModalMessage(undefined);
                }}
              >
                <Text style={[styles.textStyle, styles.exitTextStyle]}>Proceed anyways</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => {
                  setWarningModalMessage(undefined);
                }}
              >
                <Text style={[styles.textStyle, styles.cancelTextStyle]}>Go back</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
  // END WARNING

  // LAYOUTS 
  function renderRecipe(recipe) {
    const { title, time, image, calories, steps } = recipe
    const violationsInfo = checkViolations(steps)
    //console.log(violationsInfo)

    return (  
      <Pressable style={styles.recipeContainer}
        onPress={() => {violationsInfo.length > 0 ?
          showModal(violationsInfo, recipe) :
          navigation.navigate("Ingredients", {currRecipe: JSON.parse(JSON.stringify(recipe))})}}>
        <WarningModal/>
        <Image style={styles.recipeImg} source={image}/>
        <View style={styles.recipeTextContainer}>
          <Text style={styles.recipeTitle}>{title}</Text>
          <Text style={styles.recipeSubtitle}>Time: {time} hours</Text>
          <Text style={styles.recipeSubtitle}>Calories: {calories} cal</Text>
        </View>
        { violationsInfo.length > 0 && 
          <View style={styles.headerPressable}>
            <Ionicons name="warning-outline" size={32} color={Colors.pasta}></Ionicons>
          </View> }
      </Pressable>
    )
  }

  //console.log(recipeList.length)
  return ( 
    <ImageBackground source={Images.butchers} style={styles.container}>
      <Header onBackButtonPress={() => navigation.goBack()}></Header>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <View style={styles.titleTextContainer}>
            <Text style={styles.titleText}>{category}</Text>
            <Text style={styles.titleText}>Recipes</Text>
          </View>
          <Image source={Images.spoonInCircle} style={styles.titleImg}></Image>
        </View>
        <ImageBackground source={Images.notepad} style={styles.notebook}>
          {recipeList}
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
    width: 290,
    margin: 7,
    paddingLeft: 10,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    //justifyContent: 'center',
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
  },
  listNotAvailable: {
    backgroundColor: 'white',
    width: '90%',
    margin: 10,
    marginTop: 50,
    padding: 10,
    fontFamily: 'Avenir-Book',
    textAlign: 'center',
    borderRadius: 20,
    overflow: 'hidden',
  },
  headerPressable: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },


  container: {
    flex: 1,
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
    justifyContent: 'space-around'
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
});