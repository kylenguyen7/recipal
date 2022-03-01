import { StyleSheet, Text, ScrollView, SafeAreaView, Modal, View, Pressable, Dimensions, Image } from 'react-native';
import { useState, useRef } from 'react';
import RecipalButton from '../RecipalButton'
import XHeader from '../XHeader'
import Colors from '../../constants/colors';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { BackgroundImage } from 'react-native-elements/dist/config';
import Images from '../../constants/images'
import { Ionicons } from '@expo/vector-icons';

export default function RecipeStep({ navigation, route }) {
  let carouselRef = useRef();
  let { recipe, step } = route.params
  const [exitModalVisible, setExitModalVisible] = useState(false);
  const [finishModalVisible, setFinishModalVisible] = useState(false);

  const DATA = [
    {
      image: Images.fettuccine,
      directive: 'Add',
      direction: 'Boil 1 liter of water and add box of fettuccine.'
    },
    {
      image: Images.spoonInCircle,
      directive: 'Stir',
      direction: 'Stir in 1 carton of whole milk and 1 stick of butter. Add salt. Measure carefully!'
    },
    {
      image: Images.butter,
      directive: 'Garnish',
      direction: 'Sprinkle parmesan and parsley on top according to your liking!'
    },
    {
      image: Images.notepad,
      directive: 'Bruh',
      direction: 'Last step.'
    },
  ]
  let [ page, setPage ] = useState(0);

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
                  navigation.navigate('RecipeFinish', {recipe: recipe});
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

  const CarouselCard = ({ image, directive, direction}) => (
    <View style={styles.card}>
      <Image style={styles.cardImg} source={image}/>
      <View style={styles.cardTextContainer}>
        <Text style={{fontFamily: 'Avenir-Black', fontSize: 24}}>{directive}</Text>
        <Text style={{fontFamily: 'Avenir-Book', fontSize: 16}}>{direction}</Text>
      </View>
    </View>
  );

  function goToPage(pageIndex) {
    if(pageIndex == DATA.length) {
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
        <Text style={styles.stepHeaderText}>Step {page + 1}</Text>
        <Pagination
          dotsLength={DATA.length}
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
      <View style={{flex: 1}}>
        <Carousel
          ref={carouselRef}
          data={DATA}
          renderItem={({ item }) => CarouselCard(item)}
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
        <Pressable style={[{backgroundColor: Colors.bellPepper}, styles.controlPressable]}>
          <Ionicons name="pencil" color='white' size={48}/>
        </Pressable>
        <Pressable style={styles.controlPressable} onPress={() => goToPage(page + 1)}>
          {/* {page < DATA.length - 1 ? 
            <Ionicons name="chevron-forward" color='white' size={48}/> :
            <RecipalButton width={80} height={50} text={"Finish"} onPress={() => goToPage(page + 1)}/>} */}
          {page < DATA.length - 1 ? 
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
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  stepHeaderText: {
    fontFamily: 'Avenir-Book',
    fontSize: 32
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
    height: 250,
    borderRadius: 10,
    marginVertical: 20,
    resizeMode: 'cover',
  },
  cardTextContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 2,
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