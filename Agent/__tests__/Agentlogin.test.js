import React from 'react';
import Login from '../Components/Login';
import renderer from 'react-test-renderer';

describe('App REactNAtive Testing', () => {
    it('renders with out crashing', () => {
        const rendered = renderer.create(<Login />).toJSON();
        expect(rendered).toBeTruthy();
    });
    it('contains TextInput', () => {
        const TextInput = require('TextInput');
        const Tree = renderer.create(<TextInput />).toJSON();
        expect(Tree).toMatchSnapshot();
    });
    it('contains TouchableOpacity', () => {
        const TouchableOpacity = require('TouchableOpacity');
        const Tree = renderer.create(<TouchableOpacity />).toJSON();
        expect(Tree).toMatchSnapshot();
    });
    it('contains View', () => {
        const View = require('View');
        const Tree = renderer.create(<View />).toJSON();
        expect(Tree).toMatchSnapshot();
    });
});
