import { StyleSheet, Text, ScrollView, SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RecipalButton from '../RecipalButton'
import Header from '../BackHeader'

export default function RecipeSelect() {
  let navigation = useNavigation();

  function goToRecipeStep(recipe, stepNum) {
    navigation.push("RecipeStep", {recipe: recipe, step: stepNum})
  }

  return (
    <SafeAreaView>
      <Header></Header>
      <ScrollView>
        <Text>Recipe select!</Text>
        <RecipalButton text={'Fetuccine Alfredo'} width={300} height={50}
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