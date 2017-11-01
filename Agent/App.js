import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    AppRegistry
} from 'react-native';
import { SideMenu, List, ListItem } from 'react-native-elements'
import Signup from './Components/Signup';
import Login from './Components/Login';
import Getlists from './Components/getlists';
// import Profile from './Components/myProfile';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            flag: 'main',
            isOpen: false
            // latitude: 0.0,
            // longitude: 0.0,
            // error: null
        };
        this.toggleSideMenu = this.toggleSideMenu.bind(this)
    }

    onSideMenuChange (isOpen: boolean) {
      this.setState({
        isOpen: isOpen
      })
    }
    toggleSideMenu () {
      this.setState({
        isOpen: !this.state.isOpen
      })
    }

    changeFlag(sth) {
        this.setState({ flag: sth });
    }
    //
    // changeLocation(obj){
    //     this.setState({
    //         latitude: obj.latitude,
    //         longitude: obj.longitude
    //     })
    // }
    // getLocation () {
    //   return {latitude: this.state.latitude, longitude: this.state.longitude}
    // }
    // componentDidMount() {
    //     navigator.geolocation.getCurrentPosition(
    //       (position) => {
    //         alert(position.coords.latitude)
    //         this.setState({
    //           latitude: position.coords.latitude,
    //           longitude: position.coords.longitude,
    //           error: null,
    //         });
    //       },
    //       (error) => this.setState({ error: error.message }),
    //       { enableHighAccuracy: true, timeout: 200}
    //     );
    //     alert (this.state.latitude)
    //   }
    render() {
      // SideMenu
      const MenuComponent = (
        <View style={{flex: 1, backgroundColor: '#ededed', paddingTop: 50}}>
          <List containerStyle={{marginBottom: 20}}>
          {
            list.map((l, i) => (
              <ListItem
                roundAvatar
                onPress={() => console.log('Pressed')}
                avatar={l.avatar_url}
                key={i}
                title={l.name}
                subtitle={l.subtitle}
              />
            ))
          }
          </List>
        </View>
      )

        if (this.state.flag === 'main') {
            return (
              <View>
              <SideMenu
                isOpen={this.state.isOpen}
                onChange={this.onSideMenuChange.bind(this)}
                menu={MenuComponent}>
                <App toggleSideMenu={this.toggleSideMenu.bind(this)} />
              </SideMenu>
                <View style={styles.container}>
                <Profile />

                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={() => {
                                this.changeFlag('signup');
                            }}
                        >
                            <Text style={styles.buttonText}>SIGNUP</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={() => {
                                this.changeFlag('login');
                            }}
                        >
                            <Text style={styles.buttonText}>LOGIN</Text>
                        </TouchableOpacity>
                        <View />
                    </View>
                </View>
            );
        } else if (this.state.flag === 'login') {
            return (
              <View>
              <SideMenu
                isOpen={this.state.isOpen}
                onChange={this.onSideMenuChange.bind(this)}
                menu={MenuComponent}>
                <App toggleSideMenu={this.toggleSideMenu.bind(this)} />
              </SideMenu>
              <Login changeFlag={this.changeFlag.bind(this)} />;
              </View>
            )
        } else if (this.state.flag === 'signup') {
            return (
              <View>
              <SideMenu
                isOpen={this.state.isOpen}
                onChange={this.onSideMenuChange.bind(this)}
                menu={MenuComponent}>
                <App toggleSideMenu={this.toggleSideMenu.bind(this)} />
              </SideMenu>
              <Signup changeFlag={this.changeFlag.bind(this)} />;
              </View>
          )
        } else if (this.state.flag === 'getLists') {
            return (
              <View>
              <SideMenu
                isOpen={this.state.isOpen}
                onChange={this.onSideMenuChange.bind(this)}
                menu={MenuComponent}>
                <App toggleSideMenu={this.toggleSideMenu.bind(this)} />
              </SideMenu>
              <Getlists changeFlag={this.changeFlag.bind(this)} />;
              // getLocation={this.getLocation.bind(this)} changeLocation={this.changeLocation.bind(this)}
              </View>
            )
        }
    }
}
AppRegistry.registerComponent('App', () => App);
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
    }
});
