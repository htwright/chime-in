import React from 'react';
import { shallow, mount } from 'enzyme';
import { QuestionEntry } from './questionEntry';
import { fetchQuestion } from '../actions/action';

describe('<QuestionEntry />', () => {
  it('Renders without crashing', () => {
    shallow(<QuestionEntry questions={[]} />);
  })
})
