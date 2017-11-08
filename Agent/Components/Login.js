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
    title: 'Login',
    headerTitleStyle: {
     fontSize: 25,
     color: 'white'
   },
   headerStyle: {
     backgroundColor: '#6668d0'
   },
   headerTintColor: {
    backgroundColor: 'black'
   }

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
    if(this.state.agentName!== ''&& this.state.password !== ''){
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
    }else{
      alert('Please make sure that you filled all fields.')
    }
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>

          <TextInput

            underlineColorAndroid="transparent"
            style={styles.input}
            placeholder="username"
            onChangeText={val => {
              this.setState({ agentName: val });
            }}
          />
          <TextInput
            secureTextEntry
            underlineColorAndroid="transparent"
            style={styles.input}
            placeholder="password"
            onChangeText={val => {
              this.setState({ password: val });
            }}
          />
          <Text>{'\n\n'}</Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.onClickLogin(navigate);
            }}
            underlayColor="blue">

              <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

      </View>
    );
  }
}
AppRegistry.registerComponent('Login', () => Login);
const styles = StyleSheet.create({
  container: {
    flex: 1,
      backgroundColor:'#c5cae9',
      justifyContent: 'center',
      alignItems: 'center',
  },

  input: {
    fontSize: 16,
    height: 60,
    width:300,
    padding: 10,
    marginBottom: 10,
    backgroundColor:'white',
    borderRadius:10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color:'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  btn:{
    backgroundColor : '#6668d0',
    width:300,
    height:60,
    borderRadius:10,
    justifyContent: 'center',
    alignItems: 'center',
  }

});
