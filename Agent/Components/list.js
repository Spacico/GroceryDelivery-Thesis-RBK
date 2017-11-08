import React, { Component } from 'react';
import {
  Modal,
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  AppRegistry,
  Button,
  TouchableOpacity
} from 'react-native';
//import Mapo from './mapView';
import getDirections from 'react-native-google-maps-directions';
import SocketIOClient from 'socket.io-client';

export default class List extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: this.props.list,
      modalListInfo: false,
      modalGetLocation: false
    };
    this.socket = SocketIOClient('https://serverna.herokuapp.com/', { jsonp: false });
  }
  setModalVisible(modalName, visible) {
    this.setState({ [modalName]: visible });
  }

  acceptList(listId) {
    fetch('https://serverna.herokuapp.com/acceptsList', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        listId: this.state.list._id
      })
    })
    .then(res => res.json())
      .then(data => {
        if (data.message !== false) {
          var message = 'Hi I make event';
          this.socket.emit('acceptList', message);
        }else{
          alert('You have a list that\'s not served yet.')
        }
      })
      .catch(err => {
        throw err;
      });
  }

  handleGetDirections = () => {
    const data = {
      //  source: {
      //   latitude: -33.8356372,
      //   longitude: 18.6947617
      // },
      destination: {
        latitude: this.state.list.location.latitude,
        longitude: this.state.list.location.longitude
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

  render() {
   return (
     <View style={styles.container}>

         <TouchableOpacity
         style={styles.list}
           onPress={() => {
             this.setModalVisible('modalListInfo', !this.state.modalListInfo);
           }}
         >
          <Text style={styles.text}>{this.state.list.storeInfo}</Text>
 </TouchableOpacity>

       <View style={{ marginTop: 22 }}>
         <Modal
           animationType="slide"
           transparent={false}
           visible={this.state.modalListInfo}
           onRequestClose={() => {
             this.setModalVisible('modalListInfo', !this.state.modalListInfo);
           }}>
           <View style={styles.modal}>

               <Text
                 style={styles.val}>
                 <Text style={styles.key}>Items:  </Text>
                 {this.state.list.items}
               </Text>

               <Text
                 style={styles.val}>
                 <Text style={styles.key}>
                   Consumer name:   </Text>
                 {this.state.list.consumerName}
               </Text>

               <Text
                 style={styles.val}>
                 <Text style={styles.key}>
                   Store information:  </Text>
                 {this.state.list.storeInfo}
               </Text>




           </View>

           <TouchableOpacity
           style={styles.touch}
             onPress={this.handleGetDirections}
             title="Get Directions"
           >
           <Text style={styles.text}>Get Directions</Text>
           </TouchableOpacity>

             <TouchableOpacity
             style={styles.Accept}
               onPress={() => {
                 this.acceptList(this.state.list._id);
                 this.setModalVisible(
                   'modalListInfo',
                   !this.state.modalListInfo
                 );
               }}
               title="Accept"
             >
              <Text style={styles.text}>Accept</Text>
             </TouchableOpacity>

             <TouchableOpacity
             style={styles.cancel}
               onPress={() => {
                 this.setModalVisible(
                   'modalListInfo',
                   !this.state.modalListInfo
                 );
               }}
               title="Cancel"
             >
              <Text style={styles.text}>Cancel</Text>
              </TouchableOpacity>
         </Modal>
       </View>
     </View>
   );
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list :{
    marginTop:10,
    marginLeft:30,
    flex: 1,
    backgroundColor : '#6668d0',
    width:300,
    height:60,
    borderRadius:10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listInfoContainer: {
    backgroundColor: '#B5B5B5',
    padding: 5,
    margin: 5
  },
  modal:{
    marginLeft:8,
    width:400,
    height:250,
    marginTop:150,
    borderRadius:10,
    borderWidth:2,
    backgroundColor:'#6668d0',
  },
  val:{
      marginTop:25,
    color:'#26418f',
    fontSize:20,
    fontWeight:'bold',

  },
  key:{
    marginLeft:20,
    marginTop:25,
    color:'white',
    fontSize:20,
    fontWeight:'bold',
  },
  text:{
    color:'white',
    fontSize:20,
    fontWeight:'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn:{
    backgroundColor:'white',
    marginTop:10,
  },
  text:{
    color:'white',
    fontSize:20,
    fontWeight:'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  touch:{
    backgroundColor:"#303f9f",
    width:300,
    height:60,
    marginTop:10,
    borderRadius:10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:50
  },
    Accept:{
      backgroundColor:"green",
      width:120,
      height:60,
      marginTop:10,
      borderRadius:10,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft:280
    },
    cancel:{
      backgroundColor:"red",
      width:120,
      height:60,
      top:-60,
      borderRadius:10,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft:10
      }
});

AppRegistry.registerComponent('List', () => List);
