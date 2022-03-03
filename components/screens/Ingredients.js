import { StyleSheet, Text, Image, Pressable, ImageBackground, View, SectionList } from 'react-native';
import RecipalButton from '../RecipalButton'
import Header from '../BackHeader'
import Images from '../../constants/images';
import Colors from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import IngredientsData, { findIngredientByTitle } from '../../constants/ingredients-data'


export default function Ingredients({ navigation, route }) {
  let { currRecipe, from } = route.params;

  const ingredientsData = [];
  for(let i = 0; i < currRecipe.steps.length; i++) {
    ingredientsData.push({
      title: "Step " + (i + 1),
      stepNum: i,
      data: currRecipe.steps[i].ingredients
    })
  }

  function onBackButtonPress() {
    if(from === 'Me') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Me' }],
      });
    } else {
      navigation.goBack();
    }
  }

  function Item({ ingredient }) {
    const ingredientInfo = findIngredientByTitle(ingredient.title);

    return (
      <View style={styles.item}>
        <Image source={ingredientInfo.image} style={styles.itemImg}/>
        <Text style={styles.itemText}>{ingredient.amount} {ingredientInfo.units} {ingredient.title}</Text>
      </View>
    );
  }

  const SectionHeader = ({ title, stepNum }) => (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
      <Pressable style={styles.headerPressable} onPress={() => {navigation.navigate("Modification", {currRecipe, stepNum, prevPage: "Ingredients"})}}>
        <Ionicons name="pencil-sharp" size={32} color="white"></Ionicons>
      </Pressable>
    </View>
  )

  const ListHeader = () => (
    <View style={{flex: 1, alignItems: 'center'}}>
      <View style={styles.titleContainer}>
        <View style={styles.titleTextContainer}>
          <Text style={styles.titleText}>{currRecipe.title}</Text>
          <Text style={styles.subtitleText}>Prep time: {currRecipe.time}</Text>
          <Text style={styles.subtitleText}>Yields: {currRecipe.yield} servings</Text>
          <Text style={styles.subtitleText}>Calories: {currRecipe.calories} cal per serving</Text>
          <Text style={styles.subtitleText}>Difficulty: {currRecipe.difficulty}</Text>
        </View>
        <Image source={Images.spoonInCircle} style={styles.titleImg}></Image>
      </View>
      <Image style={styles.img} source={Images.fettuccine}/>
    </View>
  );

  return ( 
    <ImageBackground /*source={Images.butchers}(*/ style={styles.container}>
      <Header onBackButtonPress={onBackButtonPress}></Header>
      <View style={styles.content}>
          <SectionList
            ListHeaderComponent={ListHeader}
            ListFooterComponent={<View style={{height: 60}}/>}
            style={{width: '100%'}} contentContainerStyle={styles.scrollView}
            sections={ingredientsData}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => <Item ingredient={item} />}
            renderSectionHeader={({ section: { title, stepNum } }) => <SectionHeader title={title} stepNum={stepNum}/>}
          />
          <View style={{position: 'absolute', bottom: 5}}>
            <RecipalButton width={375} height={50} fontSize={24} text={'Continue'} onPress={() => navigation.navigate('RecipeStep', {currRecipe: currRecipe})}/>
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