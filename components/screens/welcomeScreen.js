import { StyleSheet, Text, ScrollView, Image, View, ImageBackground, Modal, Pressable, KeyboardAvoidingView, TextInput } from 'react-native';
import { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import RecipalButton from '../RecipalButton'
import RecipalHomeButton from '../RecipalHomeButton'
import Images from '../../constants/images'
import Colors from '../../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Welcome() {
  let scrollView = useRef(null);
  let navigation = useNavigation();
  const [text, setText] = useState("")

  function getStarted() {
    AsyncStorage.setItem('name', text),
    navigation.navigate('HomePage')
  }

  return (
    <ImageBackground source={Images.butchers} style={styles.container}>
        <ImageBackground source={Images.notepad} style={styles.notebook}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                    <Image style={styles.headerImg} source={Images.spoonInCircle}/>
                    <Text style={[styles.text, styles.headerText]}>Recipal</Text>
                    </View>
                </View>
                <Text style={[styles.text, {fontFamily: 'Avenir-Black', fontSize: 32, textAlign: 'center'}]}>Welcome</Text>
                <Text style={[styles.text, {fontFamily: 'Avenir-Book', fontSize: 20, textAlign: 'center'}]}>Recipal helps you cook recipes your way!</Text>
                <Text style={[styles.text, {fontFamily: 'Avenir-Book', fontSize: 20, textAlign: 'center'}]}>To get started, type your name below!</Text>
            
                <KeyboardAvoidingView style={{}}behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={styles.textinputrow}>
                <TextInput
                    style={styles.textinput}
                    onChangeText={(text) => setText(text)} // update text variable whenever text is changed within textinput
                    value={text} // display value of text variable
                />
                </View>
            </KeyboardAvoidingView>

            <RecipalButton text={'Get Started'} fontSize={20} width={200} height={80}
                onPress={() => 
                    getStarted()
                }/>
          </View>
        </ImageBackground>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    height: 500,
    justifyContent: 'space-evenly'
  },
  notebook: {
    marginTop: 50,
    padding: 40,
    paddingLeft: 85,
    resizeMode: 'contain',
    height: 1300,
    width: undefined,
//     aspectRatio: 384 / 1349,
//     display: 'flex',
//     flexDirection: 'column',
    alignItems: 'center',
    //justifyContent: 'space-evenly'
  },
  header: {
    height: 100,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  headerContent: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerImg: {
    height: '100%',
    width: 40,
    resizeMode: 'contain',
    position: 'relative',
    bottom: 6,
    margin: 4
  },
  text: {
    fontFamily: 'Avenir-Black',
  },
  headerText: {
    fontSize: 40,
  },
  greeting: {
    marginTop: 10,
    height: 250,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  greetingImg: {
    height: '100%',
    resizeMode: 'contain',
  },
  greetingTextContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  funFact: {
    width: 350,
    margin: 20,
    padding: 16,
    borderColor: Colors.pasta,
    borderWidth: 3,
    borderRadius: 20,
    backgroundColor: 'white',
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
  textinput: {
    height: 40,
    width: 40,
    backgroundColor: '#dddddd',
    borderRadius: 10,
    textAlign: 'center',
    fontFamily: 'Avenir-Book'
  },
  textinput: {
    height: 40,
    width: 250,
    backgroundColor: '#dddddd',
    borderRadius: 10,
    textAlign: 'center',
    fontFamily: 'Avenir-Book'
  },
});