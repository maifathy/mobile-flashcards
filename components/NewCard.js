import React, { Component, useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet }
  from 'react-native';
import { addCardToDeck, getDeck } from '../utils/api.js'

export default class NewCard extends Component{
  state={
    question: 'Card Question',
    answer: 'Card Answer'
  }

  setQuestion = (text) =>{
    this.setState(()=>({
      question: text
    }))
  }

  setAnswer = (text) =>{
    this.setState(()=>({
      answer: text
    }))
  }

  createNewCard = () => {
    const { deck } = this.props.route.params
    const { question, answer } = this.state
    addCardToDeck(deck, question, answer)
    .then(() => {
      getDeck(deck)
        .then((item) => {
          this.props.navigation.navigate('DeckView', { updatedItem: item, updated: true })
        })
    })
  }
  render(){
    const { question, answer } = this.state
    return(
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <TextInput
                style={[styles.txtInput, {marginTop: 20}]}
                placeholder='Card Question'
                onChangeText={text => this.setQuestion(text)} />
              <TextInput
                style={styles.txtInput}
                placeholder='Card Answer'
                onChangeText={text => this.setAnswer(text)} />
              <TouchableHighlight
                disabled={question === 'Card Question' || answer === 'Card Answer'}
                onPress={() => this.createNewCard()}>
                <Text style={styles.btnSubmit}>Submit</Text>
              </TouchableHighlight>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const styles= StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch'
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
