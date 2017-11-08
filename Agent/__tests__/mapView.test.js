import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';
import MapView from 'react-native-maps';
import Mapo from '../Components/mapView';

describe('mapView Testing', () => {
    it('renders with out crashing', () => {
        const rendered = renderer.create(<Mapo />).toJSON();
        expect(rendered).toBeTruthy();
    });
})
//     it('contains TextInput', () => {
//         const TextInput = require('View');
//         const Tree = renderer.create(<View />).toJSON();
//         expect(Tree).toMatchSnapshot();
//     });
//     it('contains TouchableOpacity', () => {
//         const TouchableOpacity = require('MapView');
//         const Tree = renderer.create(<MapView />).toJSON();
//         expect(Tree).toMatchSnapshot();
//     });
//     it('contains View', () => {
//         const View = require('MapView.Marker');
//         const Tree = renderer.create(<MapView.Marker />).toJSON();
//         expect(Tree).toMatchSnapshot();
//     });
    
// })