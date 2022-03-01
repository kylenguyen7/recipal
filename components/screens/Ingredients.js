import { StyleSheet, Text, Image, Pressable, ImageBackground, View, SectionList } from 'react-native';
import RecipalButton from '../RecipalButton'
import Header from '../BackHeader'
import Images from '../../constants/images';
import Colors from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';


export default function Ingredients({ navigation, route }) {
  let { recipe } = route.params;

  const DATA = [
    {
      title: "Step 1",
      data: ["1 Liter Water", "8 oz Fettuccine"]
    },
    {
      title: "Step 2",
      data: ["8 oz butter", "1 tsp table salt"]
    },
    {
      title: "Step 3",
      data: ["Parmesan to taste", "Parsley to taste"]
    },
    {
      title: "Step 4",
      data: ["Parmesan to taste", "Parsley to taste"]
    },
    {
      title: "Step 5",
      data: ["Parmesan to taste", "Parsley to taste"]
    },
    {
      title: "Step 6",
      data: ["Parmesan to taste", "Parsley to taste"]
    }
  ];

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Image source={Images.butter} style={styles.itemImg}/>
      <Text style={styles.itemText}>{title}</Text>
    </View>
  );

  const SectionHeader = ({ title }) => (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
      <Pressable style={styles.headerPressable} onPress={() => {navigation.navigate("Modification", {recipe})}}>
        <Ionicons name="pencil-sharp" size={32} color="white"></Ionicons>
      </Pressable>
    </View>
  )

  const ListHeader = () => (
    <View style={{flex: 1, alignItems: 'center'}}>
      <View style={styles.titleContainer}>
        <View style={styles.titleTextContainer}>
          <Text style={styles.titleText}>{recipe}</Text>
          <Text style={styles.subtitleText}>Prep time: 1 hr 30 min</Text>
          <Text style={styles.subtitleText}>Yields: 4 servings</Text>
          <Text style={styles.subtitleText}>Calories: 800 cal per serving</Text>
          <Text style={styles.subtitleText}>Difficulty: *****</Text>
        </View>
        <Image source={Images.spoonInCircle} style={styles.titleImg}></Image>
      </View>
      <Image style={styles.img} source={Images.fettuccine}/>
    </View>
  );

  return ( 
    <ImageBackground /*source={Images.butchers}(*/ style={styles.container}>
      <Header></Header>
      <View style={styles.content}>
          <SectionList
            ListHeaderComponent={ListHeader}
            ListFooterComponent={<View style={{height: 60}}/>}
            style={{width: '100%'}} contentContainerStyle={styles.scrollView}
            sections={DATA}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => <Item title={item} />}
            renderSectionHeader={({ section: { title } }) => <SectionHeader title={title}/>}
          />
          <View style={{position: 'absolute', bottom: 5}}>
            <RecipalButton width={375} height={50} fontSize={24} text={'Continue'} onPress={() => navigation.navigate('RecipeStep', {recipe: recipe, step: 1})}/>
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
  }
});