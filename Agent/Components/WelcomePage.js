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
    title: 'Welcome'
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
        <View>
          <TouchableOpacity
            onPress={() => {
              navigate('Login')
            }}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigate('Signup')
            }}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
    );
  }
}
// AppRegistry.registerComponent('Home', () => Home);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'gray',
    // backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
    // color:'#3498db'
    // backfaceVisibility:true
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
    fontSize: 22,
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
  },
  current:{
    top: 120,
    backgroundColor: '#00B5EC',
    width: 300,
       height : 50,
       borderColor:'#00B5EC',
       borderWidth:2,
       borderRadius:15
  },
  available:{
    top: 60,
    backgroundColor: '#00B5EC',
    width: 300,
       height : 50,
       borderColor:'#00B5EC',
       borderWidth:2,
       borderRadius:15
  },
  history:{
    top: 180,
    backgroundColor: '#00B5EC',
    width: 300,
       height : 50,
       borderColor:'#00B5EC',
       borderWidth:2,
       borderRadius:15
  },
  logout:{
    marginTop: 402 ,
    backgroundColor: '#00B5EC',
    opacity:0.8,
    borderWidth:2,
    width: 410,
       height : 50,
       borderColor:'#00B5EC',
       borderWidth:2,
  }
});
