import React from 'react';
import 'react-native';
import { Image,StatusBar} from 'react-native';


import login from '../Components/login';
import renderer from 'react-test-renderer';

describe('log in  Testing', () => {
    it('renders with out crashing', () => {
        const rendered = renderer.create(<login />).toJSON();
        expect(rendered).toBeTruthy();
    });
    
   
    it('contains View', () => {
        const View = require('View');
        const Tree = renderer.create(<View />).toJSON();
        expect(Tree).toMatchSnapshot();
    });
    it('contains Image', () => {
        const Image = require('Image');
        const Tree = renderer.create(<Image />).toJSON();
        expect(Tree).toMatchSnapshot();
    });
    it('contains StatusBar', () => {
        const StatusBar = require('StatusBar');
        const Tree = renderer.create(<StatusBar />).toJSON();
        expect(Tree).toMatchSnapshot();
    });
   
    
    
});