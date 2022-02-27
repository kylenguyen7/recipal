import { StyleSheet, Text, Pressable, Image, Modal, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useRef } from 'react';
import Colors from '../constants/colors';
import Images from '../constants/images'

/**
 * EXAMPLE USAGE:
 * 
 * let onButtonPress = () => {
 *    console.log("Button was pressed!");
 * }
 * 
 * <RecipalButton width={200} height={50} text={'Press Me!'} onPress={onButtonPress}></RecipalButton>
 */

export default function RestrictionButton({title, description, image}) {
  const [finishModalVisible, setFinishModalVisible] = useState(false);
  const [finishModalText, setFinishModalText] = useState("")
  const [modalTitleText, setModalTitleText] = useState("")
  // const [modalImage, setModalImage] = useState([])
  
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
            <Text style={[styles.modalText, {fontFamily: 'Avenir-Black', fontSize: 20}]}>{modalTitleText}</Text>
            <Text style={[styles.modalText, {fontSize: 16}]}>{finishModalText}</Text>
            <View style={styles.modalButtonContainer}>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => {
                  setFinishModalVisible(false);
                }}
              >
                <Text style={[styles.textStyle, styles.cancelTextStyle]}>All done!</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
  );

  return (
    <Pressable style={styles.restrictButton}>
      <ConfirmFinishModal/>
      <Text style={styles.buttonText}>{title}</Text>
      <Pressable onPress={() => {
        setFinishModalText(description);
        setModalTitleText(title);
        // setModalImage(image);
        setFinishModalVisible(true);
      }}>
        <Image style={styles.infoButton} source={Images.infoButton}/>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  restrictButton: {
    height: 70,
    width: '48%',
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: Colors.tomato,
    backgroundColor: 'white',
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 15,

    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5,
  },
  buttonPressed: {
    borderWidth: 5,
    borderColor: Colors.tomato,
    backgroundColor: Colors.tomato,
    borderRadius: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5,
  },
  buttonText: {
    // Font
    fontFamily: 'Avenir-Black',
    color: Colors.tomato,
    fontSize: 13
  },
  buttonPressedText: {
    // Font
    fontFamily: 'Avenir-Black',
    color: 'white',
    fontSize: 10
  }, 
  infoButton: {
    height: 30,
    width: 30,
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
  