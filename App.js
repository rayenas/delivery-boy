import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import SignInWithOAuth from './app/Components/SignInWithOAuth';
import Home from './app/Screens/Home'
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './app/Navigations/TabNavigation';
import Profile from './app/Screens/Login';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();


export default function App() {
  return (
    <ClerkProvider publishableKey={"pk_test_YWR2YW5jZWQtZWxmLTUwLmNsZXJrLmFjY291bnRzLmRldiQ"}>
      <SafeAreaView style={styles.container}>
        <StatusBar hidden/>
     
          <NavigationContainer>
          <Stack.Navigator initialRouteName="Screen1">
        <Stack.Screen name="Screen1" component={TabNavigation}  options={{ headerShown: false }}/>
        <Stack.Screen name="Screen2" component={Profile}  options={{ headerShown: false }}/>
        </Stack.Navigator>
       
      </NavigationContainer>
       
        
      </SafeAreaView>
   
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
  },
});
