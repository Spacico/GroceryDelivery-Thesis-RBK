import React from 'react';
import { StyleSheet, Text, View,TextInput, Button,TouchableHighlight, Alert,AppRegistry,TouchableOpacity } from 'react-native';
// import sendNotification from "./components/sendNotification"


 export default class signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      changeFlag: props.changeFlag
    }
  }

  render() {
    return (
      <View  KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Text
              onPress={() => {
                this.state.changeFlag('main');
              }}
            > HELLO IN SIGNUP PAGE </Text>
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
    backgroundColor : "#ccc",
    width : 90 ,
    height : 40,
    justifyContent : "center",
    elevation : 8,
  },
  
});
