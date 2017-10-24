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
            lists: ''
        };
    }
    //fetch active lists from database
    gitlistsfunc() {
        return fetch('http://192.168.2.20:1128/checkAvailableLists')
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
                        <List list={list} />

                        //  <View>
                        //  <Text list={list} key={index}>{list.items}</Text>
                        //  <Text list={list} key={index}>{list.consumerName}</Text>
                        //  <Text list={list} key={index}>{list.storeInfo}</Text>

                        // </View>
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
AppRegistry.registerComponent('Getlists', () => Getlists);
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
