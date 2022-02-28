import { StyleSheet, Text, Image, Pressable, ImageBackground, View, SectionList, Modal, KeyboardAvoidingView, TextInput } from 'react-native';
import RecipalButton from '../RecipalButton'
import Header from '../BackHeader'
import Images from '../../constants/images';
import Colors from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function Modification({ navigation, route }) {
  let { recipe } = route.params;
  const [restoreModalVisible, setRestoreModalVisible] = useState(false);
  const [text, setText] = useState('0');

  let DATA = [
    {
      title: "Essential: Fat",
      data: ["1 Liter Water"]
    },
    {
      title: "Essential: Cream",
      data: ["8 oz butter"]
    },
    {
      title: "Non-Essentials",
      data: ["Parmesan to taste", "Parsley to taste"]
    }
  ];


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

  const deleteItemById = (title) => {
    const filteredData = DATA.filter(item => item.data[0] !== title);
    this.setState({ DATA: filteredData });
  }

  const Item = ({ id, title }) => (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
      <Image source={Images.butter} style={styles.itemImg}/>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.textinputrow}>
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => setText(text)} // update text variable whenever text is changed within textinput
            value={text} // display value of text variable
          />
        </View>
      </KeyboardAvoidingView>
      <Text style={styles.itemText}>{title}</Text>
      </View>
      <Pressable onPRess={() => deleteItemById(title)}> 
        <Ionicons name="trash-outline" size={32} color="red"></Ionicons>
      </Pressable>
    </View>
  );

  const SectionHeader = ({ title }) => (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  )

  const ListHeader = () => (
    <View style={{flex: 1, alignItems: 'center'}}>
      <View style={styles.titleContainer}>
        <View style={styles.titleTextContainer}>
          <Text style={styles.titleText}>Step 2</Text>
        </View>
        <Image source={Images.spoonInCircle} style={styles.titleImg}></Image>
      </View>
    </View>
  );

  return ( 
    <ImageBackground /*source={Images.butchers}(*/ style={styles.container}>
      <RestoreModal/>
      <Header></Header>
      <View style={styles.content}>
          <SectionList
            ListHeaderComponent={ListHeader}
            ListFooterComponent={<View style={{height: 60}}/>}
            style={{width: '100%'}} contentContainerStyle={styles.scrollView}
            sections={DATA}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item, index }) => <Item id={index} title={item} />}
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
    flex: 1,
    backgroundColor: 'white'
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  scrollView: {
  },
  titleContainer: {
    height: 150,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleImg: {
    height: '110%',
    width: 110,
    resizeMode: 'contain',
  },
  titleTextContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontFamily: 'Avenir-Book',
    color: 'black',
    fontSize: 32,
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