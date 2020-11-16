import * as React from "react";
import { View, Text, Platform, StatusBar, HeaderBackButton, Button, StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { setLocalNotification, checkExistingNotification } from './utils/helpers.js';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import Constants from 'expo-constants'
import Decks from './components/Decks.js'
import DeckView from './components/DeckView.js'
import NewDeck from './components/NewDeck.js'
import NewCard from './components/NewCard.js'
import Quiz from './components/Quiz.js'
import * as RootNavigation from './components/RootNavigation.js';

function FlashCardsStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const RouteConfigs = {
  Decks:{
    name: "Decks",
    component: Decks,
    options: {tabBarIcon: ({tintColor}) => <FontAwesome5 name='th-list' size={30} color={tintColor} />, title: 'Decks'}
  },
  NewDeck:{
    component: NewDeck,
    name: "New Deck",
    options: {tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor} />, title: 'New Deck'}
  }
}

const TabNavigatorConfig = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: "rgb(0,0,255)",
    style: {
      height: 56,
      backgroundColor: "rgb(224,224,224)",
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
}

const Tab = Platform.OS === 'ios'
        ? createBottomTabNavigator()
        : createMaterialTopTabNavigator()

const TabNav = () =>(
  <Tab.Navigator {...TabNavigatorConfig}>
      <Tab.Screen {...RouteConfigs['Decks']} />
      <Tab.Screen {...RouteConfigs['NewDeck']} />
  </Tab.Navigator>
)

// Config for StackNav
const StackNavigatorConfig = {
  headerMode: "screen"
}
const StackConfig = {
  TabNav:{
    name: "Home",
    component: TabNav,
    options: {headerShown: false}
  },
  DeckView:{
    name: "DeckView",
    component: DeckView,
    options: {
      headerTintColor: "white",
      headerStyle:{
        backgroundColor: "black"
      },
      title: "Decks"
    }
  },
  NewCard:{
    name: "NewCard",
    component: NewCard,
    options: {
      headerTintColor: "white",
      headerStyle:{
        backgroundColor: "black"
      },
      title: "Add Card"
    }
  },
  Quiz:{
    name: "Quiz",
    component: Quiz,
    options: {
      headerTintColor: "white",
      headerStyle:{
        backgroundColor: "black"
      },
      title: "Quiz"
    }
  }
}
const Stack = createStackNavigator();
const MainNav = () =>(
  <Stack.Navigator {...StackNavigatorConfig}>
    <Stack.Screen {...StackConfig['TabNav']} />
    <Stack.Screen {...StackConfig['DeckView']} />
    <Stack.Screen {...StackConfig['NewCard']} />
    <Stack.Screen {...StackConfig['Quiz']} />
  </Stack.Navigator>
)

export default class App extends React.Component {
  componentDidMount() {
    // check Notification status
    checkExistingNotification()
      .then((data) => {
        if(data === null){
          setLocalNotification()
        }
    })
  }

  render(){
    return (
      <>
        <FlashCardsStatusBar backgroundColor="black" barStyle="light-content" />
        <NavigationContainer ref={RootNavigation.navigationRef}>
          <MainNav />
        </NavigationContainer>
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})
