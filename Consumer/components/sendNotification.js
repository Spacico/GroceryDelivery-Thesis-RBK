import React from 'react';
import {StatusBar,Image, StyleSheet, Text, View,TextInput,TouchableHighlight, Alert,AppRegistry,TouchableOpacity } from 'react-native';
// import sendNotification from "./components/sendNotification"
import {TabBar,SearchBar,Tabs, Tab, Icon,SideMenu, List, ListItem } from 'react-native-elements'
import {Header,Container, Button } from 'native-base';
// import Login from './components/login'
import MapView from 'react-native-maps';
import SocketIOClient from 'socket.io-client';
export default class sendNotification extends React.Component {
    constructor (props){
        super(props);
        this.socket = SocketIOClient('http://192.168.1.4:1128',{jsonp:false});
        this.state = {
            changeFlag: props.changeFlag,
            consumerName:'',
            Budget:'',
            storeInfo :'',
            items : '',
            latitude: props.latitude,
            longitude: props.longitude,
            changeLocation: props.changeLocation,
            getLocation: props.getLocation

        }; 

    }
    //http:192.168.1.12:1128/sendNotification 'osama'
    //http:192.168.1.7:8000/send' 'Doaa'


    onClickButton(){
      // var message = " plah polah aijaja"
      // this.socket.emit('sendList',message)
        fetch('http:192.168.2.9:1128/sendNotification', {//192.168.1.7
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                this.state
            )
        })
       .then((response) => {
        // alert(responseJson.message)
         var message = "Hi I make event";
         this.socket.emit('sendList',message)
           return response.json()

       })
       .then((responseJson) => {
         
           // return responseJson;
//            if(responseJson){
           alert('your list sucessfuly sent !! \n' + "wait for response .....")
// }
// else {
//     alert("Please try again !!!")
// }
       })
       .catch((error) => {
            // reject(error);
            alert("Error !!!  Please try again   " + error)
       });
     }
    loc() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // alert("Lat: " + position.coords.latitude + "\nLon: " + position.coords.longitude);
        this.state.changeLocation({latitude:position.coords.latitude, longitude: position.coords.longitude})
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 200}
    );
  }

// _onRefresh(){
//         alert("current Location  detected <> ");


    render() {
        return (
            <View  KeyboardAvoidingView behavior='padding' style={styles.container}>

<Image style={styles.container}
            source = {require('../images/main.jpg')}
            >

            <StatusBar
            backgroundColor ="#66023c"
            />


 <Text  style= {{ marginTop: 100,  textAlign:'right',fontWeight: 'bold',fontSize: 20 }}  > </Text>
 <SearchBar 
                lightTheme
                    onChangeText = {(val) => this.setState({consumerName : val})}
                    style = {styles.input} placeholder = 'Name.....'
                    value = {this.state.consumerName }
                    noIcon 
                />
                <Text>{'\n'}</Text>


<SearchBar 
                lightTheme
                    onChangeText = {(val) => this.setState({Budget : val})}
                    style = {styles.input} placeholder = 'Budget.....'
                    value = {this.state.Budget }
                    noIcon
                />
                <Text>{'\n'}</Text>

<SearchBar 
                lightTheme
                    onChangeText = {(val) => this.setState({storeInfo : val})}
                    style = {styles.input} placeholder = 'Store Info.....'
                    value = {this.state.storeInfo }
                    noIcon 
                />
                <Text>{'\n'}</Text>


<SearchBar 
                lightTheme
                    onChangeText = {(val) => this.setState({items : val})}
                    style = {styles.items} placeholder = 'Items.....'
                    noIcon 
                    value = {this.state.items }
                    multiline = {true}
                />
                <Text>{'\n'}</Text>
               

                           <Icon
  reverse
  name='md-locate'
  type='ionicon'
  color='#517fa4'
  onPress = {()=> {
                        this.state.changeFlag('mapview');
                    }}
  style = {styles.location }
/>






                <Text>{'\n'}</Text>


<TouchableHighlight
               style = {styles.sendlist }
                icon={{name: 'cached'}}
                   onPress = {
                        this.onClickButton.bind(this)
                    }>
                    <Text style= {styles.text} > Send List </Text>
                </TouchableHighlight> 


                <Text>{'\n'}</Text>

                   <Tabs style={styles.tabs} >

  <Tab
    titleStyle={{fontWeight: 'bold', fontSize: 10 }}
    renderIcon={() => <Icon containerStyle={{ justifyContent: 'center', alignItems: 'center'}} color={'#000000'} name='home' size={40} />}
    renderSelectedIcon={() => <Icon  color={'#000000'} name='home' size={50} />}
   onPress={()=>{this.state.changeFlag('main')}}
   >
  </Tab>
  <Tab
    titleStyle={{fontWeight: 'bold', fontSize: 10}}
    // selectedTitleStyle={{marginTop: -1, marginBottom: 6}}
    // selected={selectedTab === 'profile'}
    // title={selectedTab === 'profile' ? 'PROFILE' : null}
    renderIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center'}} color={'#000000'} name='person' size={40} />}
    renderSelectedIcon={() => <Icon color={'#000000'} name='person' size={50} />}
    onPress={()=>{this.state.changeFlag('login')}}
    >
  </Tab>
    <Tab
    titleStyle={{fontWeight: 'bold', fontSize: 10}}
    // selectedTitleStyle={{marginTop: -1, marginBottom: 6}}
    // selected={selectedTab === 'profile'}
    // title={selectedTab === 'profile' ? 'PROFILE' : null}
    renderIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center'}} color={'#000000'} name='vpn-key' size={40} />}
    renderSelectedIcon={() => <Icon color={'#000000'} name='vpn-key' size={50} />}
    onPress={()=>{this.state.changeFlag('signup')}}
    >
  </Tab>
 
</Tabs>


</Image>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#B865AB',
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
        width : 300 ,
        height : 40,
    },
    items: {
        width : 300 ,
        height : 100,
    },
    signup:{
     width: 300,
        height : 40,
        backgroundColor:"#DF5900",
       //  // color:"#FFFFFF",
       alignItems : "center",
       justifyContent: 'center',
       // fontWeight : "700"
},
text :{
    textAlign: 'left',
    // color : "#CF0063",
    fontWeight: 'bold',
    fontSize: 20,  
    // opacity:.02
},
label :{
    textAlign:'right',
    // color : "#CF0063",
    fontWeight: 'bold',
    fontSize: 20,  
    // opacity:.02
},
sendlist:{
    width: 300,
        height : 40,
        backgroundColor:"#66023c",
       //  // color:"#FFFFFF",
       alignItems : "center",
       justifyContent: 'center',
       // fontWeight : "700"
},
location:{
backgroundColor:"#CD7584",
width: 50,
        height : 50,
       //  // color:"#FFFFFF",
       alignItems : "center",
       justifyContent: 'center',
},
tabs:{
    flex: 1,
     width: 500,
        height : 30,
     

}


});
