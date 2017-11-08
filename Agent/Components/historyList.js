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

export default class HistoryList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: this.props.list,
      modalListInfo: false,
    };
    this.socket = SocketIOClient('https://serverna.herokuapp.com/', { jsonp: false });
  }
  setModalVisible(modalName, visible) {
    this.setState({ [modalName]: visible });
  }
// {this.props.list.storeInfo}
  render() {
    return (
      <View style={styles.container}>

          <TouchableOpacity
          style={styles.list}
            onPress={() => {
              this.setModalVisible('modalListInfo', !this.state.modalListInfo);
            }}
          >
          <Text style={styles.text}>
          {this.state.list.storeInfo}
        </Text>
</TouchableOpacity >


        <View style={{ marginTop: 22 }}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalListInfo}
            onRequestClose={() => {
              this.setModalVisible('modalListInfo', !this.state.modalListInfo);
            }}>
            <View style={styles.modal} >
                <Text
                  style={styles.val}>
                  <Text style={styles.key}>Items:</Text>
                  {this.state.list.items}
                </Text>

                <Text
                  style={styles.val}>
                  <Text style={styles.key}>
                    Consumer name:
                  </Text>
                  {this.state.list.consumerName}
                </Text>

                <Text
                  style={styles.val}>
                  <Text style={styles.key}>
                    Store information:
                  </Text>
                  {this.state.list.storeInfo}
                </Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  // listInfoContainer: {
  //   backgroundColor: '#B5B5B5',
  //   padding: 5,
  //   margin: 5
  // },
  // buttonContainer: {
  //   margin: 20
  // },
  // alternativeLayoutButtonContainer: {
  //   margin: 20,
  //   flexDirection: 'row',
  //   justifyContent: 'space-between'
  // },
  list :{
    marginTop:10,
    flex: 1,
    justifyContent: 'center',
    backgroundColor : '#6668d0',
    width:300,
    height:60,
    borderRadius:10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text:{
    color:'white',
    fontSize:20,
    fontWeight:'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  val:{
      marginTop:25,
    color:'#26418f',
    fontSize:20,
    fontWeight:'bold',

  },
  key:{
    marginTop:25,
    color:'white',
    fontSize:25,
    fontWeight:'bold',
  },
  modal:{
    marginLeft:8,
    width:400,
    height:250,
    marginTop:150,
    borderRadius:10,
    borderWidth:2,
    backgroundColor:'#6668d0',
  }
});

AppRegistry.registerComponent('List', () => List);
