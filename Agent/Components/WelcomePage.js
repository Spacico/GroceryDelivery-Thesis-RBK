import React, { Component } from 'react';
import getDirections from 'react-native-google-maps-directions';
import {TouchableOpacity,StatusBar, Image,View,StyleSheet,TouchableHighlight,Text,TextInput} from 'react-native';
import {TabBar,SearchBar,Tabs, Tab, Icon,SideMenu, List, ListItem } from 'react-native-elements'
import {Header,Container, Button } from 'native-base';

//import List component from it's file
// import List from './list';
import Lists from './Lists';
//export class Getlistis
export default class WelcomePage extends Component {
  static navigationOptions = {
    title: 'Welcome',
    headerTitleStyle: {
     fontSize: 25,
     color: 'white'
   },
   headerStyle: {
     backgroundColor: '#6668d0'
   },
   headerTintColor: {
    backgroundColor: 'white'
   }
  };

  constructor(props) {
    super(props);
    this.state = {
      changeFlag: this.props.changeFlag,
      lists: '',
      // getCurrentList: this.props.getCurrentList,
      // setCurrentList: this.props.setCurrentList,
      // historyLists: this.props.getHistoryLists(),
      // addListToHistory: this.props.addListToHistory,
      // clickedValue: '',
      // modalCurrentList: false,
      // modalHistoryLists: false
      currentList: {
        _id: '59f18c0e734d1d0e5abf6221',
        consumerName: 'Hussen',
        items: 'Potato 1kg, Orange 2.5kg, Eggs 1-board',
        storeInfo: 'Sameh mall, Tabarbuor',
        available: false,
        location: { latitude: 31.982615, longitude: 35.833657 },
        agentName: 'osamaths'
      }
    };
  }

  // Modal manager
  setModalVisible(modalName, visible) {
    this.setState({ [modalName]: visible });
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
        <View style={styles.container}>
        <StatusBar
          backgroundColor ="#303f9f"
          />
          <TouchableOpacity
          style={styles.btn}
            onPress={() => {
              navigate('Login')
            }}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <Text >{'\n'}</Text>
        </View>
    );
  }
}
// AppRegistry.registerComponent('Home', () => Home);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c5cae9',
    // backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'center',
    color:'white'

  },
  btn:{
    backgroundColor : '#6668d0',
    width:300,
    height:60,
    borderRadius:10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title:{

  }

});
