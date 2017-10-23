import React, { Component } from 'react';
import {
    View,
    Text,
    AppRegistry,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

export default class Getlists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changeFlag: this.props.changeFlag
        };
    }

    render() {
        return (
            <View>
                <View>
                    <Text> get lists page</Text>
                </View>
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
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#F5FCFF'
    },
    content: {
        alignItems: 'center'
        // fontSize: 20,
        // textAlign: 'center',
        // margin: 10
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
