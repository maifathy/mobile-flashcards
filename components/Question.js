import React, { Component } from 'react';
import { Text, View, StyleSheet, Animated, TouchableOpacity } from 'react-native';

export default class Question extends Component{
  UNSAFE_componentWillUpdate(prevProps) {
    if(prevProps.id !== this.props.id) {
      Animated.timing(this.animatedValue, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true
      }).start();
    }
  }
  UNSAFE_componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0
    this.animatedValue.addListener(({ value }) => {
      this.value = value
    })
    this.questionInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })
    this.answerInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })
    this.questionOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0]
    })
    this.answerOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1]
    })
  }

  toggle = () => {
    if (this.value >= 90) {
      Animated.timing(this.animatedValue, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true
      }).start();
    } else {
      Animated.timing(this.animatedValue, {
        toValue: 180,
        duration: 1000,
        useNativeDriver: true
      }).start();
    }
  }

  render(){
    const questionAnimatedStyle = {
      transform: [
        { rotateY: this.questionInterpolate }
      ]
    }
    const answerAnimatedStyle = {
      transform: [
        { rotateY: this.answerInterpolate }
      ]
    }
    const { question, answer } = this.props
    return(
      <View style={styles.container}>

        <Animated.View style={[questionAnimatedStyle, {opacity: this.questionOpacity}]}>
          <Text style={styles.toggle}>
            {question}
          </Text>
          <TouchableOpacity
            onPress={() => this.toggle()}
          >
            <Text style={styles.text}>Answer</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={[answerAnimatedStyle, styles.flipCardBack, {opacity: this.answerOpacity}]}>
          <Text style={styles.toggle}>
            {answer}
          </Text>
          <TouchableOpacity
            onPress={() => this.toggle()}
          >
            <Text style={styles.text}>Question</Text>
          </TouchableOpacity>
        </Animated.View>

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
  toggle: {
    width: 300,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    backfaceVisibility: 'hidden',
    fontSize: 28,
    textAlign: 'center'
  },
  text:{
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'red'
  },
  flipCardBack: {
    backgroundColor: 'transparent',
    position: 'absolute'
  }
})
