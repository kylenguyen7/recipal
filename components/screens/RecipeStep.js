import { StyleSheet, Text, ScrollView, SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RecipalButton from '../RecipalButton'
import XHeader from '../XHeader'

export default function RecipeStep({ navigation, route }) {
  let { recipe, step } = route.params

  function goToRecipeStep(recipe, stepNum) {
    if(step == 3) {
      navigation.push("RecipeFinish", {recipe: recipe})
    } else {
      navigation.push("RecipeStep", {recipe: recipe, step: stepNum})
    }
  }

  return (
    <SafeAreaView>
      <XHeader></XHeader>
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
});