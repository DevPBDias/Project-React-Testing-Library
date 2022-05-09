import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

const partOneFirstP = 'This application simulates a Pokédex, a ';
const partTwoFirstP = 'digital encyclopedia containing all Pokémons';
const allTextFirstP = partOneFirstP + partTwoFirstP;

describe('Testando o componente "About"', () => {
  it('Teste se a página contém um heading h2 com o texto "About Pokédex"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const findHeadingEl = screen
      .getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(findHeadingEl).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    // para especificar a tag p, usar o selector(name)
    // usei um jeito salvando em variaves e concatenando
    const textOneEl = screen.getByText(allTextFirstP, { selector: 'p' });
    expect(textOneEl).toBeInTheDocument();
    // usando o regex(//i) , só precisa colocar uma parte do txt
    const textTwoEl = screen
      .getByText(/One can filter Pokémons by type/i, { selector: 'p' });
    expect(textTwoEl).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const urlImg = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const logoEl = screen.getByRole('img', { name: 'Pokédex' });
    expect(logoEl).toBeInTheDocument();
    // para especificar a tag p, usar o selector(name)
    expect(logoEl).toHaveAttribute('src', urlImg);
  });
});
