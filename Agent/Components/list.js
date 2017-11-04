import React, { Component } from 'react';
import {Modal, StyleSheet, TouchableHighlight, View, Text, AppRegistry, Button } from 'react-native';
import Mapo from './mapView';
export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: this.props.list,
            modalListInfo: false,
            modalGetLocation: false
        };
    }
    setModalVisible(modalName, visible) {
      this.setState({[modalName]: visible});
    }

    acceptList (listId) {
      fetch('http:192.168.1.4:5000/acceptsList', {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            listId: this.state.list._id
          })
      })
          .then(res => {
              alert ('list accepted successfully')
          })
          .catch(err => {
            alert(err)
              throw err;
          });

      alert(`List of id ${listId} has been accepted`)
    }

    render() {
        return (
          <View style={styles.container}>
            <View style={{flexDirection: 'row', height: 80, padding: 20, margin: 5}}>
              <Button
                  title={this.props.list.storeInfo}
                  onPress={() => {
                    this.setModalVisible('modalListInfo', !this.state.modalListInfo)
                  }}
              />
            </View>
            <View style={{marginTop: 22}}>
              <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalListInfo}
                onRequestClose={() => {this.setModalVisible('modalListInfo', !this.state.modalListInfo)}}
                >
               <View style={{marginTop: 22}}>
                <View style={styles.listInfoContainer}>
                  <Text style={{fontWeight: 'bold', color:'green', fontSize: 15}}>
                    <Text style={{fontSize: 25, color:'black'}} >
                      Items:
                    </Text>
                      {this.state.list.items}
                    </Text>

                  <Text style={{fontWeight: 'bold', color:'green', fontSize: 15}}>
                    <Text style={{fontSize: 20, color:'black'}} >
                      Consumer name:
                    </Text>
                    {this.state.list.consumerName}
                  </Text>

                  <Text style={{fontWeight: 'bold', color:'green', fontSize: 15}}>
                    <Text style={{fontSize: 20, color:'black'}} >
                      Store information:
                    </Text>
                    {this.state.list.storeInfo}
                  </Text>
                  <Button
                    onPress={() => {
                      this.setModalVisible('modalGetLocation', !this.state.modalGetLocation);
                    }}
                    title="Get Location"
                  />
                  <View style={styles.alternativeLayoutButtonContainer}>
                    <Button
                      onPress={() => {
                        this.acceptList(this.state.list._id);
                        this.setModalVisible('modalListInfo', !this.state.modalListInfo)
                      }}
                      title="Accept"
                      color="#05CB15"
                    />
                    <Button
                      onPress={() => {this.setModalVisible('modalListInfo', !this.state.modalListInfo)}}
                      title="Cancel"
                      color="#ff3333"
                    />
                  </View>

                </View>
               </View>
              </Modal>
              <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalGetLocation}
                onRequestClose={() => {this.setModalVisible('modalGetLocation', !this.state.modalGetLocation)}}
                >
                <View>
                  <Mapo listLocation={this.state.list.location}/>
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
})

AppRegistry.registerComponent('List', () => List);
