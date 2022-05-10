import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente "Poxedex"', () => {
  // feito
  it('Teste se a página contém um heading h2 com o texto "Encountered pokémons"', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/');
    const headingEl = screen
      .getByRole('heading', { name: /Encountered pokémons/i, level: 2 });
    expect(headingEl).toBeInTheDocument();
  });
  // feito
  it(`Teste se é exibido o próximo pokémon da lista
    quando o botão "Próximo pokémon" é clicado`, () => {
    renderWithRouter(<App />);

    const buttonEl = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(buttonEl).toBeInTheDocument();
    // qdo clica no botao prox pokemon, o nome do pikachu n ta mais na tela, mas como faço para o nome do pokemon anterior
    // nao estar mais na tela dps q aperto o botao?
    userEvent.click(buttonEl);
    const pikachuName = screen.queryByText('Pikachu', { selector: 'p' });
    expect(pikachuName).not.toBeInTheDocument();

    // nome do pikachu deve aparecer denovo na tela (clicar 7x ate aparecer o nome do pikachu)
    const times = 7;
    for (let index = 0; index <= times; index += 1) {
      userEvent.click(buttonEl);
    }
    const pikachuName2 = screen.getByText('Pikachu', { selector: 'p' });
    expect(pikachuName2).toBeInTheDocument();
  });

  // raciocinio certo?
  it('Teste se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);
    // checando o nome do pikachu na tela
    const nameEl = screen.getAllByTestId('pokemon-name');
    expect(nameEl[0]).toBeInTheDocument();

    // dps que clicko no prox pokemon , o pikachu some
    const buttonEl = screen.getByTestId('next-pokemon');
    expect(buttonEl).toBeInTheDocument();
    userEvent.click(buttonEl);
    const pikachuName = screen.queryByText('Pikachu', { selector: 'p' });
    expect(pikachuName).not.toBeInTheDocument();

    // dps que clicko no all , o pikachu reaparece
    const buttonAllEl = screen.getByRole('button', { name: /All/i });
    expect(buttonAllEl).toBeInTheDocument();
    userEvent.click(buttonAllEl);
    const pikachuName2 = screen.getByText(/pikachu/i, { selector: 'p' });
    expect(pikachuName2).toBeInTheDocument();

    // quando clico em algum tipo aparece somente o pokemon daquele tipo
    const tipoBtn = screen.getByRole('button', { name: /fire/i });
    expect(tipoBtn).toBeInTheDocument();
    userEvent.click(tipoBtn);
    const charmanderName = screen.getByText(/Charmander/i, { selector: 'p' });
    expect(charmanderName).toBeInTheDocument();
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    // botao de tipo de pokemon é um filtro
    const typeButton = screen.getAllByTestId('pokemon-type-button');
    userEvent.click(typeButton[2]);
    expect(typeButton[2]).toBeInTheDocument();

    // botao prox pokemon, aparece charmander qdo clica 1x
    const buttonEl = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(buttonEl).toBeInTheDocument();
    userEvent.click(buttonEl);
    const cartepieName = screen.getByText(/caterpie/i, { selector: 'p' });
    expect(cartepieName).toBeInTheDocument();

    // botao all, aparece pikachu
    const buttonAllEl = screen.getByRole('button', { name: /All/i });
    expect(buttonAllEl).toBeInTheDocument();
    userEvent.click(buttonAllEl);
    const pikachuNome = screen.getByText(/pikachu/i, { selector: 'p' });
    expect(pikachuNome).toBeInTheDocument();
  });

  // feito
  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    // tem varios botoes com esse id
    const typeButton = screen.getAllByTestId('pokemon-type-button');
    // recebe um array
    expect(typeButton[0]).toBeInTheDocument();
    userEvent.click(typeButton[0]);

    // botao prox pokemon desabilita dps de clicar no tipo pokemon
    const buttonEl = screen.getByTestId('next-pokemon');
    expect(buttonEl).toBeInTheDocument();
    expect(buttonEl).toBeDisabled();

    // pegar os botoes de tipo pokemon pq o stryker sabota meu App, e essa parte nao estava com cobertura de teste
    const tipoBtn = screen.getByRole('button', { name: /electric/i });
    expect(tipoBtn).toBeInTheDocument();

    // antes de clicar no botao all, o botao prox pokemon esta desabilitado, ele fica on qdo clica no all
    const buttonAllEl = screen.getByRole('button', { name: /All/i });
    expect(buttonAllEl).toBeInTheDocument();
    userEvent.click(buttonAllEl);
    expect(buttonEl).not.toBeDisabled();
    // tenho que ver tbm se o nome do pikachu ta na tela
    const pikachuName = screen.queryByText('Pikachu', { selector: 'p' });
    expect(pikachuName).toBeInTheDocument();
  });
});
