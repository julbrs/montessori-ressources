import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders add react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText('add');
  expect(linkElement).toBeInTheDocument();
});
