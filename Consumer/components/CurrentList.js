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

export default class CurrentList extends Component {
  constructor() {
    super();
    this.state = {
      currentList: ''
    };
  }
  static navigationOptions = {
    title: 'Current List',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 25,
      color: '#333'
    },
    headerStyle: {
      backgroundColor: '#81c784'
    },
    headerTintColor: {
      /*  */
    }
  };

  finishList(_id, navigate) {
    fetch('https://serverna.herokuapp.com/consumer/current/list/done', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        listId: _id
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data === true) {
          navigate('CurrentList');
        } else {
          alert(data.message);
        }
      })
      .catch(err => {
        throw err;
      });
  }
  getCurrentList() {
    return fetch('https://serverna.herokuapp.com/consumer/current/list')
      .then(response => response.json())
      .then(data => {
        if (data.message === false) {
          this.setState({ currentList: '' });
        } else {
          this.setState({ currentList: data });
        }
      })
      .catch(err => {
        throw err;
      });
  }
  componentWillMount() {
    this.getCurrentList();
  }
  renderCurrentList() {
    const { navigate } = this.props.navigation;

    if (this.state.currentList !== '') {
      return (
        <View style={{ marginTop: 22 }}>
          <View style={styles.listInfoContainer}>
            <Text
              style={{ fontWeight: 'bold', color: '#003300', fontSize: 20 }}>
              <Text style={{ fontSize: 21, color: '#555' }}>Items:</Text>
              {'  ' + this.state.currentList.items + '\n'}
            </Text>

            <Text
              style={{ fontWeight: 'bold', color: '#003300', fontSize: 20 }}>
              <Text style={{ fontSize: 20, color: '#555' }}>Agent name:</Text>
              {'  ' + this.state.currentList.agentName + '\n'}
            </Text>

            <Text
              style={{ fontWeight: 'bold', color: '#003300', fontSize: 20 }}>
              <Text style={{ fontSize: 20, color: '#555' }}>
                Store information:
              </Text>
              {'  ' + this.state.currentList.storeInfo + '\n'}
            </Text>

            <Text
              style={{ fontWeight: 'bold', color: '#003300', fontSize: 20 }}>
              <Text style={{ fontSize: 20, color: '#555' }}>Budget:</Text>
              {'  ' + this.state.currentList.budget + '\n'}
            </Text>
          </View>
          <View style={{ padding: 25 }}>
            <TouchableHighlight
              style={styles.addButton}
              onPress={() => {
                this.finishList(this.state.currentList._id, navigate);
              }}>
              <Text style={styles.btnText}>Done</Text>
            </TouchableHighlight>
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
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    // justifyContent: 'center',
    alignItems: 'center'
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
    backgroundColor: '#81c784',
    width: width * 0.9,
    height: 200,
    padding: 10,
    margin: 2,
    borderRadius: 10
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
  },
  addButton: {
    width: width * 0.7,
    height: height * 0.1,
    borderRadius: 10,
    backgroundColor: '#519657',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#222'
  }
});
