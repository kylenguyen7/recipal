import { StyleSheet, Text, View, Image, FlatList, Modal, Pressable } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import Header from '../BackHeader'
import Images from '../../constants/images';
import Colors from '../../constants/colors';
import { restrictions } from '../restrictionsData';
import RestrictionButton from '../RestrictionButton';


export default function DietRestrictScreen() {
  // let navigation = useNavigation()
  // const [finishModalVisible, setFinishModalVisible] = useState(true);
  //   const ConfirmFinishModal = () => (
  //   <Modal
  //       animationType="slide"
  //       transparent={true}
  //       visible={finishModalVisible}
  //       onRequestClose={() => {
  //         setFinishModalVisible(false);
  //       }}
  //     >
  //       <View style={styles.centeredView}>
  //         <View style={styles.modalView}>
  //           <Text style={[styles.modalText, {fontSize: 16}]}>Congratulations on finishing this recipe! Are you sure you'd like to complete the recipe?</Text>
  //           <View style={styles.modalButtonContainer}>
  //             <Pressable
  //               style={[styles.button, styles.buttonCancel]}
  //               onPress={() => {
  //                 setFinishModalVisible(false);
  //               }}
  //             >
  //               <Text style={[styles.textStyle, styles.cancelTextStyle]}>All done!</Text>
  //             </Pressable>
  //           </View>
  //         </View>
  //       </View>
  //     </Modal>
  // );


  function renderRestriction(restriction) {
    return (
      <RestrictionButton title={restriction.title} description={restriction.description}/>
    )
  }


  return (
    <View>
      <Header></Header>
      {/* <ConfirmFinishModal/> */}
      <View style={styles.content}>
        
        <View style={styles.titleContainer}>
          <Image source={Images.spoonInCircle} style={styles.titleImg}></Image>
          <Text style={styles.bubbleText}>Tap below to specify your recipe needs!</Text>
        </View>

        <Text style={styles.titleText}>MY DIETARY RESTRICTIONS</Text>

        <FlatList
          style={styles.restrictionsContainer}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          data={restrictions}
          numColumns={2}
          renderItem={({item}) => renderRestriction(item)}
        />

      </View>
  </View>
  );
}


const styles = StyleSheet.create({
  content: {
    //flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 30
  },
  titleContainer: {
    height: 110,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleImg: {
    height: '100%',
    width: 100,
    resizeMode: 'contain',
    position: 'relative',
    bottom: 10,
  },
  bubbleText: {
    width: 190,
    padding: 10,
    margin: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'black',
    textAlign: 'center',
    fontFamily: 'Avenir-Book',
    color: 'black',
    fontSize: 17,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  titleText: {
    fontFamily: 'Avenir-Black',
    color: 'black',
    fontSize: 23,
    marginTop: 15
  },
  restrictionsContainer: {
    width: '90%',
    margin: 15,
    marginBottom: 474
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
})