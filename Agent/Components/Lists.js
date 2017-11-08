import React, { Component } from 'react';
import {
  Modal,
  View,
  Text,
  AppRegistry,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button
} from 'react-native';
//import List component from it's file
import List from './list';
//export class Getlistis
export default class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeFlag: this.props.changeFlag,
      lists: '',
      getCurrentList: this.props.getCurrentList,
      setCurrentList: this.props.setCurrentList,
      historyLists: this.props.getHistoryLists(),
      addListToHistory: this.props.addListToHistory,
      clickedValue: '',
      modalCurrentList: false,
      modalHistoryLists: false
    };
  }

  // Modal manager
  setModalVisible(modalName, visible) {
    this.setState({ [modalName]: visible });
  }

  // Get agent History from route /history/lists
  getHistoryLists() {
    return fetch('https://serverna.herokuapp.com/history/lists')
      .then(response => response.json())
      .then(data => {
        this.setState({ historyLists: data });
      })
      .catch(err => {
        alert(err);
        throw err;
      });
  }
}
