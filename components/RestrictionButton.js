import { StyleSheet, Text, Pressable, Image, Modal, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import Colors from '../constants/colors';
import Images from '../constants/images'


export default function RestrictionButton({id, title, description, image}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("")
  const [modalTitleText, setModalTitleText] = useState("")
  const [modalImage, setModalImage] = useState([]);
  
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
    <TouchableOpacity
      style={[styles.restrictButton, {backgroundColor: 'white'}]}
      // style={!restrictionInput[id] ? [styles.restrictButton, {backgroundColor: 'white'}] : [styles.restrictButton, {backgroundColor: Colors.tomato}]}
      //onPress={() => {restrictionInput[id] = true}}
    >
      <ConfirmModal/>
      <Pressable>
        <Text style={styles.buttonText}>{title}</Text>
      </Pressable>
      <Pressable onPress={() => {
          setModalText(description);
          setModalTitleText(title);
          setModalImage([image])
          setModalVisible(true);
        }}>
        <Image style={styles.infoButton} source={Images.infoButton}/>
      </Pressable>
    </TouchableOpacity>
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
});
  