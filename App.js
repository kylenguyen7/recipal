import { StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './components/screens/HomeStack'
import MeStack from './components/screens/MeStack';
import Colors from './constants/colors';


const Tab = createBottomTabNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    'Avenir-Book': require('./assets/fonts/AvenirLTStd-Book.otf'),
    'Avenir-Roman': require('./assets/fonts/AvenirLTStd-Roman.otf'),
    'Avenir-Black': require('./assets/fonts/AvenirLTStd-Black.otf'),    
  });

  if (!fontsLoaded) {
    return <AppLoading/>;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          "tabBarActiveTintColor": Colors.tomato,
          "tabBarInactiveTintColor": "black",
          "tabBarStyle": [
            {
              "display": "flex"
            },
            null
          ]
        }}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Me" component={MeStack} />
      </Tab.Navigator>
    </NavigationContainer>
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
