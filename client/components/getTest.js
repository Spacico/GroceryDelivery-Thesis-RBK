import React from 'react';
import { Image,View,StyleSheet,TouchableHighlight,Text,TextInput} from 'react-native';
import SendNotification from './sendNotification'
import List from './list'


export default class login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            changeFlag: props.changeFlag,
            list : {} 
                  };
    }

    //http:192.168.1.2:1128/consumerLogin //osama


    onClickBack(){
        this.state.changeFlag('main');

    }

   

    async onClickget() {
            try {
                let response = await fetch('http:192.168.8.124:1128/getNotification');
                let responseJson = await response;
                alert(responseJson)
                 this.setState({list:responseJson})
            } 

            catch(error) {
                console.error(error);
            }

      
   //    fetch('http:192.168.2.20:1128/checkAvailableLists', {//192.168.1.7
   //          method: 'GET',
   //          headers: {
   //              'Accept': 'application/json',
   //              'Content-Type': 'application/json',
   //          },          
   //      }).then ((res) => {
   //          this.setState({list:res})
   //           alert()
              
   //           })
   //          .catch(()=>{ 
   //      // this.state.changeFlag('main');
   // });

      //       fetch('http:192.168.2.20:1128/checkAvailableLists')
      // .then((response) => response.json())
      // .then((responseJson) => {
      //   this.setState({list: responseJson})
      //   alert(this.state.list)
      // })
      // .catch((error) => {
      //   console.error(error);
      // });
}

    render() {
        return (
            <View style={styles.container}>
                

                    <TouchableHighlight
                    onPress={
                        this.onClickget.bind(this)
                    }
                > 
                    <Text
                    >get</Text>
                </TouchableHighlight>


                    <TouchableHighlight
                    onPress={
                        this.onClickBack.bind(this)
                    }
                > 
                    <Text
                    >Back</Text>
                </TouchableHighlight>
        
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498db',
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
        width: 200,
        height : 40,
        marginBottom : 20,
        color : "#FFF",
        paddingHorizontal : 10
    },
    logoContainer :{
        alignItems : 'center',
        flexGrow : 1,
        justifyContent : 'center'
    },
    logo : {
        width: 200,
        height:100
    },
    title: {
        color : '#FFF',
        marginTop:10,
        textAlign:'center',
        opacity:.5
    },
    buttonText :{
    textAlign:'center',
    color : "#FFFFFF",
    fontWeight : "700",
    opacity:.02
}
});


