import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Renders Exchange Rate Calculator', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Exchange Rate Calculator/i);
  expect(linkElement).toBeInTheDocument();
});
