import React, { Component } from 'react';
import {
  Modal,
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  AppRegistry,
  Button
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
       <View
         style={{ flexDirection: 'row', height: 80, padding: 20, margin: 5 }}>
         <Button
           title={this.props.list.storeInfo}
           onPress={() => {
             this.setModalVisible('modalListInfo', !this.state.modalListInfo);
           }}
         />
       </View>
       <View style={{ marginTop: 22 }}>
         <Modal
           animationType="slide"
           transparent={false}
           visible={this.state.modalListInfo}
           onRequestClose={() => {
             this.setModalVisible('modalListInfo', !this.state.modalListInfo);
           }}>
           <View style={{ marginTop: 22 }}>
             <View style={styles.listInfoContainer}>
               <Text
                 style={{ fontWeight: 'bold', color: 'green', fontSize: 15 }}>
                 <Text style={{ fontSize: 25, color: 'black' }}>Items:</Text>
                 {this.state.list.items}
               </Text>

               <Text
                 style={{ fontWeight: 'bold', color: 'green', fontSize: 15 }}>
                 <Text style={{ fontSize: 20, color: 'black' }}>
                   Consumer name:
                 </Text>
                 {this.state.list.consumerName}
               </Text>

               <Text
                 style={{ fontWeight: 'bold', color: 'green', fontSize: 15 }}>
                 <Text style={{ fontSize: 20, color: 'black' }}>
                   Store information:
                 </Text>
                 {this.state.list.storeInfo}
               </Text>

               <Button
                 onPress={this.handleGetDirections}
                 title="Get Directions"
               />
               <View style={styles.alternativeLayoutButtonContainer}>
                 <Button
                   onPress={() => {
                     this.acceptList(this.state.list._id);
                     this.setModalVisible(
                       'modalListInfo',
                       !this.state.modalListInfo
                     );
                   }}
                   title="Accept"
                   color="#05CB15 "
                 />
                 <Button
                   onPress={() => {
                     this.setModalVisible(
                       'modalListInfo',
                       !this.state.modalListInfo
                     );
                   }}
                   title="Cancel"
                   color="#ff3333 "
                 />
               </View>
             </View>
           </View>
         </Modal>
       </View>
     </View>
   );
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  listInfoContainer: {
    backgroundColor: '#B5B5B5',
    padding: 5,
    margin: 5
  },
  buttonContainer: {
    margin: 20
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

AppRegistry.registerComponent('List', () => List);
