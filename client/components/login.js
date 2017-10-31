import React from 'react';
import {StatusBar, Image,View,StyleSheet,TouchableHighlight,Text,TextInput} from 'react-native';
import SendNotification from './sendNotification'
import {TabBar,SearchBar,Tabs, Tab, Icon,SideMenu, List, ListItem } from 'react-native-elements'
import {Header,Container, Button } from 'native-base';
// import TabNavigator from 'react-native-tab-navigator';
//SideBar
// import {TabNavigator} from "react-navigator";

export default class login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            changeFlag: props.changeFlag,
            consumerName : '',
            password : '',
            list:''
        };
      

    }

    //http:192.168.1.2:1128/consumerLogin //osama
  

    onClickButton(){
        fetch('http:192.168.1.12:1128/login', {//192.168.1.7
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
           // return response.json()

       })
       .then((responseJson) => {
         
           return responseJson;


           if(responseJson){
           this.state.changeFlag('sendNotification');
}
else {
    alert("user name or password is wrong !!!")
}
       })
       .catch((error) => {
            // reject(error);
            alert("there is something wrong please try again!!!")
       });


        // .then ((res) => {
        //     alert(res)
        //         this.state.changeFlag('sendNotification');
        // })
        // .catch((err)=>{
        //       alert("Hi")
        //         alert("Please Sign Up First");
        //         this.state.changeFlag('signup');
        //     }); 
            this.state.changeFlag('sendNotification');

        
    }

    render() {
        return (
            <View style={styles.container}>

                

            <Image style={styles.container}
            source = {require('../images/main.jpg')}
            >

            <StatusBar
            backgroundColor ="#8C0000"
            />

    

 

            <Text  style= {{ marginTop: 180,  textAlign:'right',fontWeight: 'bold',fontSize: 20 }}  > User Name </Text>
                <SearchBar 
                    lightTheme
                    onChangeText = {(val) =>{ this.setState({consumerName : val})}}
                    style = {styles.input} placeholder = 'user name .... '
                    noIcon 
                />

                  <Text>{'\n'}</Text>
                <Text style= {styles.label} > Password </Text>
                <SearchBar 
                lightTheme
                    onChangeText = {(val) => this.setState({password : val})}
                    style = {styles.input} placeholder = 'password.....'
                    noIcon
                    secureTextEntry
                />

<Text>{'\n'}</Text>
 <Text>{'\n'}</Text>
               <TouchableHighlight
               style = {styles.login }
                icon={{name: 'cached'}}
                    onPress={
                        this.onClickButton.bind(this)
                    }>
                    <Text style= {styles.text} > Log in </Text>
                </TouchableHighlight> 
                <Text>{'\n'}</Text>
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
        // backgroundColor: '#3498db',
        alignItems: 'center',
        justifyContent: 'center',
        // color:'#3498db'
        // backfaceVisibility:true
    },
    addButton: {
        backgroundColor : '#ccc',
        width : 90 ,
        height : 40,
        justifyContent : 'center',
        elevation : 8,
    },
    input: {
        width: 300,
        height : 40,
        // marginBottom : 20,
        // color : "#FFF",
        // paddingHorizontal : 10
    },
    // logoContainer :{
    //     alignItems : 'center',
    //     flexGrow : 1,
    //     justifyContent : 'center'
    // },
    // logo : {
    //     width: 200,
    //     height:100
    // },
    // title: {
    //     color : '#FFF',
    //     marginTop:10,
    //     textAlign:'center',
    //     opacity:.5
    // },
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

login:{
     width: 300,
        height : 40,
        backgroundColor:"#8C0000",
       //  // color:"#FFFFFF",
       alignItems : "center",
       justifyContent: 'center',
       // fontWeight : "700"
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
shadow: {
    marginTop:200,
    marginBottom:200,
    alignItems: 'center',
    justifyContent: 'center',
    height:20,
    width:400,
    flexGrow : 1,
    backgroundColor:"#8C0000",
    opacity:9
},
arrow:{
    width: 100,
    height :100,

},
tabs:{
    flex: 1,
     width: 500,
        height : 50,
     

}

});


