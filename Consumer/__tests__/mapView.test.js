import React from 'react';
import 'react-native';
import MapView from 'react-native-maps';


import mapView from '../Components/mapView';
import renderer from 'react-test-renderer';

describe('MapView  Testing', () => {
    it('renders with out crashing', () => {
        const rendered = renderer.create(<mapView />).toJSON();
        expect(rendered).toBeTruthy();
    });
    
   
    it('contains View', () => {
        const View = require('View');
        const Tree = renderer.create(<View />).toJSON();
        expect(Tree).toMatchSnapshot();
    });
   
    
   
    
    
});