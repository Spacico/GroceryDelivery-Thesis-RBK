import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  AppRegistry
} from 'react-native';
// import { SideMenu, List, ListItem } from 'react-native-elements'
import Signup from './Components/Signup';
import Login from './Components/Login';
import Getlists from './Components/getlists';
// import Profile from './Components/myProfile';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flag: 'main',
      isOpen: false,
      currentList: '',
      historyLists: []
    };
    
    this.toggleSideMenu = this.toggleSideMenu.bind(this);
  }

  // Current list methods
  getCurrentList() {
    return this.state.currentList;
  }
  setCurrentList(list) {
    this.setState({list: list});
  }

  // Lists history
  getHistoryLists() {
    return this.state.historyLists;
  }
  addList(list) {
    this.setState({historyLists.push (list)};
  }

  onSideMenuChange(isOpen: boolean) {
    this.setState({
      isOpen: isOpen
    });
  }
  toggleSideMenu() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  changeFlag(sth) {
    this.setState({ flag: sth });
  }

  render() {
    if (this.state.flag === 'main') {
      return (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              this.changeFlag('signup');
            }}>
            <Text style={styles.buttonText}>SIGNUP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              this.changeFlag('login');
            }}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
          <View />
        </View>
      );
    } else if (this.state.flag === 'login') {
      return <Login changeFlag={this.changeFlag.bind(this)} />;
    } else if (this.state.flag === 'signup') {
      return <Signup changeFlag={this.changeFlag.bind(this)} />;
    } else if (this.state.flag === 'getLists') {
      return <Getlists changeFlag={this.changeFlag.bind(this)} />;
      // getLocation={this.getLocation.bind(this)} changeLocation={this.changeLocation.bind(this)}
    }
  }
}
AppRegistry.registerComponent('App', () => App);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray'
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
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'center'
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
  buttonContainer: {
    alignSelf: 'stretch',
    margin: 20,
    padding: 20,
    backgroundColor: 'blue',
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'rgba(255,255,255,0.6)'
  },
  input: {
    fontSize: 16,
    height: 40,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,1)'
  }
});
