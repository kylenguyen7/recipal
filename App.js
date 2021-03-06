import { StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './components/screens/HomeStack'
import MeStack from './components/screens/MeStack';
import Colors from './constants/colors';
import { Ionicons } from '@expo/vector-icons';
import Welcome from './components/screens/welcomeScreen';

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
        <Tab.Screen name="Home" component={HomeStack} 
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? "home" : "home-outline"} color={color} size={size} />
          )
        }}/>
        <Tab.Screen name="Me" component={MeStack}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? "heart-circle" : "heart-circle-outline"} color={color} size={size} />
          ),
        }}/>
         <Tab.Screen name="Welcome" component={Welcome}
        options={{
          tabBarButton: () => null,
          tabBarStyle: { display: 'none' },
        }}/>
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
