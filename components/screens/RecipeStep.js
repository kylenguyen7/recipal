import { StyleSheet, Text, ScrollView, SafeAreaView, Modal, View, Pressable, Dimensions, Image } from 'react-native';
import { useState, useRef } from 'react';
import RecipalButton from '../RecipalButton'
import XHeader from '../XHeader'
import Colors from '../../constants/colors';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { BackgroundImage } from 'react-native-elements/dist/config';
import Images from '../../constants/images'
import { Ionicons } from '@expo/vector-icons';
import RecipeData from '../../constants/recipe-data';
import { findIngredientByTitle } from '../../constants/ingredients-data';

export default function RecipeStep({ navigation, route }) {
  let carouselRef = useRef();
  let currRecipe = route.params.currRecipe;
  const [exitModalVisible, setExitModalVisible] = useState(false);
  const [finishModalVisible, setFinishModalVisible] = useState(false);
  let [ page, setPage ] = useState(0);

  function generateText(stepNum) {
    let result = [];
    let added = [];
    const currIngredients = currRecipe.steps[stepNum].ingredients;
    const lines = currRecipe.steps[stepNum].text;
    for(let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const tokens = line.match("{.*}");
      if(tokens != null) {
        for(let j = 0; j < tokens.length; j++) {
          const category = tokens[j].slice(1, tokens[j].length - 1);

          // If any of the current ingredients match the descriptor, add it
          for(let k = 0; k < currIngredients.length; k++) {
            if(added[k]) continue;

            const currIngredient = currIngredients[k];
            const currIngredientData = findIngredientByTitle(currIngredient.title);
            if(currIngredientData.category === category) {
              const tokenIndex = lines[i].search(tokens[j]);
              result.push(<Text>{lines[i].slice(0, tokenIndex)}</Text>);
              result.push(<Text style={{textDecorationLine: 'underline'}}>{currIngredient.amount + " " + currIngredientData.units + " " + currIngredient.title}</Text>);
              result.push(<Text>{lines[i].slice(tokenIndex + tokens[j].length)}</Text>);

              // result.push(<Text style={{textDecorationLine: 'underline'}}>{lines[i].replace(tokens[j], currIngredient.amount + " " + currIngredientData.units + " " + currIngredient.title)}</Text>);
              result.push(<Text>{i == lines.length - 1 ? "" : " "}</Text>);
              added[k] = true;
              break;
            }
          }
        }
      } else {
        result.push(<Text>{lines[i]}</Text>);
        result.push(<Text>{i == lines.length - 1 ? "" : " "}</Text>);
      }
    }

    const extras = [];
    for(let i = 0; i < currIngredients.length; i++) {
      if(!added[i]) {
        extras.push(currIngredients[i]);
      }
    }

    if (extras.length > 0) {
      result.push(<Text> Add </Text>);
      for (let i = 0; i < extras.length; i++) {
        const data = findIngredientByTitle(extras[i].title);
        result.push(<Text style={{textDecorationLine: 'underline'}}>{extras[i].amount + " " + data.units + " " + extras[i].title}</Text>);
        if (i === extras.length - 1) {
          result.push(<Text>.</Text>);
        } else if (i === extras.length - 2) {
          result.push(<Text> and </Text>);
        } else {
          result.push(<Text>, </Text>);
        }
      }
    }

    return result;
  }

  const ConfirmExitModal = () => (
    <Modal
        animationType="slide"
        transparent={true}
        visible={exitModalVisible}
        onRequestClose={() => {
          setExitModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure you want to exit the recipe? Your progress will not be saved.</Text>
            <View style={styles.modalButtonContainer}>
              <Pressable
                style={[styles.button, styles.buttonExit]}
                onPress={() => {
                  setExitModalVisible(false);
                  navigation.navigate('HomePage');
                }}
              >
                <Text style={[styles.textStyle, styles.exitTextStyle]}>Exit Recipe</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => setExitModalVisible(false)}
              >
                <Text style={[styles.textStyle, styles.cancelTextStyle]}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
  );

  const ConfirmFinishModal = () => (
    <Modal
        animationType="slide"
        transparent={true}
        visible={finishModalVisible}
        onRequestClose={() => {
          setFinishModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={[styles.modalText, {fontSize: 16}]}>Congratulations on finishing this recipe! Are you sure you'd like to complete the recipe?</Text>
            <View style={styles.modalButtonContainer}>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => {
                  navigation.navigate('RecipeFinish', {currRecipe: currRecipe});
                  setFinishModalVisible(false);
                }}
              >
                <Text style={[styles.textStyle, styles.cancelTextStyle]}>Yep, all done!</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonExit]}
                onPress={() => {
                  setFinishModalVisible(false);
                }}
              >
                <Text style={[styles.textStyle, styles.exitTextStyle]}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
  );

  const CarouselCard = ({ image, title }, index) => (
    <View style={styles.card}>
      <Image style={styles.cardImg} source={image}/>
      <View style={styles.cardTextContainer}>
        <ScrollView>
          <Text style={{fontFamily: 'Avenir-Black', fontSize: 24}}>{title}</Text>
          <Text style={{fontFamily: 'Avenir-Book', fontSize: 16}}>{generateText(index)}</Text>
        </ScrollView>
      </View>
    </View>
  );

  function goToPage(pageIndex) {
    if(pageIndex == currRecipe.steps.length) {
      setFinishModalVisible(true);
    } else {
      carouselRef.current.snapToItem(pageIndex);
    }
  }

  return (
    <BackgroundImage source={Images.butchers} style={styles.container}>
      <ConfirmExitModal/>
      <ConfirmFinishModal/>
      <XHeader onPress={() => setExitModalVisible(true)}></XHeader>
      <View style={styles.stepHeader}>
        <View style={styles.stepHeaderContainer}>
        <Text style={styles.stepHeaderText}>Step {page + 1}</Text>
        <Pagination
          dotsLength={currRecipe.steps.length}
          activeDotIndex={page}
          containerStyle={{paddingVertical: 10}}
          dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 100,
              backgroundColor: 'black'
          }}
          inactiveDotStyle={{
            width: 10,
            height: 10,
            borderRadius: 100,
            backgroundColor: 'black',
            borderColor: 'black',
            borderWidth: 1
          }}
          inactiveDotOpacity={0.5}
          inactiveDotScale={0.4}
          tappableDots={true}
          carouselRef={carouselRef}
          animatedDuration={10}/>
        </View>
      </View>
      <View style={{flex: 1}}>
        <Carousel
          ref={carouselRef}
          data={currRecipe.steps}
          renderItem={({ item, index }) => CarouselCard(item, index)}
          onBeforeSnapToItem={(index) => setPage(index) }
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width}
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}/>
      </View>
      <View style={styles.controlsContainer}>
        <Pressable style={styles.controlPressable} onPress={() => goToPage(page - 1)}>
          {page > 0 && <Ionicons name="chevron-back" color='white' size={48}/>}
        </Pressable>
        <Pressable style={({ pressed }) => [styles.controlPressable, {backgroundColor: pressed ? 'white' : Colors.bellPepper}]} onPress={() => navigation.navigate("Modification", {currRecipe, stepNum: page, prevPage: "RecipeStep"})}>
          {({ pressed }) =>
            <Ionicons name="pencil" color={pressed ? Colors.bellPepper : 'white'} size={48}/>}
        </Pressable>
        <Pressable style={styles.controlPressable} onPress={() => goToPage(page + 1)}>
          {/* {page < currRecipe.steps.length - 1 ? 
            <Ionicons name="chevron-forward" color='white' size={48}/> :
            <RecipalButton width={80} height={50} text={"Finish"} onPress={() => goToPage(page + 1)}/>} */}
          {page < currRecipe.steps.length - 1 ? 
            <Ionicons name="chevron-forward" color='white' size={48}/> :
            <Ionicons name="checkmark-done-outline" color='white' size={48}/>}
          
          
        </Pressable>
      </View>
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
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
  stepHeader: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  stepHeaderContainer: {
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,  
    elevation: 5,
  },
  stepHeaderText: {
    fontFamily: 'Avenir-Black',
    fontSize: 32,
    textAlign: 'center'
  },
  card: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  cardImg: {
    width: 300,
    height: 225,
    borderRadius: 10,
    marginVertical: 20,
    resizeMode: 'cover',
  },
  cardTextContainer: {
    width: 300,
    height: 200,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 3,
  },
  controlsContainer: {
    height: 100,
    width: '100%',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  controlPressable: {
    borderRadius: 100,
    height: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});