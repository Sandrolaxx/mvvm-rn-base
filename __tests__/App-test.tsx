import React from 'react';
import 'react-native';

import renderer from 'react-test-renderer';
import App from "../src/App";

it('renders correctly', () => {
    const tree = renderer.create(<App />).toJSON();

    expect(tree).toMatchSnapshot();
});
