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
// import List component from it's file
import List from './historyList';

//export class Getlistis
export default class History extends Component {
  static navigationOptions = {
    title: 'History Lists',
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
      lists: '',
      historyLists: [
        {
          _id: '59f18c20734d1d0e5abf6226',
          consumerName: 'Hamshari',
          items: 'Ships Lase 1jd, Orange 2.5kg, Eggs 1-board',
          storeInfo: 'Mecca mall, Mecca st.',
          available: true,
          location: { latitude: 31.982688, longitude: 35.833999 },
          agentName: 'osamaths',
          paid: 5
        },
        {
          _id: '59f986306d784e556d0c75b3',
          items: 'potato 5kg, Pepsi 2l, Burger 1000g',
          storeInfo: 'Amman',
          consumerName: 'Doaa',
          available: true,
          location: { latitude: 31.982115, longitude: 35.833057 },
          agentName: 'osamaths',
          paid: 7,
          __v: 0
        }
      ]
    };
  }

  // On Component started
  componentWillMount() {
    this.getHistoryLists();
  }

  //Get active lists from database
  getHistoryLists() {
    return fetch('https://serverna.herokuapp.com/agent/history/lists')
      .then(response => response.json())
      .then(data => {
        this.setState({ lists: data });
      })
      .catch(err => {
        throw err;
      });
  }
  //function for sepersting the objects into components 'List componenet'
  renderHistoryLists = () => {
    if (this.state.lists.length) {
      return (
        <View>
          {this.state.lists.map((list, index) => (
            <List list={list} key={index} />
          ))}
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.content}>No history available.</Text>
        </View>
      );
    }
  };

  render() {
    const { navigate } = this.props.navigation;

    return <ScrollView>{this.renderHistoryLists()}</ScrollView>;
  }
}
// AppRegistry.registerComponent('AvailableLists', () => AvailableLists);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray'
  },
list :{
  backgroundColor : '#303f9f',
  width:300,
  height:60,
  borderRadius:10,
  justifyContent: 'center',
  alignItems: 'center',
},
content:{
  fontSize:20,
  fontWeight:'bold'
}

});
