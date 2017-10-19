import React from 'react';
import { View,StyleSheet,TouchableHighlight,Text,TextInput} from 'react-native';
// import Login from './components/login'


export default class sendNotification extends React.Component {
    constructor (props){
        super(props);

        this.state = {
            changeFlag: props.changeFlag,
            consumerName:'',
            Budget:'',
            storeInfo :'',
            items : ''
        };
    }
    //http:192.168.1.12:1128/sendNotification 'osama'
    //http:192.168.1.7:8000/send' 'Doaa'

    onClickButton(){
        fetch('http:192.168.2.57:1128/sendNotification', {//192.168.1.7
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
        this.state.changeFlag('main');
    }

    render() {
        return (
            <View  KeyboardAvoidingView behavior='padding' style={styles.container}>
                <TextInput 
                    onChangeText = {(val) => this.setState({consumerName : val})}
                    style = {styles.input} placeholder = 'consumerName'
                />

                <TextInput 
                    onChangeText = {(val) => this.setState({Budget : val})}
                    style = {styles.input} placeholder = 'Budget' SecureTextEntry
                />

                <TextInput 
                    onChangeText = {(val) => this.setState({storeInfo : val})}
                    style = {styles.input} placeholder = 'storeInfo'
                />

                <TextInput 
                    onChangeText = {(val) => this.setState({items : val})}
                    style = {styles.input} placeholder = 'items'
                />
                <TouchableHighlight 
                    style = {styles.addButton}
                    onPress = {
                        this.onClickButton.bind(this)
                    }
                >
                    <Text>Send List</Text>
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
