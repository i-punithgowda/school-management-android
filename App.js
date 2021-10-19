import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/home';
import Login from './components/login';
import ForgotPass from './components/forgotpass';
import Dashboard from './components/dashboard';
import Result from './components/result';
import Attendance from './components/Attendance';
import ChatRoom from './components/chat';
export default function App() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{
      headerStyle:{
        backgroundColor:'crimson'
      },
      headerTintColor:'#f1f1f1'
    }} >
      <Stack.Screen name="Home" options={{title:'School management system'}} component={Home} />
      <Stack.Screen name="Login" options={{title:'Login '}} component={Login} />
      <Stack.Screen name="ForgotPass" options={{title:'Forgot password'}} component={ForgotPass} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Result" component={Result} />
      <Stack.Screen name="Attendance" component={Attendance} />
      <Stack.Screen name="Chat" component={ChatRoom} 
         options={({ route }) => ({ title: route.params.name })}
      />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

