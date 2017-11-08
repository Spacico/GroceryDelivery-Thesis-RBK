import React, { Component } from 'react';
import {
    View,
    Text,
    AppRegistry,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native';
//import List component from it's file
import List from './list';
//export class Getlistis
export default class Getlists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changeFlag: this.props.changeFlag,
            lists: '',
            fakeData: [
              {
                "consumerName": "Shahd",
                "items": "Potato 1kg, Orange 2.5kg, Eggs 1-board",
                "storeInfo": "Tareq mall, Tabarbuor",
                "location": {
                  "latitude": 31.0221525,
                  "longitude": 37.522748
                }
              },
              {
                "consumerName": 'Hussen',
                "items": 'Potato 1kg, Orange 2.5kg, Eggs 1-board',
                "storeInfo": 'Sameh mall, Tabarbuor',
                "location": {
                  "latitude": 31.0221525,
                  "longitude": 36.522748
                }
              },
              {
                "consumerName": 'Hamshari',
                "items": 'Ships Lase 1jd, Orange 2.5kg, Eggs 1-board',
                "storeInfo": 'Mecca mall, Mecca st.',
                "location": {
                  "latitude": 30.0221525,
                  "longitude": 32.522748
                }
              },
              {
                "consumerName": 'Tahseen',
                "items": 'Potato 1kg, Orange 2.5kg, Eggs 1-board',
                "storeInfo": 'Yasser mall, Jandawil',
                "location": {
                  "latitude": 39.0221525,
                  "longitude": 37.522748
                }
              }
            ]
        };
    }
    //fetch active lists from database
    gitlistsfunc() {
        return fetch('https://serverna.herokuapp.com/checkAvailableLists')
            .then(response => response.json())
            .then(data => {
                this.setState({ lists: data });
            })
            .catch(err => {
                throw err;
            });
    }
    //function for sepersting the objects into components 'List componenet'
    run() {
        if (this.state.lists.length) {
            return (
                <View>
                    {this.state.lists.map((list, index) => (
                        <List list={list} key={index}/>
                    ))}
                </View>
            );
        }
    }

    render() {
        return (
            <View>
                <View>
                    <TouchableOpacity onPress={this.gitlistsfunc.bind(this)}>
                        <Text style={styles.buttonText}>GETLIST</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>{this.run()}</ScrollView>

                <View>
                    <TouchableOpacity
                        style={{}}
                        onPress={() => {
                            this.state.changeFlag('main');
                        }}
                    >
                        <Text style={styles.buttonText}>LOGOUT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            alignSelf: 'stretch',
                            padding: 5,
                            margin: 5
                        }}
                        onPress={() => {
                            this.state.changeFlag('main');
                        }}
                    >
                        <Text style={styles.buttonText}>BACK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
// AppRegistry.registerComponent('Getlists', () => Getlists);
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
