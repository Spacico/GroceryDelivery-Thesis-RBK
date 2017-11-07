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
  AppRegistry
} from 'react-native';
import getDirections from 'react-native-google-maps-directions';

export default class CurrentList extends Component {
  static navigationOptions = {
    title: 'Current List'
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
        <View style={{ marginTop: 22 }}>
          <View style={styles.listInfoContainer}>
            <Text style={{ fontWeight: 'bold', color: 'green', fontSize: 15 }}>
              <Text style={{ fontSize: 25, color: 'black' }}>Items:</Text>
              {this.state.currentList.items}
            </Text>

            <Text style={{ fontWeight: 'bold', color: 'green', fontSize: 15 }}>
              <Text style={{ fontSize: 20, color: 'black' }}>
                Consumer name:
              </Text>
              {this.state.currentList.consumerName}
            </Text>

            <Text style={{ fontWeight: 'bold', color: 'green', fontSize: 15 }}>
              <Text style={{ fontSize: 20, color: 'black' }}>
                Store information:
              </Text>
              {this.state.currentList.storeInfo}
            </Text>

            <Button onPress={this.handleGetDirections} title="Get Directions" />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.content}>
          <Text style={{ fontSize: 18 }}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#999'
  },
  content: {
    alignItems: 'center',
    alignSelf: 'center'
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
