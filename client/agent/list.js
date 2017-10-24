import React,{Component} from 'react';
import {View,Text,AppRegistry,TouchableOpacity,Button,ScrollView} from 'react-native';

export default class List extends Component{
	constructor(props){
	    super(props);
	    this.state={
           list:this.props.list
	    }
	}
	render(){
	    return(
	    	<View>
	        <View>
                <Text>
                {this.props.list.items}
                </Text>
                 <Text>
                {this.props.list.consumerName}
                </Text>
              
	        </View>
	        <Button
                title='ok'
                onPress={() => {alert('hiiihiihiihi')}}
	        />
	        </View>
	        

	)
	}
}
AppRegistry.registerComponent('List', () => List);