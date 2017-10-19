import React from 'react';
import { View,StyleSheet,TouchableHighlight,Text,TextInput} from 'react-native';
import SendNotification from './sendNotification'


export default class login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            changeFlag: props.changeFlag,
            userName : '',
            password : ''
        };
    }

    onClickButton(){
        fetch('http:192.168.2.57:1128/login', {//192.168.1.7
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                this.state    
            )
        }).then (() => {})
            .catch(()=>{
                
            }); 

        this.state.changeFlag('sendNotification');
    }


    render() {
        return (
            <View style={styles.container}>
                <TextInput 
                    onChangeText = {(val) => this.setState({userName : val})}
                    style = {styles.input} placeholder = 'userName'
                />

                <TextInput 
                    onChangeText = {(val) => this.setState({password : val})}
                    style = {styles.input} placeholder = 'password'
                />


                <TouchableHighlight
                    onPress={
                        this.onClickButton.bind(this)
                    }
                > 
                    <Text>LOG IN</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButton: {
        backgroundColor : '#ccc',
        width : 90 ,
        height : 40,
        justifyContent : 'center',
        elevation : 8,
    },
    input: {
        width : 200 ,
        height : 40,
    }
});


