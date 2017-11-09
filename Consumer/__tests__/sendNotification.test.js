import React from 'react';
import 'react-native';
import sendNotification from '../Components/sendNotification';
import renderer from 'react-test-renderer';

describe('sendNotification test',() =>{
	
  it('renders with out crashing', () =>{
  	const tree = renderer.create(
    	<sendNotification />
  	).toJSON();

  	expect(tree).toMatchSnapshot();
  });
});