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

  it('Teste o link para exibir detalhes do pokémon, deve ter URL /pokemons/<id>', () => {
    const { history } = renderWithRouter(<App />);

    const linkDetails = screen
      .getByRole('link', { name: /More details/i });
    expect(linkDetails).toBeInTheDocument();
    userEvent.click(linkDetails);

    // na tela de detalhes do pikachu
    const pikachuName = screen.queryByText('Pikachu', { selector: 'p' });
    expect(pikachuName).toBeInTheDocument();
    const pikachuDetails = screen
      .getByRole('heading', { name: /Pikachu Details/i, level: 2 });
    expect(pikachuDetails).toBeInTheDocument();
    const pikachuLocations = screen
      .getByRole('heading', { name: /Game Locations of Pikachu/i, level: 2 });
    expect(pikachuLocations).toBeInTheDocument();

    // usei o log para ver onde tava a url e fiz destructuring
    const urlPikachu = '/pokemons/25';
    const { location: { pathname } } = history;
    // console.log(history);
    expect(pathname).toBe(urlPikachu);
  });

  it('Teste se clicar no link de nav do pokémon, vai para pagina de detalhes.', () => {
    const { history } = renderWithRouter(<App />);

    const linkDetails = screen
      .getByRole('link', { name: /More details/i });
    expect(linkDetails).toBeInTheDocument();
    userEvent.click(linkDetails);

    // na tela de detalhes do pikachu
    const pikachuName = screen.queryByText('Pikachu', { selector: 'p' });
    expect(pikachuName).toBeInTheDocument();
    const pikachuDetails = screen
      .getByRole('heading', { name: /Pikachu Details/i, level: 2 });
    expect(pikachuDetails).toBeInTheDocument();
    const summary = screen
      .getByRole('heading', { name: /summary/i, level: 2 });
    expect(summary).toBeInTheDocument();
    const pikachuLocations = screen
      .getByRole('heading', { name: /Game Locations of Pikachu/i, level: 2 });
    expect(pikachuLocations).toBeInTheDocument();
    const checkFavorite = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(checkFavorite).toBeInTheDocument();

    // usei o log para ver onde tava a url e fiz destructuring
    const urlPikachu = '/pokemons/25';
    const { location: { pathname } } = history;
    // console.log(history);
    expect(pathname).toBe(urlPikachu);
  });

  it('Teste também se a URL exibida no navegador muda para /pokemon/<id>', () => {
    const { history } = renderWithRouter(<App />);

    const linkDetails = screen
      .getByRole('link', { name: /More details/i });
    expect(linkDetails).toBeInTheDocument();
    userEvent.click(linkDetails);

    // usei o log para ver onde tava a url e fiz destructuring
    const urlPikachu = '/pokemons/25';
    const { location: { pathname } } = history;
    // console.log(history);
    expect(pathname).toBe(urlPikachu);
  });

  it('Teste se existe um ícone de estrela nos pokémons favoritados', () => {
    renderWithRouter(<App />);

    const moreDetails = screen
      .getByRole('link', { name: /More details/i });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    const urlImg = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const imgPikachu = screen.getByRole('img', { name: 'Pikachu sprite' });
    expect(imgPikachu).toBeInTheDocument();
    expect(imgPikachu).toHaveAttribute('src', urlImg);

    // quando for favoritado dps que entrar em mais detalhes, icone da estrela
    const checkFavorite = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(checkFavorite).toBeInTheDocument();

    const urlStar = '/star-icon.svg';
    const imgStar = screen
      .getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(imgStar).toBeInTheDocument();
    expect(imgStar).toHaveAttribute('src', urlStar);
  });
});
