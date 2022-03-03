import { StyleSheet, Text, View, Image, FlatList } from 'react-native';

import Header from '../BackHeader'
import Images from '../../constants/images';
import { restrictions } from '../restrictionsData';
import RestrictionButton from '../RestrictionButton';


export default function DietRestrictScreen({ navigation, route }) {
  function renderRestriction(restriction) {
    return (
      <RestrictionButton
        id={restriction.id}
        title={restriction.title}
        description={restriction.description}
        image={restriction.image}/>
    )
  }

  return (
    <View>
      <Header onBackButtonPress={() => navigation.navigate("MeScreen")}></Header>
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
  }
})