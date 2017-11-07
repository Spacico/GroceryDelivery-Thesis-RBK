import React, { Component } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
  Text,
  AppRegistry
} from 'react-native';
// import Movies from './getlists';

export default class Login extends Component {
  static navigationOptions = {
    title: 'Login'
  };
  constructor(props) {
    super(props);
    this.state = {
      changeFlag: props.changeFlag,
      agentName: '',
      password: ''
    };
  }
  onClickLogin(navigate) {
    fetch('https://serverna.herokuapp.com/agentLogin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        if (responseJson === true) {
          navigate('Home');
        } else {
          alert(responseJson.message);
        }
      })
      .catch(err => {
        throw err;
      });
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.input}
            placeholder="username"
            onChangeText={val => {
              this.setState({ agentName: val });
            }}
          />
          <TextInput
            secureTextEntryt={true}
            underlineColorAndroid="transparent"
            style={styles.input}
            placeholder="password"
            onChangeText={val => {
              this.setState({ password: val });
            }}
          />

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              this.onClickLogin(navigate);
            }}
            underlayColor="blue">
            <View
              style={{
                backgroundColor: 'skyblue',
                height: 50
              }}>
              <Text style={styles.buttonText}>Login</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
AppRegistry.registerComponent('Login', () => Login);
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    alignItems: 'center'
  },
  logo: {
    color: 'white',
    fontSize: 40,
    fontStyle: 'italic',
    fontWeight: 'bold',
    textShadowColor: '#252525',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 15,
    marginBottom: 20
  },
  inputContainer: {
    margin: 20,
    marginBottom: 0,
    padding: 20,
    paddingBottom: 10,
    alignSelf: 'stretch',
    borderColor: '#fff',
    backgroundColor: 'rgba(255,255,255,0.2)'
  },
  input: {
    fontSize: 16,
    height: 40,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,1)'
  },
  buttonContainer: {
    alignSelf: 'stretch',
    margin: 20,
    padding: 20,
    backgroundColor: 'blue',
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'rgba(255,255,255,0.6)'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
