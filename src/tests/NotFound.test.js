import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente Not Found', () => {
  it('Teste se a página contém um h2 com o texto "Page requested not found 😭";', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/rota-inexistente');
    const notFoundTextEl = screen
      .getByRole('heading', { name: /Page requested not found 😭/i, level: 2 });
    expect(notFoundTextEl).toBeInTheDocument();
  });
});
