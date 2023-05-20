import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Provider, useSelector } from 'react-redux';

import Start from './src/pages/Start/Start'
import Language from './src/pages/Language/Language'
import Onboarding from './src/pages/Onboarding/Onboarding'
import Login from './src/pages/Login/Login'
import Home from './src/pages/Home/Home';
import DashBoard from './src/pages/DashBoard/DashBoard';
import { store } from './src/redux/store';
import Profile from './src/pages/Profile';
import Chat from './src/pages/Chat';
import ModuleList from './src/pages/ModuleList';
import { t } from './src/utils/language';
import Market from './src/pages/Shopping';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const ModuleStack = createNativeStackNavigator();

function MyModules(){
  return (
    <Stack.Navigator initialRouteName='ModuleList' screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen
        name="ModuleList"
        component={ModuleList}
      />
      <Stack.Screen
        name="ModuleDashboard"
        component={DashBoard}
      />
      </Stack.Navigator>
  )
}

function MyTabs() {
  const language = useSelector(state=>state.language.language);

  return (
    <Tab.Navigator activeColor='#064f27' inactiveColor='white' barStyle={{ backgroundColor: '#229D3D' }}>
      <Tab.Screen
        options={{
          tabBarLabel: t[language]["Homepage"],
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home-assistant" color={color} size={26} />
          ),
        }}
        name="Tab1"
        component={Home} />
      <Tab.Screen
        name="Dashboard"
        options={{
          tabBarLabel: t[language]["Dashboard"],
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="tablet-dashboard" color={color} size={26} />
          ),
        }}
        component={MyModules} />
      <Tab.Screen
        name="Market"
        options={{
          tabBarLabel: t[language]["Shopping"],
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="shopping" color={color} size={26} />
          ),
        }}
        component={Market} />
      <Tab.Screen
        name="Chat"
        options={{
          tabBarLabel: t[language]["Chat"],
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="message-text" color={color} size={26} />
          ),
        }}
        component={Chat} />
      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: t[language]["Account"],
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-settings" color={color} size={26} />
          ),
        }}
        component={Profile} />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <Provider store={store}>  
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen
            name="Start"
            component={Start}
          />
          <Stack.Screen name="Language" component={Language} />
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={MyTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App