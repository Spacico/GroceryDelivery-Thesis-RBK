import React, { Component } from 'react';
import getDirections from 'react-native-google-maps-directions';
import {TouchableOpacity,StatusBar, Image,View,StyleSheet,TouchableHighlight,Text,TextInput} from 'react-native';
import {TabBar,SearchBar,Tabs, Tab, Icon,SideMenu, List, ListItem } from 'react-native-elements'
import {Header,Container, Button } from 'native-base';

//import List component from it's file
// import List from './list';
import Lists from './Lists';
//export class Getlistis
export default class Home extends Component {
  static navigationOptions = {
    title: 'Home',
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

          <TouchableOpacity
            style = {styles.btn}
            onPress={() => {
              navigate('AvailableLists');
            }}>
            <Text style={styles.buttonText}>Available lists</Text>
          </TouchableOpacity>



          <TouchableOpacity
          style = {styles.btn }
            onPress={() => {
              navigate('CurrentList', { currentList: this.state.currentList });
            }}>
            <Text style={styles.buttonText}>Current list</Text>
          </TouchableOpacity>



          <TouchableOpacity
            style = {styles.btn}
            onPress={() => {
              navigate('History');
            }}>
            <Text style={styles.buttonText}>History lists</Text>
          </TouchableOpacity>



          <TouchableOpacity
            style = {styles.btn}
            onPress={() => {
              navigate('WelcomePage')
            }}>
            <Text style={styles.buttonText}>Log out</Text>
          </TouchableOpacity>

      </View>
    );
  }
}
// AppRegistry.registerComponent('Home', () => Home);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  backgroundColor:'#c5cae9',
    // backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
    // color:'#3498db'
    // backfaceVisibility:true
  },
  btn:{
    backgroundColor : '#6668d0',
    width:300,
    height:60,
    borderRadius:10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20
  },
  buttonText:{
      color:'white',
      fontWeight:'bold',
      fontSize:20,
  }
});
