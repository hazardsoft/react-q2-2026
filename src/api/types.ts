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

export interface PokemonDetails extends Pokemon {
  id: number;
  abilities: Ability[];
  sprites: PokemonSprites;
}
