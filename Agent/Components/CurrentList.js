import React, { Component } from 'react';
import {
  ScrollView,
  Button,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  AppRegistry,
  Dimensions
} from 'react-native';
import getDirections from 'react-native-google-maps-directions';
export default class CurrentList extends Component {
  static navigationOptions = {
    title: 'Current List',
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
      currentList: ''
    };
  }

  componentWillMount() {
    this.getCurrentList();
  }
  handleGetDirections = () => {
    const data = {
      destination: {
        latitude: this.state.currentList.location.latitude,
        longitude: this.state.currentList.location.longitude
      },
      params: [
        {
          key: 'dirflg',
          value: 'd'
        }
      ]
    };
    getDirections(data);
  };

  getCurrentList() {
    return fetch('https://serverna.herokuapp.com/agent/current/list')
            .then( response => response.json())
            .then( data => {
              if(data === false){
                this.setState({currentList: ''});
              }else{
                this.setState({currentList: data});
              }
            })
            .catch (err => {
              throw err;
            })
  }

  renderCurrentList() {
    const { state } = this.props.navigation;
    if (this.state.currentList !== '') {
      return (
        <View style={{flex:1, marginTop: 22 }}>
          <View style={styles.modal}>
            <Text style={styles.val}>
              <Text style={styles.key}>Items:  </Text>
              {this.state.currentList.items}
            </Text>

            <Text style={styles.val}>
              <Text style={styles.key}>
                Consumer name:  </Text>
              {this.state.currentList.consumerName}
            </Text>

            <Text style={styles.val}>
              <Text style={styles.key}>
                Store information: </Text>

              {this.state.currentList.storeInfo}
            </Text>
          </View>
          <TouchableOpacity
          style={styles.list}
          onPress={this.handleGetDirections} title="Get Directions" >
          <Text style={styles.text}>
          Get Direction
        </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.content}>
          <Text style={{ fontSize: 20,fontWeight:'bold', justifyContent: 'center',
          alignItems: 'center',color:'black'}}>
            No current list served right now.
          </Text>
        </View>
      );
    }
  }

  render() {
    return <View style={styles.container}>{this.renderCurrentList()}</View>;
  }
}
const {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
  backgroundColor:'#c5cae9',
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor:'#c5cae9'
  },
  val:{
      marginTop:25,
    color:'#26418f',
    fontSize:20,
    fontWeight:'bold'
  },
  key:{
    marginTop:25,
    color:'white',
    fontSize:25,
    fontWeight:'bold'
  },
  modal:{
    // marginLeft:8,
    width:width * 0.9,
    height:height * 0.32,
    marginTop:30,
    padding: 5,
    borderRadius:10,
    borderWidth:2,
    backgroundColor:'#6668d0'
  },
  list :{
    marginTop:15,
    // marginLeft:80,
    backgroundColor : '#6668d0',
    width:width * 0.9,
    height:height * 0.1,
    borderRadius:10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text:{
    marginTop:20,
    color:'white',
    fontSize:20,
    fontWeight:'bold',
    marginBottom:20
  }
});
