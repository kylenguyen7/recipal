import { StyleSheet, Text, View, Image, Pressable, Modal } from 'react-native';
import { useState, useEffect } from 'react';
import { SearchableFlatList } from "react-native-searchable-list";
import { SearchBar } from 'react-native-elements';

import Images from '../../constants/images';
import Header from '../BackHeader'
import IngredientsData, { findIngredientByTitle, findIngredientsByCategory } from '../../constants/ingredients-data';
import Sizes from '../../constants/sizes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/colors';



export default function IngredientSearch({ navigation, route }) {
  let { currRecipe, stepNum, ingredientToSwap, updateIngredientsList } = route.params;
  const ingredientToSwapData = findIngredientByTitle(ingredientToSwap);
  const swaps = ingredientToSwap === undefined ? IngredientsData : 
                  findIngredientsByCategory(ingredientToSwapData.category);
  const [searchTerm, setSearchTerm] = useState("");
  const searchAttribute = "title";
  const ignoreCase = true;

  function replaceIngredient(replacementTitle) {
    // Find index of ingredient to swap
    let ingredients = currRecipe.steps[stepNum].ingredients;
    
    for(let i = 0; i < ingredients.length; i += 1) {
      if (ingredients[i].title === ingredientToSwap) {
        // Set it to replacement ingredient
        const replacementIngredientData = findIngredientByTitle(replacementTitle);

        ingredients[i] = {
          title: replacementIngredientData.title,
          amount: replacementIngredientData.defaultAmount,
          isEssential: true
        }
        break;
      }
    }
    updateIngredientsList();
  }

  // WARNING MODAL
  const [violatingRestrictions, setRestrictions] = useState([]);
  const [warningModalMessage, setWarningModalMessage] = useState("");

  useEffect(() => {
    const getData = async () => {
      const stringValue = await AsyncStorage.getItem('restrictions')
      const value = JSON.parse(stringValue)
      setRestrictions(value);
    }
    getData().catch(console.error);
  }, []);

  function showModal(violations) {
    let violationsList = "";
    for(let i = 0; i < violations.length; i++) {
      violationsList += "• " + violations[i] + (i == violations.length - 1 ? "" : "\n");
    }

    setWarningModalMessage(violationsList);
  }

  function WarningModal() {
    return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={warningModalMessage !== ""}
        onRequestClose={() => {
          setWarningModalMessage("");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={[styles.modalText, {fontSize: 20, fontFamily: 'Avenir-Black'}]}>Warning</Text>
            <Text style={[styles.modalText, {fontSize: 16}]}>This ingredient violates some of your dietary restrictions!</Text>
            <Text style={[styles.modalText, {fontSize: 16, textAlign: 'left', marginBottom: 20}]}>{warningModalMessage}</Text>
            <View style={styles.modalButtonContainer}>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => {
                  setWarningModalMessage("");
                }}
              >
                <Text style={[styles.textStyle, styles.cancelTextStyle]}>Okay</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
  // END WARNING

  function addIngredient(title) {
    const newIngredientData = findIngredientByTitle(title);

    currRecipe.steps[stepNum].ingredients.push({
      title: newIngredientData.title,
      amount: newIngredientData.defaultAmount,
      isEssential: false
    });

    updateIngredientsList();
  }

  function Item({ defaultAmount, units, image, title, restrictions }) {
    const violations = [];

    if(restrictions !== undefined) {
      for(let i = 0; i < restrictions.length; i++) {
        if(violatingRestrictions.includes(restrictions[i])) {
          violations.push(restrictions[i]);
        }
      }
    }

    return (
    <Pressable style={styles.item} onPress={() => {
        if(ingredientToSwap === undefined) {
          addIngredient(title);
        } else {
          replaceIngredient(title);
        }
        navigation.goBack()
      }}>
      <Image source={image} style={styles.itemImg}/>
      <Text numberOfLines={1} style={styles.itemText}>{defaultAmount} {units} {title}</Text>
      { violations.length > 0 && 
          <Pressable style={styles.headerPressable} onPress={() => {showModal(violations)}}>
            <Ionicons name="warning-outline" size={32} color={Colors.pasta}></Ionicons>
          </Pressable> }
    </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <Header onBackButtonPress={() => navigation.goBack({currRecipe: currRecipe})}></Header>
      <WarningModal/>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <View style={styles.titleTextContainer}>
            <Text style={[styles.titleText, {fontSize: 30}]}>MODIFY</Text>
            <Text style={[styles.titleText, {fontSize: 24}]}>Non-Essential</Text>
          </View>
          <Image source={Images.spoonInCircle} style={styles.titleImg}></Image>
        </View>
        <View style={styles.search}>
          <SearchBar
            platform='ios'
            placeholder="Search..."
            onChangeText={(search) => setSearchTerm(search)}
            value={searchTerm}
          />
        </View>  
        <SearchableFlatList
            contentContainerStyle={{ flexGrow: 1, alignItems: 'flex-start' }}
            style={styles.listContainer} data={swaps} searchTerm={searchTerm}
            searchAttribute={searchAttribute} ignoreCase={ignoreCase}
            renderItem={({item}) => Item(item)}
            keyExtractor={(item) => item.title} />
      </View>
    </View> 
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    alignItems: 'center',
    flex: 1,
  },

  // TITLE
  titleContainer: {
    height: 150,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  titleTextContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  titleText: {
    fontFamily: 'Avenir-Book'
  },
  titleImg: {
    height: '100%',
    width: 110,
    resizeMode: 'contain',
    position: 'relative',
    bottom: 10
  },

  // SEARCH
  search: {
    width: '100%'
  },

  // LIST
  listContainer: {
    width: '100%',
    backgroundColor: 'white'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 5,
    height: Sizes.itemHeight,
    width: '100%',
    backgroundColor: 'white',

    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5,
  },
  itemImg: {
    height: '100%',
    width: undefined,
    aspectRatio: 1,
    resizeMode: 'contain'
  },
  itemText: {
    fontFamily: 'Avenir-Book',
    fontSize: Sizes.itemFontSize,
    marginHorizontal: 5,
    flex: 1
  },

  // Modal
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