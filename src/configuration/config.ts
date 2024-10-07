import { Pokemon, PokeType } from "../data/pokemon";
import { PokemonBattle } from "../service/pokemon";
import { ArenaProps, ColorMapper } from "../view/arena";

const DIMENSIONS = {
    x: 500,
    y: 500
}

const pokeMapper: ColorMapper<Pokemon> = <T>(poke: T) => {
    switch((poke as Pokemon).element) {
        case PokeType.BUG:
            return [166, 185, 26, 255];
        case PokeType.DARK:
            return [112, 87, 70, 255]
        case PokeType.DRAGON:
            return [111, 53, 252, 255]
        case PokeType.ELECTRIC:
            return [247, 208, 44, 255]
        case PokeType.FAIRY:
            return [214, 133, 173, 255]
        case PokeType.FIGHTING:
            return [194, 46, 40, 255]
        case PokeType.FIRE:
            return [238, 129, 48, 255]
        case PokeType.FLYING:
            return [169, 143, 243, 255]
        case PokeType.GHOST:
            return [115, 87, 151, 255]
        case PokeType.GRASS:
            return [122, 199, 76, 255]
        case PokeType.GROUND:
            return [226, 191, 101, 255]
        case PokeType.ICE:
            return [150, 217, 214, 255]
        case PokeType.NORMAL:
            return [168, 167, 122, 255]
        case PokeType.POISON:
            return [163, 62, 161, 255]
        case PokeType.PSYCHIC:
            return [249, 85, 135, 255]
        case PokeType.ROCK:
            return [182, 161, 54, 255]
        case PokeType.STEEL:
            return [183, 183, 206, 255]
        case PokeType.WATER:
            return [99, 144, 240, 255]
    }
}

export const pokemonArenaConfig: ArenaProps<Pokemon> = {
    xDim: DIMENSIONS.x,
    yDim: DIMENSIONS.y,
    battle: new PokemonBattle(DIMENSIONS.x, DIMENSIONS.y, true),
    colorMapper: pokeMapper
}