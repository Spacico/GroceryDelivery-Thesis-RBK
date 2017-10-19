import React from 'react';
import Login from '../components/login';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

describe('App ReactNativeTesting', () => {

beforeEach(() => {
    component = shallow(<Login />);
    textInput = component.find('TextInput');
  });

it('renders without crashing', () => {
  const rendered = renderer.create(<Login />).toJSON();
  expect(rendered).toBeTruthy();
});

it('when text changes', () => {
	const newTextValue = 'random string';
    beforeEach(() => {
    textInput.simulate('changeText', newTextValue);
})
})
})