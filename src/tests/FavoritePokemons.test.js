import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente "FavoritePokemons"', () => {
  it('Teste se é exibida na tela a mensagem "No favorite pokemon found"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');
    const msgNoFavorite = 'No favorite pokemon found';
    const msgEl = screen
      .getByText(msgNoFavorite, { selector: 'p' });
    expect(msgEl).toBeInTheDocument();
  });
  // para favoritar , tem q clicar more details e estar no home
  // na url do pokemon(pokemons/id) , tem q checkar na msg pokemon favorito
  it('Teste se são exibidos todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');
    const msgNoFavorite = 'No favorite pokemon found';
    const msgEl = screen
      .getByText(msgNoFavorite, { selector: 'p' });
    expect(msgEl).toBeInTheDocument();
  });
});
