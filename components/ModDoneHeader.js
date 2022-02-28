import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Pressable, Image, Modal } from 'react-native';
import { useState } from 'react';
import Colors from '../constants/colors';
import Images from '../constants/images'

export default function ModDoneHeader() {
  const [doneModalVisible, setDoneModalVisible] = useState(false);
  let navigation = useNavigation();

  function onBackButtonPress() {
    setDoneModalVisible(true)
    navigation.goBack();
  }

  const DoneModal = () => (
    <Modal
        animationType="slide"
        transparent={true}
        visible={doneModalVisible}
        onRequestClose={() => {
          setDoneModalVisible(false);
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
                  setDoneModalVisible(false);
                }}
              >
                <Text style={[styles.textStyle, styles.cancelTextStyle]}>No, cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonExit]}
                onPress={() => {
                  setDoneModalVisible(false);
                }}
              >
                <Text style={[styles.textStyle, styles.exitTextStyle]}>Yes, please!</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
  );  

  return (
    <Pressable style={styles.container} onPress={onBackButtonPress}>
      {/* <DoneModal/> */}
      <Image style={styles.image} source={Images.backButton}/>
    </Pressable>
  );
}

let styles = StyleSheet.create({
  container: {
    height: 80,
    width: 32 / 0.4,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
  },
  image: {
    marginLeft: 10,
    height: 30,
    width: undefined,
    aspectRatio: 1/0.4,
    resizeMode: 'contain'
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
})