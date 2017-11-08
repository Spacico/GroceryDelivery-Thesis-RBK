import React, { Component } from 'react';
import {
  Modal,
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  AppRegistry,
  Button,
  Dimensions
} from 'react-native';
//import Mapo from './mapView';
import SocketIOClient from 'socket.io-client';

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: this.props.list,
      modalListInfo: false,
      modalGetLocation: false
      // getLocation: this.props.getLocation,
      // changeLocation: this.props.changeLocation
    };
    this.socket = SocketIOClient('https://serverna.herokuapp.com/', {
      jsonp: false
    });
  }
  setModalVisible(modalName, visible) {
    this.setState({ [modalName]: visible });
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{ flexDirection: 'row', height: 80, padding: 20, margin: 5 }}>
          <TouchableHighlight
            style={styles.addButton}
            onPress={() => {
              this.setModalVisible('modalListInfo', !this.state.modalListInfo);
            }}>
            <Text style={styles.btnText}>{this.props.list.storeInfo}</Text>
          </TouchableHighlight>
        </View>
        <View style={{ marginTop: 15 }}>
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
                  style={{
                    fontWeight: 'bold',
                    color: '#003300',
                    fontSize: 20
                  }}>
                  <Text style={{ fontSize: 21, color: '#555' }}>Items:</Text>
                  {'  ' + this.state.list.items + '\n'}
                </Text>

                <Text
                  style={{
                    fontWeight: 'bold',
                    color: '#003300',
                    fontSize: 20
                  }}>
                  <Text style={{ fontSize: 20, color: '#555' }}>
                    Agent name:
                  </Text>
                  {'  ' + this.state.list.agentName + '\n'}
                </Text>

                <Text
                  style={{
                    fontWeight: 'bold',
                    color: '#003300',
                    fontSize: 20
                  }}>
                  <Text style={{ fontSize: 20, color: '#555' }}>
                    Store information:
                  </Text>
                  {'  ' + this.state.list.storeInfo + '\n'}
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: '#003300',
                    fontSize: 20
                  }}>
                  <Text style={{ fontSize: 20, color: '#555' }}>Budget:</Text>
                  {'  ' + this.state.list.budget + '\n'}
                </Text>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listInfoContainer: {
    backgroundColor: '#81c784',
    width: width * 0.9,
    height: 200,
    padding: 10,
    justifyContent: 'center',
    margin: 15,
    borderRadius: 10
  },
  buttonContainer: {
    margin: 20
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  addButton: {
    width: width * 0.9,
    height: height * 0.08,
    borderRadius: 10,
    backgroundColor: '#519657',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 25
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#222'
  }
});

AppRegistry.registerComponent('List', () => List);
