import { View, Text, Image, Pressable, StyleSheet } from "react-native"
import Colors from '../constants/colors';
import { useNavigation } from "@react-navigation/native";


export default function RecipeItem({ recipe }) {
    let navigation = useNavigation()
    const { title, time, image } = recipe
    return (
        <Pressable style={styles.recipeContainer} onPress={() => {navigation.navigate("Ingredients", {currRecipe: recipe, from: "Me"})}}>
        <Image style={styles.recipeImg} source={image}/>
        <View style={styles.recipeTextContainer}>
            <Text style={styles.recipeTitle}>{title}</Text>
            <Text style={styles.recipeSubtitle}>Time: {time}</Text>
            <Text style={styles.recipeSubtitle}>Calories: {time}</Text>
        </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    recipeContainer: {
        height: 100,
        width: '90%',
        margin: 7,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        //justifyContent: 'center',
        paddingLeft: '3%',
        alignItems: 'center',
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5
    },
    recipeImg: {
        height: '80%',
        width: '30%',
        resizeMode: 'cover',
        backgroundColor: Colors.tomato,
    },
    recipeTextContainer: {
        marginLeft: 10,
        width: 140
    },
    recipeTitle: {
        fontFamily: 'Avenir-Book',
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16
    },
    recipeSubtitle: {
        fontFamily: 'Avenir-Book',
        color: 'black',
        fontSize: 12
    }
});