import React, { Component } from 'react';
import {
  Modal,
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  AppRegistry,
  Button,
  TouchableOpacity,
  Dimensions
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
                  {'  ' + this.state.list.items}
                </Text>

                <Text
                  style={styles.val}>
                  <Text style={styles.key}>
                    Consumer name:
                  </Text>
                  {'  ' + this.state.list.consumerName}
                </Text>

                <Text
                  style={styles.val}>
                  <Text style={styles.key}>
                    Store information:
                  </Text>
                  {'  ' + this.state.list.storeInfo}
                </Text>
                </View>
          </Modal>
        </View>
      </View>
    );
  }
}

const {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  list :{
    marginTop:10,
    flex: 1,
    justifyContent: 'center',
    backgroundColor : '#6668d0',
    width:width * 0.7,
    height:height * 0.1,
    borderRadius:10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text:{
    color:'white',
    fontSize:22,
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
    fontSize:20,
    fontWeight:'bold',
  },
  modal:{
    width: width * 0.9,
    height: height * 0.3,
    marginTop:25,
    margin:20,
    padding: 5,
    borderRadius:15,
    backgroundColor:'#6668d0',
  }
});

AppRegistry.registerComponent('List', () => List);
