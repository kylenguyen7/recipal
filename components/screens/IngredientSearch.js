import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useState } from 'react';
import { SearchableFlatList } from "react-native-searchable-list";
import { SearchBar } from 'react-native-elements';

import Images from '../../constants/images';
import Header from '../BackHeader'
import data from '../../constants/ingredients-test'


export default function IngredientSearch({ navigation, route }) {
  const [searchTerm, setSearchTerm] = useState("");
  const searchAttribute = "title";
  const ignoreCase = true;

  const Item = ({ title }) => (
    <Pressable style={styles.item} onPress={ () => navigation.goBack({selected: title}) }>
      <Image source={Images.butter} style={styles.itemImg}/>
      <Text style={styles.itemText}>{title}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Header></Header>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <View style={styles.titleTextContainer}>
            <Text style={[styles.titleText, {fontSize: 30}]}>MODIFY</Text>
            <Text style={[styles.titleText, {fontSize: 24}]}>Essential: Cream</Text>
          </View>
          <Image source={Images.spoonInCircle} style={styles.titleImg}></Image>
        </View>
        <View style={styles.search}>
          <SearchBar
            platform='ios'
            placeholder="Search..."
            onChangeText={(search) => setSearchTerm(search)}
            value={searchTerm}
          />
        </View>  
        <SearchableFlatList
            contentContainerStyle={{ flexGrow: 1, alignItems: 'flex-start' }}
            style={styles.listContainer} data={data} searchTerm={searchTerm}
            searchAttribute={searchAttribute} ignoreCase={ignoreCase}
            renderItem={({item}) => Item(item)}
            keyExtractor={(item) => item.title} />
      </View>
    </View> 
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    alignItems: 'center',
    flex: 1,
  },

  // TITLE
  titleContainer: {
    height: 150,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  titleTextContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  titleText: {
    fontFamily: 'Avenir-Book'
  },
  titleImg: {
    height: '100%',
    width: 110,
    resizeMode: 'contain',
    position: 'relative',
    bottom: 10
  },

  // SEARCH
  search: {
    width: '100%'
  },

  // LIST
  listContainer: {
    width: '100%',
    backgroundColor: 'white'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 5,
    height: 60,
    width: '100%',
    backgroundColor: 'white',

    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5,
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
    width: '100%',
  },
})