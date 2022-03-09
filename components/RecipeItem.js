import { StyleSheet, Text, Image, Pressable, ImageBackground, View, Modal, ScrollView } from 'react-native';
import Colors from '../constants/colors';
import { useNavigation } from "@react-navigation/native";
import { findIngredientByTitle } from "../constants/ingredients-data";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRef, useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';


export default function RecipeItem({ recipe }) {
    let navigation = useNavigation()
    const { title, time, image, calories, steps } = recipe

    // START WARNINGS 
    // 1. Get user data
    const [restrictions, setRestrictions] = useState([]);
    useEffect(() => { 
        const getData = async () => {
            const stringValue = await AsyncStorage.getItem('restrictions')
            console.log("\nGot " + stringValue + " from data store!")
            if (stringValue !== null) {
                const value = JSON.parse(stringValue);
                setRestrictions(value);
            }
        }
        getData().catch(console.error);
    }, []);

  // Store data
  useEffect(() => {
    const storeData = async (value) => {
      const jsonValue = JSON.stringify(value)
      //AsyncStorage.setItem("history", "null")
      await AsyncStorage.setItem('restrictions', jsonValue)
      console.log("Stored " + jsonValue + " in data store!")
    }
    storeData(restrictions).catch(console.error);
  }, [restrictions]);

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
        console.log("Sup" + restrictions)
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
                <View style={{width: '80%'}}>
                {warningModalMessage}
                </View>
                <View style={styles.modalButtonContainer}>
                <Pressable
                    style={[styles.button, styles.buttonExit]}
                    onPress={() => {
                    setWarningModalMessage(undefined);
                    }}>
                <Text style={[styles.textStyle, styles.exitTextStyle]}>Go back</Text>
                </Pressable>
                <Pressable
                    style={[styles.button, styles.buttonCancel]}
                    onPress={() => {
                    navigation.navigate("Ingredients", {currRecipe: JSON.parse(JSON.stringify(recipeForNav))}),
                    setWarningModalMessage(undefined);
                    }}
                >
                    <Text style={[styles.textStyle, styles.cancelTextStyle]}>Proceed anyways</Text>
                </Pressable>
                </View>
            </View>
            </View>
        </Modal>
        );
    }
    // END WARNING

    const violationsInfo = checkViolations(steps)
    return (
        <Pressable style={styles.recipeContainer}
        onPress={() => {violationsInfo.length > 0 ?
          showModal(violationsInfo, recipe) :
          navigation.navigate("Ingredients", {currRecipe: recipe, from: "Me"})}}>
        <WarningModal/>
        <View style={styles.leftSide}>
          <Image style={styles.recipeImg} source={image}/>
          <View style={styles.recipeTextContainer}>
            <Text style={styles.recipeTitle}>{title}</Text>
            <Text style={styles.recipeSubtitle}>Time: {time} hours</Text>
            <Text style={styles.recipeSubtitle}>Calories: {calories} cal</Text>
          </View>
          </View>
          { violationsInfo.length > 0 && 
          <View style={styles.headerPressable}>
            <Ionicons name="warning-outline" size={32} color={Colors.pasta}></Ionicons>
          </View> }
      </Pressable>
    );
}

const styles = StyleSheet.create({
    recipeContainer: {
        height: 100,
        width: '90%',
        margin: 7,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        //justifyContent: 'cn',
        paddingLeft: '3%',
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
      leftSide: {
        height: '95%',
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center'
  },
  headerPressable: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'flex-end'
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