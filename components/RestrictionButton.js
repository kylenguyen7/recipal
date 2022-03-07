import { StyleSheet, Text, Pressable, Image, Modal, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import Colors from '../constants/colors';
import Images from '../constants/images'


export default function RestrictionButton({id, title, description, image}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("")
  const [modalTitleText, setModalTitleText] = useState("")
  const [modalImage, setModalImage] = useState([]);


  const [selectStatus, setSelectStatus] = useState(false);

  // Get data
  useEffect(() => {
    const getData = async () => {
      const stringValue = await AsyncStorage.getItem('restrictions')
      const value = JSON.parse(stringValue)
      console.log("Got " + JSON.stringify(value) + " from data store!")
      if(value !== null) {
        for (let i = 0; i < value.length; i++) {
          if (title === value[i]) {
            setSelectStatus(true);
            return;
          };
        setSelectStatus(false);
        }
      }
    }
    getData().catch(console.error);
  }, []);


  // Store data
  useEffect(() => {
    const storeData = async (select, title) => {
      if (select === undefined) {
        return;
      }
      const value = await AsyncStorage.getItem('restrictions')
      let allSelected = JSON.parse(value)
      if (allSelected === null) {
        allSelected = []
      }
      if (select === true) {
        allSelected.push(title)
        const jsonValue = JSON.stringify(allSelected)
        await AsyncStorage.setItem('restrictions', jsonValue)
        console.log("Stored " + jsonValue + " in data store!")
        return;
      } 
      else {
        for (let i = 0; i < allSelected.length; i++) {
          if (title === allSelected[i]) {
            allSelected.splice(i, 1)
            const jsonValue = JSON.stringify(allSelected)
            await AsyncStorage.setItem('restrictions', jsonValue)
            console.log("Stored " + jsonValue + " in data store!")
            return;
          }
        }
      }
    }
    storeData(selectStatus, title).catch(console.error);
  }, [selectStatus]);

  
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
            <Image style={{margin: 7}} source={modalImage[0]}/>
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


  return (
    <Pressable
      onPress={() => setSelectStatus(selectStatus ? false : true)}
      style={selectStatus ? styles.buttonPressed : styles.restrictButton}
      // style={!restrictionInput[id] ? [styles.restrictButton, {backgroundColor: 'white'}] : [styles.restrictButton, {backgroundColor: Colors.tomato}]}
      //onPress={() => {restrictionInput[id] = true}}
    >
      <ConfirmModal/>
      <Text style={selectStatus ? styles.buttonPressedText : styles.buttonText}>{title}</Text> 
      <Pressable onPress={() => {
          setModalText(description);
          setModalTitleText(title);
          setModalImage([image])
          setModalVisible(true);
        }}>
        <Image style={styles.infoButton} source={selectStatus ? Images.infoButtonPressed : Images.infoButton}/>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  restrictButton: {
    height: 70,
    width: '48%',
    borderWidth: 2,
    borderColor: Colors.tomato,
    borderRadius: 20,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',

    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5,
  },
  buttonPressed: {
    height: 70,
    width: '48%',
    borderWidth: 2,
    borderColor: Colors.tomato,
    borderRadius: 20,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
    backgroundColor: Colors.tomato,

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
    fontSize: 13
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
});
  