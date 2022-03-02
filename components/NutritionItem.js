import { StyleSheet, Text, Pressable, Image, Modal, View, TouchableOpacity, KeyboardAvoidingView, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import Colors from '../constants/colors';
import Images from '../constants/images'


export default function NutitionItem({id, title, description, units, image, dataKey}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("")
  const [modalTitleText, setModalTitleText] = useState("")
  const [lowerText, setLowerText] = useState('0');
  const [upperText, setUpperText] = useState('');
  const key = dataKey

  
  // Get data
  useEffect(() => {
    const getData = async () => {
      const stringValue = await AsyncStorage.getItem(key)
      const value = JSON.parse(stringValue)
      console.log("Got " + JSON.stringify(value) + " from data store!")
      if(value !== null) {
        setLowerText(value.lower);
        setUpperText(value.upper);   
      }
    }
    getData().catch(console.error);
  }, []);


  // Store data
  useEffect(() => {
    const storeData = async (value) => {
      if(value === undefined) return;
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
      console.log("Stored " + jsonValue + " in data store!")
    }
    storeData({lower: lowerText, upper: upperText}).catch(console.error);
  }, [lowerText, upperText]);


  // Information Popup
  const ConfirmModal = () => (
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={[styles.modalText, {fontFamily: 'Avenir-Black', fontSize: 20}]}>{modalTitleText}</Text>
            <Text style={[styles.modalText, {fontSize: 16}]}>{modalText}</Text>
            <View style={styles.modalButtonContainer}>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Text style={[styles.textStyle, styles.cancelTextStyle]}>All done!</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
  );


  // The page
  return (
    <View style={[styles.restrictButton, {backgroundColor: 'white'}]}>
      <ConfirmModal/>
      <View>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
      <View style={styles.rightSide}>
        <View style={styles.infoAndInputs}>
          <Pressable onPress={() => {
              setModalText(description);
              setModalTitleText(title);
              setModalVisible(true);
            }}>
            <Image style={styles.infoButton} source={Images.infoButton}/>
          </Pressable>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.textinputrow}>
              <TextInput
                keyboardType = 'numeric'
                style={styles.textinput}
                onChangeText={(lowerText) => setLowerText(lowerText)} // update text variable whenever text is changed within textinput
                value={lowerText} // display value of text variable
              />
            </View>
          </KeyboardAvoidingView>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.textinputrow}>
              <TextInput
                keyboardType = 'numeric'
                style={styles.textinput}
                onChangeText={(upperText) => setUpperText(upperText)} // update text variable whenever text is changed within textinput
                value={upperText} // display value of text variable
              />
            </View>
          </KeyboardAvoidingView>
        </View>
        <Text style={styles.units}>{units}</Text>
      </View>
    </View>        
  );
}

const styles = StyleSheet.create({
  restrictButton: {
    height: 70,
    width: 340,
    borderWidth: 2,
    borderColor: Colors.tomato,
    borderRadius: 20,
    marginTop: 8,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,

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
  buttonCancel: {
    backgroundColor: Colors.tomato,
  },
  textStyle: {
    fontFamily: 'Avenir-Book',
    fontWeight: "bold",
    textAlign: "center"
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
  rightSide: {
    width: 145,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',   
  },
  units: {
    fontFamily: 'Avenir-Book',
  },
  textinput: {
    height: 40,
    width: 40,
    backgroundColor: '#dddddd',
    borderRadius: 10,
    textAlign: 'center',
    fontFamily: 'Avenir-Book'
  },
  infoAndInputs: {
    width: 120,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
  