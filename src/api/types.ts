export type Pokemon = {
  name: string;
  url: string;
};

export type Ability = {
  ability: {
    name: string;
    url: string;
  };
};

export type PokemonDetails = {
  id: number;
  name: string;
  weight: number;
  abilities: Ability[];
  url: string;
};
