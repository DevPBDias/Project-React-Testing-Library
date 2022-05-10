import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando o componente "Pokemon"', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    const { history } = renderWithRouter(<App />);
    // O nome correto
    const pikachuName = screen.getByText(/pikachu/i, { selector: 'p' });
    expect(pikachuName).toBeInTheDocument();
    // O tipo correto
    const typePokemon = screen.getByText(/electric/i, { selector: 'p' });
    expect(typePokemon).toBeInTheDocument();
    // O peso médio
    const weightPikachu = screen.getByText(/Average weight: 6.0 kg/i, { selector: 'p' });
    expect(weightPikachu).toBeInTheDocument();
    // A imagem do pokémon
    const urlImg = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const imgPikachu = screen.getByRole('img', { name: 'Pikachu sprite' });
    expect(imgPikachu).toBeInTheDocument();
    expect(imgPikachu).toHaveAttribute('src', urlImg);
    // quando for favoritado dps que entrar em mais detalhes, icone da estrela
    history.push('/');
    const linkDetails = screen
      .getByRole('link', { name: /More details/i });
    expect(linkDetails).toBeInTheDocument();
    userEvent.click(linkDetails);

    const checkFavorite = screen.getByRole('checkbox', { checked: false });
    expect(checkFavorite).toBeInTheDocument();
    userEvent.click(checkFavorite);

    const urlStar = '/star-icon.svg';
    const imgStar = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(imgStar).toBeInTheDocument();
    expect(imgStar).toHaveAttribute('src', urlStar);
  });
  //   it(`Teste se é exibido o próximo pokémon da lista
  //     quando o botão "Próximo pokémon" é clicado`, () => {
  //     renderWithRouter(<App />);

  //     const buttonEl = screen.getByRole('button', { name: /Próximo pokémon/i });
  //     expect(buttonEl).toBeInTheDocument();
  //     userEvent.click(buttonEl);
  //     const pikachuName = screen.queryByText('Pikachu', { selector: 'p' });
  //     expect(pikachuName).not.toBeInTheDocument();

//     const times = 7;
//     for (let index = 0; index <= times; index += 1) {
//       userEvent.click(buttonEl);
//     }
//     const pikachuName2 = screen.getByText('Pikachu', { selector: 'p' });
//     expect(pikachuName2).toBeInTheDocument();
//   });
});
