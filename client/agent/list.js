import React, { Component } from 'react';
import { View, Text, AppRegistry,  Button } from 'react-native';

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: this.props.list
        };
    }
    render() {
        return (
            <Button
                title={this.props.list.items}
                onPress={() => {
                    alert('hiiihiihiihi');
                }}
            />
        );
    }
}
AppRegistry.registerComponent('List', () => List);
