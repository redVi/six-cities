import React from 'react';
import {MemoryRouter as Router} from 'react-router-dom';
import renderer from 'react-test-renderer';
import {App} from '@/components/app/app';

describe(`App`, () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(
        <Router>
          <App
            user={{}}
            logIn={jest.fn()}
            logOut={jest.fn()}
            fetchOffers={jest.fn()} />
        </Router>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
