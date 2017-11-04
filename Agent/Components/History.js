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
import List from './list';

//export class Getlistis
export default class History extends Component {
  static navigationOptions = {
    title: 'History Lists'
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
    this.getHistoryLists();
  }

  //Get active lists from database
  getHistoryLists() {
    return fetch('https://serverna.herokuapp.com/history/lists')
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
    if (this.state.historyLists.length) {
      return (
        <View>
          {this.state.historyLists.map((list, index) => (
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
