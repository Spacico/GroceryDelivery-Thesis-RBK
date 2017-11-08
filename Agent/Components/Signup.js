import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    AppRegistry
} from 'react-native';

export default class Signup extends Component {
  static navigationOptions = {
    title: 'Sign Up',
    headerTitleStyle: {
     fontWeight: 'bold',
     fontSize: 25,
     color: 'black'
   },
   headerStyle: {
     backgroundColor: '#6668d0'
   },
   headerTintColor: {
    backgroundColor: 'black'
   }
  };
    constructor(props) {
        super(props);
        this.state = {
            changeFlag: this.props.changeFlag,
            agentName: '',
            password: '',
            address: '',
            phone: '',
            birthDate: '',
            firstName: '',
            lastName: ''
        };
    }
    onClickSignup(navigate) {
        fetch('https://serverna.herokuapp.com/agentSignup', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then(res => {
                console.log('hi');
            })
            .catch(err => {
                throw err;
            });
        navigate('Login')
    }

    render() {
      const { navigate } = this.props.navigation;
        return (
            <View KeyboardAvoidingView style={styles.content}>
                <View style={styles.inputContainer}>
                    <TextInput
                        onChangeText={val => {
                            this.setState({ agentName: val });
                        }}
                        style={styles.input}
                        placeholder="agentName"
                        placeholderTextColor="gray"
                    />

                    <TextInput
                        onChangeText={val => {
                            this.setState({ password: val });
                        }}
                        style={styles.input}
                        placeholder="password"
                    />

                    <TextInput
                        onChangeText={val => {
                            this.setState({ address: val });
                        }}
                        style={styles.input}
                        placeholder="agentAddress"
                    />

                    <TextInput
                        onChangeText={val => {
                            this.setState({ phon: val });
                        }}
                        style={styles.input}
                        placeholder="agentPhon"
                    />

                    <TextInput
                        onChangeText={val => {
                            this.setState({ birthDate: val });
                        }}
                        style={styles.input}
                        placeholder="birthDate"
                    />

                    <TextInput
                        onChangeText={val => {
                            this.setState({ firstName: val });
                        }}
                        style={styles.input}
                        placeholder="firstName"
                    />

                    <TextInput
                        onChangeText={val => {
                            this.setState({ lastName: val });
                        }}
                        style={styles.input}
                        placeholder="lastName"
                    />

                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={() => {
                            this.onClickSignup(navigate);
                        }}
                        underlayColor="red"
                    >
                        <View
                            style={{
                                backgroundColor: 'skyblue',
                                height: 50
                            }}
                        >
                            <Text style={styles.buttonText}>SignUp</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
AppRegistry.registerComponent('Signup', () => Signup);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        alignItems: 'center'
        // fontSize: 20,
        // textAlign: 'center',
        // margin: 10
    },
    addButton: {
        backgroundColor: '#ccc',
        width: 90,
        height: 40,
        justifyContent: 'center',
        elevation: 8
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
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        alignItems: 'center'
    }
});
