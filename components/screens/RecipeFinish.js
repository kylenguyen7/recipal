import { StyleSheet, Text, ScrollView, SafeAreaView} from 'react-native';
import { NavigationActions } from '@react-navigation/native';
import RecipalButton from '../RecipalButton'
import Header from '../BackHeader'

export default function RecipeFinish({ navigation, route }) {
  let { recipe, step } = route.params

  function toRecipeHistory() {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Me' }],
    });
  }

  return (
    <SafeAreaView>
      <Header></Header>
      <ScrollView>
        <Text>{recipe} {step}</Text>
        <RecipalButton text={'View My Recipe History'} width={300} height={50}
                        onPress={() => toRecipeHistory()}></RecipalButton>
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