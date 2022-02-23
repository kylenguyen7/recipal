import { StyleSheet, Text, ScrollView, SafeAreaView, Modal, View, Pressable } from 'react-native';
import { useState } from 'react';
import RecipalButton from '../RecipalButton'
import XHeader from '../XHeader'
import Colors from '../../constants/colors';

export default function RecipeStep({ navigation, route }) {
  let { recipe, step } = route.params
  const [modalVisible, setModalVisible] = useState(false);

  function goToRecipeStep(recipe, stepNum) {
    if(step == 3) {
      navigation.push("RecipeFinish", {recipe: recipe})
    } else {
      navigation.push("RecipeStep", {recipe: recipe, step: stepNum})
    }
  }

  function exitRecipeButtonPressed() {
    setModalVisible(false);
    navigation.navigate('HomePage');
  }

  function cancelButtonPressed() {
    setModalVisible(false);
  }

  return (
    <SafeAreaView>
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
            <Text style={styles.modalText}>Are you sure you want to exit the recipe? Your progress will not be saved.</Text>
            <View style={styles.modalButtonContainer}>
              <Pressable
                style={[styles.button, styles.buttonExit]}
                onPress={exitRecipeButtonPressed}
              >
                <Text style={[styles.textStyle, styles.exitTextStyle]}>Exit Recipe</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={cancelButtonPressed}
              >
                <Text style={[styles.textStyle, styles.cancelTextStyle]}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <XHeader onPress={() => setModalVisible(true)}></XHeader>
      <ScrollView>
        <Text>{recipe} {step}</Text>
        <RecipalButton text={'Next Step!'} width={300} height={50}
                        onPress={() => goToRecipeStep('fetuccine-alfredo', step + 1)}></RecipalButton>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
  }
});