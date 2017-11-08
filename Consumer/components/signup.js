import React from 'react';
import {
  StatusBar,
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Alert,
  AppRegistry,
  TouchableOpacity
} from 'react-native';
// import sendNotification from "./components/sendNotification"
// import OffCanvas3D from '../offcanvas3d'
import {
  Icon,
  TabBar,
  SearchBar,
  Tabs,
  Tab,
  SideMenu,
  List,
  ListItem
} from 'react-native-elements';
import { Header, Container, Button } from 'native-base';

export default class signup extends React.Component {
  static navigationOptions = {
    title: 'Sign Up',
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
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      address: '',
      password: '',
      phone: ''
    };
    // this.toggleSideMenu = this.toggleSideMenu.bind(this)
  }

  // handleMenu() {
  //   const {menuOpen} = this.state
  //   this.setState({
  //     menuOpen: !menuOpen
  //   })
  // }
  onClickButton(navigate) {
    if (
      this.state.userName !== '' &&
      this.state.password !== '' &&
      this.state.address !== '' &&
      this.state.phone !== ''
    ) {
      fetch('https://serverna.herokuapp.com/consumerSignup', {
        //192.168.1.7
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      })
        .then(response => {
          return response.json();
        })
        .then(responseJson => {
          if (responseJson === true) {
            alert(
              'sucessfuly register !! \n' +
                'thank you for registering\n  login please'
            );
            navigate('Login');
          } else {
            alert(responseJson.message);
          }
        })
        .catch(error => {
          alert(error);
        });
    } else {
      alert('Please make sure that you filled all the fields');
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View KeyboardAvoidingView behavior="padding" style={styles.container}>
        <StatusBar backgroundColor="#336e3e" />

        <Text
          style={{
            marginTop: 80,
            textAlign: 'right',
            fontWeight: 'bold',
            fontSize: 20
          }}>
          Username
        </Text>
        <View style={styles.shadow}>
          <SearchBar
            lightTheme
            onChangeText={val => this.setState({ userName: val })}
            style={styles.input}
            placeholder="username.... "
            noIcon
            required
          />
        </View>
        <Text>{'\n'}</Text>

        <Text style={styles.label}> Address </Text>
        <View style={styles.shadow}>
          <SearchBar
            lightTheme
            onChangeText={val => this.setState({ address: val })}
            style={styles.input}
            placeholder="address....."
            noIcon
            required
          />
        </View>
        <Text>{'\n'}</Text>

        <Text style={styles.label}> Phone </Text>
        <View style={styles.shadow}>
          <SearchBar
            lightTheme
            onChangeText={val => this.setState({ phone: val })}
            style={styles.input}
            placeholder="phone....."
            noIcon
            required
          />
        </View>
        <Text>{'\n'}</Text>

        <Text style={styles.label}> Password </Text>
        <View style={styles.shadow}>
          <SearchBar
            lightTheme
            onChangeText={val => this.setState({ password: val })}
            style={styles.input}
            placeholder="password....."
            noIcon
            required
            secureTextEntry
          />
        </View>
        <Text>{'\n'}</Text>
        <Text>{'\n'}</Text>
        <TouchableHighlight
          style={styles.addButton}
          icon={{ name: 'cached' }}
          onPress={() => {
            this.onClickButton(navigate);
          }}>
          <Text style={styles.btnText}> Sign Up </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10
    // justifyContent: 'center'
  },
  shadow: {
    shadowColor: '#111',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10
  },
  addButton: {
    width: 300,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#519657',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#222'
  },
  input: {
    width: 300,
    height: 45,
    borderRadius: 10,
    backgroundColor: '#f5f5f5'
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  logo: {
    width: 200,
    height: 100
  },
  title: {
    color: '#FFF',
    marginTop: 10,
    textAlign: 'center',
    opacity: 0.5
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700'
  },
  login: {
    width: 300,
    height: 40,
    backgroundColor: '#8C0000',
    //  // color:"#FFFFFF",
    alignItems: 'center',
    justifyContent: 'center'
    // fontWeight : "700"
  },
  signup: {
    width: 300,
    height: 40,
    backgroundColor: '#DF5900',
    //  // color:"#FFFFFF",
    alignItems: 'center',
    justifyContent: 'center'
    // fontWeight : "700"
  },
  text: {
    textAlign: 'left',
    // color : "#CF0063",
    fontWeight: 'bold',
    fontSize: 20
    // opacity:.02
  },
  label: {
    textAlign: 'right',
    // color : "#CF0063",
    fontWeight: 'bold',
    fontSize: 20
    // opacity:.02
  },
  tabs: {
    flex: 1,
    width: 500,
    height: 30
  }
});
