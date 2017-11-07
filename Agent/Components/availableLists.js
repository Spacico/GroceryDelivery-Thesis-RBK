import React, { Component } from 'react';
import {
  Modal,
  View,
  Text,
  AppRegistry,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button
} from 'react-native';
import getDirections from 'react-native-google-maps-directions';
// import List component from it's file
import List from './list';

//export class Getlistis
export default class AvailableLists extends Component {
  static navigationOptions = {
    title: 'Available Lists'
  };

  constructor(props) {
    super(props);
    this.state = {
      changeFlag: this.props.changeFlag,
      lists: ''
      // getCurrentList: this.props.getCurrentList,
      // setCurrentList: this.props.setCurrentList,
      // historyLists: this.props.getHistoryLists(),
      // addListToHistory: this.props.addListToHistory,
      // clickedValue: '',
      // modalCurrentList: false,
      // modalHistoryLists: false
    };
  }

  // On Component started
  componentWillMount() {
    this.getAvailableLists();
  }
  //Get active lists from database
  getAvailableLists() {
    return fetch('https://serverna.herokuapp.com/checkAvailableLists')
      .then(response => response.json())
      .then(data => {
        this.setState({ lists: data });
      })
      .catch(err => {
        throw err;
      });
  }
  //function for sepersting the objects into components 'List componenet'
  renderAvailableLists = () => {
    if (this.state.lists.length)
      return (
        <View>
          {this.state.lists.map((list, index) => (
            <List list={list} key={index} />
          ))}
        </View>
      );
  };

  // Modal manager
  setModalVisible(modalName, visible) {
    this.setState({ [modalName]: visible });
  }

  render() {
    const { navigate } = this.props.navigation;

    return <ScrollView>{this.renderAvailableLists()}</ScrollView>;
  }
}
// AppRegistry.registerComponent('AvailableLists', () => AvailableLists);
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
  listInfoContainer: {
    backgroundColor: '#B5B5B5',
    padding: 5,
    margin: 5
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
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
