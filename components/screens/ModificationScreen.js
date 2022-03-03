import { StyleSheet, Text, Image, Pressable, ImageBackground, View, SectionList, Modal, KeyboardAvoidingView, TextInput } from 'react-native';
import RecipalButton from '../RecipalButton'
import Header from '../BackHeader'
import Images from '../../constants/images';
import Colors from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { findIngredientByTitle } from '../../constants/ingredients-data';

export default function Modification({ navigation, route }) {
  let { currRecipe, stepNum, prevPage } = route.params;
  let currIngredients = currRecipe.steps[stepNum].ingredients;
  const [restoreModalVisible, setRestoreModalVisible] = useState(false);

  function generateIngredientsList() {
    const essentialIngredients = [];
    const nonEssentialIngredients = [{
      title: "Non-Essentials",
      data: []
    }]

    for(let i = 0; i < currIngredients.length; i++) {
      const ingredient = currIngredients[i];
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
    setIngredients(generateIngredientsList());
  }

  const [ingredients, setIngredients] = useState(generateIngredientsList());

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
                style={[styles.button, styles.buttonCancel]}
                onPress={() => {
                  setRestoreModalVisible(false);
                }}
              >
                <Text style={[styles.textStyle, styles.cancelTextStyle]}>No, cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonExit]}
                onPress={() => {
                  console.log({startIngredients})
                  setRestoreModalVisible(false);
                }}
              >
              <Text style={[styles.textStyle, styles.exitTextStyle]}>Yes, please!</Text>
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

    const [amount, setAmount] = useState((ingredient.amount).toString());
    const ingredientData = findIngredientByTitle(ingredient.title);


    function updateRecipeAmount(amount) {
      ingredient.amount = amount;
      setAmount(amount);
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
        <Text style={styles.itemText}>{ingredientData.units} {ingredientData.title}</Text>
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
            <RecipalButton width={375} height={50} fontSize={24} text={'RESTORE DEFAULTS'} onPress={() => {setRestoreModalVisible(true)}}/>
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
    height: 60,
    alignContent: 'space-between'
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
    fontSize: 28,
    marginLeft: 5,
  },
  header: {
    width: '100%',
    backgroundColor: Colors.bellPepper,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerText: {
    color: 'white',
    fontFamily: 'Avenir-Book',
    fontSize: 32,
    margin: 10
  },
  headerPressable: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textinput: {
    height: 40,
    width: 40,
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