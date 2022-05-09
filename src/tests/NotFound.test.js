import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente Not Found', () => {
  it('Teste se a página contém um h2 com o texto "Page requested not found 😭"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/rota-inexistente');
    const notFoundTextEl = screen
      .getByRole('heading', { name: /page requested/i, level: 2 });
    expect(notFoundTextEl).toBeInTheDocument();
  });

  it('Teste se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/rota-inexistente');

    const altNotFound = 'Pikachu crying because the page requested was not found';
    const urlImg = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    const imgEl = screen
      .getByRole('img', { name: altNotFound });
    expect(imgEl).toBeInTheDocument();
    expect(imgEl).toHaveAttribute('src', urlImg);
  });
});

// it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
//   const { history } = renderWithRouter(<App />);
//   history.push('/about');
//   const urlImg = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
//   const logoEl = screen.getByRole('img', { name: 'Pokédex' });
//   expect(logoEl).toBeInTheDocument();
//   // usando o toHaveAttribute para poder passar a src(url) da img no teste
//   expect(logoEl).toHaveAttribute('src', urlImg);
// });
