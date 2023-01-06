import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Route test', () => {
  test('test app routes ', () => {
    renderWithRouterAndRedux(<App />);
  });
});
