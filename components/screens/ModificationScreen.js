import { StyleSheet, Text, Image, Pressable, ImageBackground, View, SectionList, Modal, KeyboardAvoidingView, TextInput } from 'react-native';
import RecipalButton from '../RecipalButton'
import Header from '../BackHeader'
import Images from '../../constants/images';
import Colors from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { findIngredientByTitle } from '../../constants/ingredients-data';
import { findRecipeByTitle } from '../../constants/recipe-data';
import { getAllLimits } from '../../constants/keys';
import Sizes from '../../constants/sizes';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Modification({ navigation, route }) {
  let { currRecipe, stepNum, prevPage } = route.params;
  const [ingredients, setIngredients] = useState(generateIngredientsList());
  const [restoreModalVisible, setRestoreModalVisible] = useState(false);
  const [nutrientWarningModalMessage, setNutrientWarningModalMessage] = useState("");
  const [limits, setLimits] = useState({});

  const getLimits = async () => {
    setLimits(await getAllLimits());
  }

  useEffect(() => {
    getLimits().catch(console.error);
  }, [ingredients]);

  // WARNING MODAL
  const [restrictions, setRestrictions] = useState([]);
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


  function generateIngredientsList() {
    const essentialIngredients = [];
    const nonEssentialIngredients = [{
      title: "Non-Essentials",
      data: []
    }];

    for(let i = 0; i < currRecipe.steps[stepNum].ingredients.length; i++) {
      const ingredient = currRecipe.steps[stepNum].ingredients[i];
      const ingredientData = findIngredientByTitle(ingredient.title);

      if(ingredientData === null) {
        console.error("No ingredient found with title " + ingredient.title);
      }

      if(ingredient.isEssential) {
        essentialIngredients.push({
          title: "Essential: " + ingredientData.category,
          data: [{...ingredient, ingredientIndex: i}],
        })
      } else {
        nonEssentialIngredients[0].data.push({...ingredient, ingredientIndex: i})
      }
    }

    nonEssentialIngredients[0].data.push({plus: true});

    return [...essentialIngredients, ...nonEssentialIngredients];
  }

  function updateIngredientsList() {
    const newList = generateIngredientsList();
    setIngredients(newList);
  }

  // Restores default ingredients for the current step
  function restoreDefaultIngredients() {
    currRecipe.steps[stepNum].ingredients = JSON.parse(JSON.stringify(findRecipeByTitle(currRecipe.title).steps[stepNum].ingredients));
    updateIngredientsList();
  }

  const RestoreModal = () => (
    <Modal
        animationType="slide"
        transparent={true}
        visible={restoreModalVisible}
        onRequestClose={() => {
          setRestoreModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={[styles.modalText, {fontSize: 20, fontFamily: 'Avenir-Black'}]}>Restore Defaults</Text>
            <Text style={[styles.modalText, {fontSize: 16}]}>Are you sure you want to restore the the original ingredients and measurements for this step?</Text>
            <View style={styles.modalButtonContainer}>
              <Pressable
                style={[styles.button, styles.buttonExit]}
                onPress={() => {
                  setRestoreModalVisible(false);
                }}
              >
                <Text style={[styles.textStyle, styles.exitTextStyle]}>No, cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => {
                  restoreDefaultIngredients();
                  setRestoreModalVisible(false);
                }}
              >
              <Text style={[styles.textStyle, styles.cancelTextStyle]}>Yes, please!</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
  );

  const NutrientWarningModal = () => (
    <Modal
        animationType="slide"
        transparent={true}
        visible={nutrientWarningModalMessage !== ""}
        onRequestClose={() => {
          setNutrientWarningModalMessage("");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={[styles.modalText, {fontSize: 20, fontFamily: 'Avenir-Black'}]}>Warning!</Text>
            <Text style={[styles.modalText, {fontSize: 16}]}>{nutrientWarningModalMessage}</Text>
            <View style={styles.modalButtonContainer}>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => {
                  setNutrientWarningModalMessage("");
                }}>
                <Text style={[styles.textStyle, styles.cancelTextStyle]}>Okay.</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
  );

  function deleteIngredientFromStep(stepNum, ingredientIndex) {
    let ingredients = currRecipe.steps[stepNum].ingredients;
    ingredients.splice(ingredientIndex, 1);

    updateIngredientsList();
  }

  function Item({ ingredient }) {
    if(ingredient.plus) {
      return (
        <View style={[styles.item, {backgroundColor: '#dddddd', justifyContent: 'center'}]}>
          <Pressable onPress={() => navigation.navigate("IngredientSearch", { currRecipe, stepNum, updateIngredientsList })}> 
            <Ionicons name="add-outline" size={32} color="green"></Ionicons>
          </Pressable>
        </View>
      );
    }

    const [amount, setAmount] = useState((ingredient.amount).toString());
    const ingredientData = findIngredientByTitle(ingredient.title);

    let editIcon = null;
    if (ingredient.isEssential) {
      editIcon =
        <Pressable onPress={() => navigation.navigate("IngredientSearch", { currRecipe, stepNum, updateIngredientsList, ingredientToSwap: ingredient.title })}> 
          <Ionicons name="repeat-outline" size={32} color="orange"></Ionicons>
        </Pressable>
    } else {
      editIcon =
        <Pressable onPress={() => deleteIngredientFromStep(stepNum, ingredient.ingredientIndex)}> 
          <Ionicons name="trash-outline" size={32} color="red"></Ionicons>
        </Pressable>
    }

    function updateRecipeAmount(amount) {
      // Validate amount
      const ingredientData = findIngredientByTitle(ingredient.title);
      if(limits[ingredientData.nutrient] !== "") {
        const amountLimit = limits[ingredientData.nutrient] / ingredientData.nutrientPerUnit;
        if(amount > amountLimit) {
          setNutrientWarningModalMessage("Due to your nutrient limit " + ingredientData.nutrient + " of " + limits[ingredientData.nutrient] + ", you should not use " +
                      amount + " " + ingredientData.units + " of " + ingredientData.title + ". At this limit, you can use at most " + Math.floor(amountLimit * 10) / 10 + " " + ingredientData.units + ".");
          return;
        }
      }

      let ingredients = currRecipe.steps[stepNum].ingredients;
      ingredients[ingredient.ingredientIndex].amount = amount;
      setAmount(amount);
    }

    const violations = [];
    if(ingredientData.restrictions !== undefined) {
      for(let i = 0; i < ingredientData.restrictions.length; i++) {
        if(restrictions.includes(ingredientData.restrictions[i])) {
          violations.push(ingredientData.restrictions[i]);
        }
      }
    }

    return (
      <View style={styles.item}>
        <View style={styles.itemLeft}>
        <Image source={ingredientData.image} style={styles.itemImg}/>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.textinputrow}>
            <TextInput
              keyboardType = 'numeric'
              style={styles.textinput}
              onChangeText={(amount) => updateRecipeAmount(amount)} // update text variable whenever text is changed within textinput
              value={amount} // display value of text variable
            />
          </View>
        </KeyboardAvoidingView>
        <Text numberOfLines={1} style={styles.itemText}>{ingredientData.units} {ingredientData.title}</Text>
        { violations.length > 0 && 
          <Pressable style={styles.headerPressable} onPress={() => {showModal(violations)}}>
            <Ionicons name="warning-outline" size={32} color={Colors.pasta}></Ionicons>
          </Pressable> }
        </View>
          {editIcon}
        </View>
    );
  };

  const SectionHeader = ({ title }) => (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  )

  const ListHeader = () => (
    <View style={[styles.container, {marginTop: 10}]}>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <View style={styles.titleTextContainer}>
            <Text style={[styles.titleText, {fontSize: 30}]}>MODIFY</Text>
            <Text style={[styles.titleText, {fontSize: 24}]}>Step {stepNum + 1}</Text>
          </View>
          <Image source={Images.spoonInCircle} style={styles.titleImg}></Image>
        </View>
      </View>
    </View> 
  );

  return ( 
    <ImageBackground /*source={Images.butchers}(*/ style={styles.container}>
      <RestoreModal/>
      <NutrientWarningModal/>
      <WarningModal/>
      <Header onBackButtonPress={() => navigation.navigate(prevPage, {currRecipe})}></Header>
      <View style={styles.content}>
          <SectionList
            extraData
            ListHeaderComponent={ListHeader}
            ListFooterComponent={<View style={{height: 60}}/>}
            style={{width: '100%'}} contentContainerStyle={styles.scrollView}
            sections={ingredients}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item, index }) => <Item ingredient={item} />}
            renderSectionHeader={({ section: { title } }) => <SectionHeader title={title}/>}
          />
          <View style={{position: 'absolute', bottom: 5}}>
            <RecipalButton width={360} height={50} fontSize={24} text={'Restore Defaults'} onPress={() => {setRestoreModalVisible(true)}}/>
          </View>
      </View>
    </ImageBackground>
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
  subtitleText: {
    fontFamily: 'Avenir-Book',
    fontSize: 16
  },
  img: {
    height: 250,
    width: '90%',
    resizeMode: 'cover',
    margin: 10,
    borderRadius: 10
  },
  item: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    height: Sizes.itemHeight,
    width: '100%',
    alignContent: 'space-between',
    paddingHorizontal: 5
  },
  itemLeft: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'flex-start',
    alignItems: 'center'
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
    flex: 1
  },
  header: {
    height: Sizes.headerHeight,
    width: '100%',
    backgroundColor: Colors.bellPepper,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  headerText: {
    color: 'white',
    fontFamily: 'Avenir-Book',
    fontSize: Sizes.itemFontSize,
  },
  headerPressable: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textinput: {
    height: 32,
    width: 32,
    backgroundColor: '#dddddd',
    borderRadius: 10,
    textAlign: 'center',
    fontFamily: 'Avenir-Book',
    margin: 5
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