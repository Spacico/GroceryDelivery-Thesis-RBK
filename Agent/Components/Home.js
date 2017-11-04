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
import getDirections from 'react-native-google-maps-directions';

//import List component from it's file
// import List from './list';
import Lists from './Lists';
//export class Getlistis
export default class Home extends Component {
  static navigationOptions = {
    title: 'Home'
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
      <View style={styles.listInfoContainer}>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigate('AvailableLists');
            }}>
            <Text style={styles.buttonText}>Available lists</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => {
              navigate('CurrentList', { currentList: this.state.currentList });
            }}>
            <Text style={styles.buttonText}>Current list</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => {
              navigate('History');
            }}>
            <Text style={styles.buttonText}>History</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            style={{ marginTop: 400 }}
            onPress={() => {
              this.state.changeFlag('main');
            }}>
            <Text style={styles.buttonText}>LOGOUT</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
AppRegistry.registerComponent('Home', () => Home);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray'
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
    fontSize: 16,
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
  }
});
