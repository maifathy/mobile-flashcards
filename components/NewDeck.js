import React, { Component, useState } from 'react';
import { Text, View, TextInput, TouchableHighlight, StyleSheet } from 'react-native';
import { saveDeckTitle } from '../utils/api.js'

export default class NewDeck extends Component{
  state = {
    title: ''
  }
  setTitle = (text) =>{
    this.setState(() => ({
        title: text
    }))
  }
  createNewDeck = () => {
    const entry = { title: this.state.title, questions: []}
    saveDeckTitle(this.state.title, entry)
    this.setTitle('')
    this.props.navigation.navigate('DeckView', { item: entry });
  }

  componentDidMount(){
    this.setTitle('')
  }
  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.deckLabel}>
          What is the title of your new deck?
        </Text>
        <TextInput
          style={styles.txtInput}
          placeholder='Deck Title'
          value={this.state.title}
          onChangeText={text => this.setTitle(text)} />
        <TouchableHighlight
          disabled={this.state.title === ''}
          onPress={() => this.createNewDeck()}>
          <Text style={styles.btnSubmit}>Create Deck</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles= StyleSheet.create({
  container: {
    //flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  deckLabel:{
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 60,
    textAlign: 'center'
  },
  txtInput:{
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 6,
    width: 320,
    height: 40,
    justifyContent:'center',
    marginBottom: 20,
    padding: 5
  },
  btnSubmit:{
    backgroundColor: '#000',
    color: '#ffffff',
    padding: 10,
    marginTop: 10,
    textAlign: 'center',
    borderRadius: 6
  }
})
