import React from 'react';
import { shallow, mount } from 'enzyme';
import { Users } from './users';
import { fetchUsers } from '../actions/action';

describe('<Users />', () => {
  it('Renders without crashing', () => {
    shallow(<Users users={[]} />);
  })
})
