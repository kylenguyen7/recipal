import { StyleSheet, Text, Image, Pressable, ImageBackground, View, SectionList, Modal } from 'react-native';
import { useEffect, useState } from 'react';
import RecipalButton from '../RecipalButton'
import Header from '../BackHeader'
import Images from '../../constants/images';
import Colors from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import IngredientsData, { findIngredientByTitle } from '../../constants/ingredients-data';
import Sizes from '../../constants/sizes';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Ingredients({ navigation, route }) {
  let { currRecipe, from } = route.params;
  const ingredientsData = [];

  for(let i = 0; i < currRecipe.steps.length; i++) {
    for(let j = 0; j < currRecipe.steps[i].ingredients.length; j++) {
      currRecipe.steps[i].ingredients[j] = {...currRecipe.steps[i].ingredients[j], stepNum: i};
    }

    ingredientsData.push({
      title: "Step " + (i + 1),
      stepNum: i,
      data: currRecipe.steps[i].ingredients
    })
  }

  function onBackButtonPress() {
    if(from === 'Me') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Me' }],
      });
    } else {
      navigation.goBack();
    }
  }

  const [restrictions, setRestrictions] = useState([]);
  const [warningModalMessage, setWarningModalMessage] = useState("");
  const [recipeStepToEdit, setRecipeStepToEdit] = useState(-1);

  useEffect(() => {
    const getData = async () => {
      const stringValue = await AsyncStorage.getItem('restrictions')
      const value = JSON.parse(stringValue)
      setRestrictions(value);
    }
    getData().catch(console.error);
  }, []);

  function showModal(violations, stepNum) {
    let violationsList = "";
    for(let i = 0; i < violations.length; i++) {
      violationsList += "• " + violations[i] + (i == violations.length - 1 ? "" : "\n");
    }

    setWarningModalMessage(violationsList);
    setRecipeStepToEdit(stepNum);
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
              <Pressable
                style={[styles.button, styles.buttonExit]}
                onPress={() => {
                  setWarningModalMessage("");
                  navigation.navigate("Modification", {currRecipe, stepNum: recipeStepToEdit, prevPage: "Ingredients"})
                }}
              >
              <Text style={[styles.textStyle, styles.exitTextStyle]}>Edit Recipe Step</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  function Item({ ingredient }) {
    const ingredientInfo = findIngredientByTitle(ingredient.title);
    const violations = [];

    if(ingredientInfo.restrictions !== undefined) {
      for(let i = 0; i < ingredientInfo.restrictions.length; i++) {
        if(restrictions.includes(ingredientInfo.restrictions[i])) {
          violations.push(ingredientInfo.restrictions[i]);
        }
      }
    }

    return (
      <View style={styles.item}>
        <Image source={ingredientInfo.image} style={styles.itemImg}/>
        <Text numberOfLines={1} style={styles.itemText}>{ingredient.amount} {ingredientInfo.units} {ingredient.title}</Text>
        { violations.length > 0 && 
          <Pressable style={styles.headerPressable} onPress={() => {showModal(violations, ingredient.stepNum)}}>
            <Ionicons name="warning-outline" size={32} color={Colors.pasta}></Ionicons>
          </Pressable> }
      </View>
    );
  }

  const SectionHeader = ({ title, stepNum }) => (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
      <Pressable style={styles.headerPressable} onPress={() => {navigation.navigate("Modification", {currRecipe, stepNum, prevPage: "Ingredients"})}}>
        <Ionicons name="pencil-sharp" size={32} color="white"></Ionicons>
      </Pressable>
    </View>
  )

  const ListHeader = () => (
    <View style={{flex: 1, alignItems: 'center'}}>
      <View style={styles.titleContainer}>
        <View style={styles.titleTextContainer}>
          <Text style={styles.titleText}>{currRecipe.title}</Text>
          <Text style={styles.subtitleText}>Prep time: {currRecipe.time} hours</Text>
          <Text style={styles.subtitleText}>Yields: {currRecipe.yield} servings</Text>
          <Text style={styles.subtitleText}>Calories: {currRecipe.calories} cal per serving</Text>
          <Text style={styles.subtitleText}>Difficulty: {currRecipe.difficulty}</Text>
        </View>
        <Image source={Images.spoonInCircle} style={styles.titleImg}></Image>
      </View>
      <Image style={styles.img} source={Images.fettuccine}/>
    </View>
  );

  return ( 
    <ImageBackground /*source={Images.butchers}(*/ style={styles.container}>
      <WarningModal/>
      <Header onBackButtonPress={onBackButtonPress}></Header>
      <View style={styles.content}>
          <SectionList
            ListHeaderComponent={ListHeader}
            ListFooterComponent={<View style={{height: 60}}/>}
            style={{width: '100%'}} contentContainerStyle={styles.scrollView}
            sections={ingredientsData}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => <Item ingredient={item} />}
            renderSectionHeader={({ section: { title, stepNum } }) => <SectionHeader title={title} stepNum={stepNum}/>}
          />
          <View style={{position: 'absolute', bottom: 5}}>
            <RecipalButton width={375} height={50} fontSize={24} text={'Continue'} onPress={() => navigation.navigate('RecipeStep', {currRecipe: currRecipe})}/>
          </View>
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
    alignItems: 'center',
  },
  scrollView: {
  },
  titleContainer: {
    height: 150,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleImg: {
    height: '110%',
    width: 110,
    resizeMode: 'contain',
  },
  titleTextContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontFamily: 'Avenir-Book',
    color: 'black',
    fontSize: 32,
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
    resizeMode: 'contain',
  },
  itemText: {
    fontFamily: 'Avenir-Book',
    fontSize: Sizes.itemFontSize,
    marginHorizontal: 5,
    flex: 1
  },
  header: {
    height: Sizes.headerHeight,
    width: '100%',
    backgroundColor: Colors.bellPepper,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5
  },
  headerText: {
    color: 'white',
    fontFamily: 'Avenir-Book',
    fontSize: 24,
    marginLeft: 10,
  },
  headerPressable: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'flex-end'
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
});