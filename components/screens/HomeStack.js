import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import RecipeSelect from './RecipeSelect'
import RecipeStep from './RecipeStep'
import RecipeFinish from './RecipeFinish'
import HomePage from './HomePage'

export default function HomeStack() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="HomePage" component={HomePage}/>
      <Stack.Screen name="RecipeSelect" component={RecipeSelect}/>
      <Stack.Screen name="RecipeStep" component={RecipeStep} />
      <Stack.Screen name="RecipeFinish" component={RecipeFinish} />
    </Stack.Navigator>
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