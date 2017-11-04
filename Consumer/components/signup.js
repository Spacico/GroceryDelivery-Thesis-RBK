import React from 'react';
import {StatusBar,Image, StyleSheet, Text, View,TextInput,TouchableHighlight, Alert,AppRegistry,TouchableOpacity } from 'react-native';
// import sendNotification from "./components/sendNotification"
// import OffCanvas3D from '../offcanvas3d'
import {Icon,TabBar,SearchBar,Tabs, Tab,SideMenu, List, ListItem } from 'react-native-elements'
import {Header,Container, Button } from 'native-base';

 export default class signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      changeFlag: props.changeFlag,
      userName : '',
      email:'',
      password : ''
    }
     // this.toggleSideMenu = this.toggleSideMenu.bind(this)
  }

// handleMenu() {
//   const {menuOpen} = this.state
//   this.setState({
//     menuOpen: !menuOpen
//   })
// }
  onClickButton(){
        fetch('http:192.168.1.4:1128/consumerSignup', {//192.168.1.7
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
         alert(response)
           return response.json()
          

       })
       .then((responseJson) => {
         
           alert(responseJson);
           if(responseJson){
           alert('sucessfuly register !! \n' + "thank you for registering\n  login please")
}
else {
    alert("user name is invalid  :( \n Please try again !!!")
}
       })
       .catch((error) => {
            alert(error);
            alert("Error !!!  Please try again")
       });

        // this.state.changeFlag('main');
    }

// onSideMenuChange (isOpen: boolean) {
//   this.setState({
//     isOpen: isOpen
//   })
// }


  render() {
    return (
      <View  KeyboardAvoidingView behavior="padding" style={styles.container}>
             


            <Image style={styles.container}
            source = {require('../images/main.jpg')}
            >

            <StatusBar
            backgroundColor ="#DF5900"
            />





           
 <Text style= {{ marginTop: 80,  textAlign:'right',fontWeight: 'bold',fontSize: 20 }} > User Name </Text>
 <SearchBar 
                    lightTheme
                    onChangeText = {(val) => this.setState({userName : val})}
                    style = {styles.input} placeholder = 'user name .... '
                    noIcon 
                    required
                />

                  <Text>{'\n'}</Text>

<Text style= {styles.label} > Email </Text>
                 <SearchBar 
                lightTheme
                    onChangeText = {(val) => this.setState({email : val})}
                    style = {styles.input} placeholder = 'Email.....'
                    noIcon
                    required
                />
                <Text>{'\n'}</Text>

<Text style= {styles.label} > Password </Text>
               
                <SearchBar 
                lightTheme
                    onChangeText = {(val) => this.setState({password : val})}
                    style = {styles.input} placeholder = 'password.....'
                    noIcon
                    required
                    secureTextEntry
                />
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
 
 <Text>{'\n'}</Text>




<TouchableHighlight
               style = {styles.signup }
                icon={{name: 'cached'}}
                   onPress={
                        this.onClickButton.bind(this)
                    }>
                    <Text style= {styles.text} > Sign Up </Text>
                </TouchableHighlight> 




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
    backgroundColor: '#F7B50C',
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
   input: {
        width: 300,
        height : 40,
        // marginBottom : 20,
        // color : "#FFF",
        // paddingHorizontal : 10
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
    fontWeight : "700"
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
tabs:{
    flex: 1,
     width: 500,
        height : 30,
     

}

  
});
