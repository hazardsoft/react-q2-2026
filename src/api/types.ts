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

export type PokemonSprites = {
  front_default: string | null;
};

export type PokemonDetails = {
  id: number;
  name: string;
  abilities: Ability[];
  sprites: PokemonSprites;
  url: string;
};
