import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import DietRestrictScreen from './DietRestrictScreen'
import NutriPrefScreen from './NutriPrefScreen'
import MeScreen from './MeScreen'


export default function MeStack() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="MeScreen" component={MeScreen}/>
      <Stack.Screen name="DietRestrictScreen" component={DietRestrictScreen}/>
      <Stack.Screen name="NutriPrefScreen" component={NutriPrefScreen}/>
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