import React, { Component } from 'react';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import { fetchDeck } from '../utils/api.js';

export default class DeckView extends Component{
  state={
    item: {}
  }

  addCard = () => {
    this.props.navigation.navigate('NewCard', {
      deck: this.props.route.params.item.title
    });
  }

  startQuiz = () => {
    this.props.navigation.navigate('Quiz', { deck: this.props.route.params.item.title });
  }

  prepareItem = () => {
    let item = {}
    if(this.props.route.params.updated && this.props.route.params.updated === true){
      item = this.props.route.params.updatedItem
    }
    else {
      item = this.props.route.params.item
    }
    this.setState(() => ({
      item: item
    }))
  }
  componentDidMount(){
    this._navListener = this.props.navigation.addListener('focus', () => {
      this.prepareItem()
    });
    this.props.navigation.setOptions({
      title: this.props.route.params.item.title
    })
  }
  render(){
    const { title, questions } = this.state.item

    return(
      <View style={styles.container}>
        <View style={{flex: 1, margin: 30}}>
          <Text style={{fontSize:30, fontWeight: 'bold', color: 'black'}}>
            { title }
          </Text>
          <Text style={{color: 'grey', textAlign: 'center'}}>
            { questions && `${questions.length} cards` }
          </Text>
        </View>
        <View style={{flex: 1, margin: 30}}>
          <TouchableHighlight
            onPress={() => this.addCard()}>
            <Text style={styles.btnSubmit}>Add Card</Text>
          </TouchableHighlight>
          <TouchableHighlight
            disabled={questions && questions.length === 0 ? true : false}
            onPress={() => this.startQuiz()}>
            <Text style={styles.btnSubmit}>Start Quiz</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles= StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  btnSubmit:{
    opacity: 0.6,
    backgroundColor: "#000",
    color: "#ffffff",
    padding: 10,
    marginTop: 10
  }
})
