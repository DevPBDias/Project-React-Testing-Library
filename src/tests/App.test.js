import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

describe('Teste se a aplicação contém um conjunto fixo de links de navegação', () => {
  it('O primeiro link deve possuir o texto "Home"', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const homeLinkEl = screen.getByRole('link', { name: /home/i });
    expect(homeLinkEl).toBeInTheDocument();
  });

  it('O segundo link deve possuir o texto "About"', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const aboutLinkEl = screen.getByRole('link', { name: /about/i });
    expect(aboutLinkEl).toBeInTheDocument();
  });

  it('O terceiro link deve possuir o texto "Favorite Pokémons"', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const favoritesLinkEl = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favoritesLinkEl).toBeInTheDocument();
  });
});

describe('Teste se a aplicação é redirecionada para a página inicial', () => {
  it('Testando se ao clicar no link "Home", é redirecionado para página inicial', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const findHeadingEl = screen
      .getByRole('heading', { name: /Encountered pokémons/i, level: 2 });
    expect(findHeadingEl).toBeInTheDocument();
  });
});

describe('Teste se a aplicação é redirecionada para a página "About"', () => {
  it('Testando se ao clicar no link "About", é redirecionado para página "About"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const findHeadingEl = screen
      .getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(findHeadingEl).toBeInTheDocument();
  });
});

describe('Teste se a aplicação é redirecionada para a página "Favoritos"', () => {
  it('Testando se ao clicar no link "Favoritos", é redirecionado para favoritos', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');
    const findHeadingEl = screen
      .getByRole('heading', { name: /Favorite pokémons/i, level: 2 });
    expect(findHeadingEl).toBeInTheDocument();
  });
});

describe('Teste se a aplicação é redirecionada para a página "Not Found"', () => {
  it('Testando se aparece a página "Not Found" ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/rota-nao-existe');
    const findHeadingEl = screen
      .getByRole('heading', { name: /Page requested not found/i, level: 2 });
    expect(findHeadingEl).toBeInTheDocument();
  });
});
