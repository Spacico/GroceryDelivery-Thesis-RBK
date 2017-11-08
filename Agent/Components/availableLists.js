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
    title: 'Available Lists',
    headerTitleStyle: {
     fontWeight: 'bold',
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
  list :{
    backgroundColor : '#303f9f',
    width:300,
    height:60,
    borderRadius:10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
