import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app', () => {
  render(<App />);
  const containerElement = screen.getByTestId("table-container");
  expect(containerElement).toBeInTheDocument();
});
