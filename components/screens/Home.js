import { StyleSheet, Text, ScrollView, SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RecipalButton from '../RecipalButton'

export default function Home() {
  let navigation = useNavigation();

  function goToRecipeStep(recipe, stepNum) {
    navigation.push("RecipeSelect", {recipe: recipe, step: stepNum})
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <Text>Home page!</Text>
        <RecipalButton text={'Italian Recipes'} width={300} height={50}
                        onPress={() => goToRecipeStep('fetuccine-alfredo', 1)}></RecipalButton>
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
});