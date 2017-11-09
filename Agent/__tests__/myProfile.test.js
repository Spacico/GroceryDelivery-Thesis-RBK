import React from 'react';
import SideMenu from 'react-native-side-menu';
import Profile from '../Components/myProfile';
import renderer from 'react-test-renderer';

describe('myProfile componenet Testing', () => {
    it('renders with out crashing', () => {
        const rendered = renderer.create(<Profile />).toJSON();
        expect(rendered).toBeTruthy();
    });
    it('contains TextInput', () => {
        const TextInput = require('TextInput');
        const Tree = renderer.create(<TextInput />).toJSON();
        expect(Tree).toMatchSnapshot();
    });
    it('contains TouchableOpacity', () => {
        // const TouchableOpacity = require('SideMenu');
        const Tree = renderer.create(<SideMenu />).toJSON();
        expect(Tree).toMatchSnapshot();
    });
    it('contains View', () => {
        const View = require('View');
        const Tree = renderer.create(<View />).toJSON();
        expect(Tree).toMatchSnapshot();
    });
    
})