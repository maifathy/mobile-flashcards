import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
  ActivityIndicator,
  Animated
} from 'react-native';
import { getDecks, FLASHCARDS_STORAGE_KEY } from '../utils/api.js';
import * as RootNavigation from './RootNavigation.js';
import { withNavigationFocus } from 'react-navigation';

function DeckRow ({title, questions})
{
  fadeAnimation = new Animated.Value(1)
  onPress = (item) => {
    Animated.spring(fadeAnimation, {
      toValue: 0.1,
      duration: 20,
      useNativeDriver: true
    })
    .start(() => {
      RootNavigation.navigate('DeckView', { item: item });
    });

  }
  return (
    <View style={styles.row}>
      <TouchableOpacity key={title} onPress={()=> onPress({title, questions})}>
        <Animated.View style={{ flex: 1, opacity: fadeAnimation }}>
          <Text style={{ fontSize:18, color: 'black' }}>
            { title }
          </Text>
          <Text style={{ color: 'grey' }}>
            { questions && `${questions.length} cards` }
          </Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  )
}

class Decks extends Component{
  state={
    ready: false,
    decks: null
  }

  loadDecks = () => {
    let items = []
    getDecks()
      .then(results => {
        results = JSON.parse(results)
        if(results !== null){
          Object.keys(results).map((id) => {
            items.push(results[id])
          })
          this.setState(() => ({ decks: items }))
        }
      })
      .then(this.setState(() => ({ ready: true })))
  }

  renderItem = ({item}) => {
    return <DeckRow key={item.title} {...item}/>
  }

  componentDidMount(){
    this._navListener = this.props.navigation.addListener('focus', () => {
      this.loadDecks()
    });
    this.loadDecks()
  }

  render(){
    if (this.state.ready === false) {
      return(
        <View style={styles.container}>
          <ActivityIndicator size='large' color="#0000ff"/>
          <Text>
            loading
          </Text>
        </View>
      )
    }
    if(this.state.decks === null) {
      return (
        <View style={styles.container}>
          <Text>
            No decks to preview.
          </Text>
        </View>
      )
    }
    return(
      <View style={styles.container}>
        <FlatList
          data={this.state.decks}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.title}
        ></FlatList>
      </View>
    )
  }
}
export default withNavigationFocus(Decks)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    flex: 1,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: 'grey',
    alignSelf: 'stretch'
  },
  horizontal: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10
  }
})
