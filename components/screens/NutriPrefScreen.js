import { StyleSheet, Text, View, Image } from 'react-native';
import { useState } from 'react';
import { SearchableFlatList } from "react-native-searchable-list";
import { SearchBar } from 'react-native-elements';


import Images from '../../constants/images';
import Header from '../BackHeader'
import { nutritionData } from '../nutritionData'
import NutitionItem from '../NutritionItem'

export default function NutriPrefScreen({ navigation, route }) {
  const [searchTerm, setSearchTerm] = useState("");
  const searchAttribute = "title";
  const ignoreCase = true;

  function renderNutritionItem(item) {
    return (
      <NutitionItem
        id={item.id}
        title={item.title}
        description={item.description}
        units={item.units}
        image={item.image}
        dataKey={item.key}/>
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
        <Text style={styles.titleText}>MY NUTRITIONAL PREFERENCES</Text>
      
        <View style={styles.search}>
          <SearchBar
            platform='ios'
            placeholder="Search..."
            onChangeText={(search) => setSearchTerm(search)}
            value={searchTerm}
          />
        </View>  
        <View>
          <SearchableFlatList
            contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
            style={styles.listContainer} data={nutritionData} searchTerm={searchTerm}
            searchAttribute={searchAttribute} ignoreCase={ignoreCase}
            renderItem={({item}) => renderNutritionItem(item)}
            keyExtractor={(item) => item.id} />
        </View>
      </View>
    </View> 
  );
}


const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 1000
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
    fontSize: 21,
    marginTop: 15
  },
  search: {
    width: '100%',
    marginTop: 15
  },
  listContainer: {
    width: '90%',
    marginBottom: 50
  }
})