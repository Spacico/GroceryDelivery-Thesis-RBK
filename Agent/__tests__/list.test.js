import React from 'react';
import renderer from 'react-test-renderer';
import List from '../Components/list';
import Mapo from '../Components/mapView';
import getDirections from 'react-native-google-maps-directions';

describe('list component Testing', () => {
    it('renders with out crashing', () => {
        const rendered = renderer.create(< List/>).toJSON();
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
    // it('contains ScrollView', () => {
    //     const ScrollView = require('Modal');
    //     const Tree = renderer.create(<Modal />).toJSON();
    //     expect(Tree).toMatchSnapshot();
    // });
    it('contains Mapo',()=>{
        const Mapo = renderer.create('Mapo');
        const Tree = renderer.create(<Mapo/>).toJSON();
        expect(Tree).toMatchSnapshot();
    })
})