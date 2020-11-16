import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet }
from 'react-native';
import { fetchDeckQuestions } from '../utils/api.js';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers.js';
import Question from './Question.js';

export default class Quiz extends Component{
  state={
    questions: [],
    currentQuestion: 0,
    score: 0
  }

  componentDidMount(){
    let questionsArray = []
    if(this.props.route.params.deck !== null){
      fetchDeckQuestions(this.props.route.params.deck).then((results)=> {
        Object.keys(results).map((id) => {
          questionsArray.push(results[id])
          let counter = 0
          questionsArray.map((q) => {
            q['id'] = counter
            counter++
          })
        })
        this.setState(() => ({
          questions: questionsArray
        }))
      })
    }
  }

  restartQuiz = () => {
    this.setState(() => ({
      currentQuestion: 0,
      score: 0
    }))
  }

  backToDeck = () => {
    this.props.navigation.goBack()
  }

  setScore = (boolean) => {
    const { questions, currentQuestion } =  this.state
    if(boolean && currentQuestion < questions.length) {
      this.setState((prevState) => ({
        score: prevState.score + 1
      }))
    }

    if(questions.length > currentQuestion) {
      this.setState((prevCurrentQuestion) => ({
          currentQuestion: prevCurrentQuestion.currentQuestion + 1
      }))
    }
    if(questions.length === currentQuestion + 1){
      clearLocalNotification()
      .then(setLocalNotification)
    }
  }

  render(){
    const { questions, currentQuestion, score } = this.state
    const current = questions.filter(q => q.id ===  currentQuestion)
    return(
      <View style={styles.container}>
      {current[0] !== undefined &&
        <View>
          <Question
            question={current[0].question}
            answer={current[0].answer}
            id={current[0].id}
          />
          <View style={{marginBottom: 10}}>
            <TouchableHighlight onPress={() => this.setScore(true)}>
              <Text style={styles.correct}>Correct</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => this.setScore(false)}>
              <Text style={styles.incorrect}>Incorrect</Text>
            </TouchableHighlight>
            <Text style={{fontWeight: 'bold', fontSize: 22}}>
              Remaining {questions.length - currentQuestion - 1} of {questions.length} Questions
            </Text>
          </View>
        </View>
      }
      {current[0] === undefined &&
        <View>
          <Text style={{fontWeight: 'bold', fontSize: 22}}>
            Score: {score} of {questions.length} Questions
          </Text>
          <TouchableHighlight
            onPress={() => this.restartQuiz()}>
            <Text style={styles.btnSubmit}>Restart Quiz</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => this.backToDeck()}>
            <Text style={styles.btnSubmit}>Back To Deck</Text>
          </TouchableHighlight>
        </View>
      }
      </View>
    )
  }
}

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
  toggle:{
    fontWeight: 'bold',
    color: 'red'
  },
  correct:{
    color: 'white',
    fontSize: 22,
    backgroundColor: 'green',
    width: 200,
    padding: 10,
    marginTop: 10,
    textAlign: 'center',
    borderRadius: 6,
    alignSelf: 'center'
  },
  incorrect:{
    color: 'white',
    fontSize: 22,
    backgroundColor: 'red',
    width: 200,
    padding: 10,
    marginTop: 10,
    textAlign: 'center',
    borderRadius: 6,
    alignSelf: 'center'
  },
  btnSubmit:{
    opacity: 0.6,
    backgroundColor: "#000",
    color: "#ffffff",
    padding: 10,
    marginTop: 10
  }
})
