import type { PokemonResponse } from '../api/pokemon';
import type { Pokemon, PokemonDetails } from '../api/types';

export const pokemons: Pokemon[] = [
  {
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon/1/',
  },
  {
    name: 'ivysaur',
    url: 'https://pokeapi.co/api/v2/pokemon/2/',
  },
  {
    name: 'venusaur',
    url: 'https://pokeapi.co/api/v2/pokemon/3/',
  },
];

export const pokemonsResponse: PokemonResponse = {
  previous: null,
  next: '',
  results: [...pokemons],
};

export const pokemon: PokemonDetails = {
  id: 1,
  name: 'bulbasaur',
  url: 'https://pokeapi.co/api/v2/pokemon/1',
  abilities: [
    {
      ability: {
        name: 'overgrow',
        url: 'https://pokeapi.co/api/v2/ability/65/',
      },
    },
    {
      ability: {
        name: 'chlorophyll',
        url: 'https://pokeapi.co/api/v2/ability/34/',
      },
    },
  ],
  sprites: {
    front_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  },
};
