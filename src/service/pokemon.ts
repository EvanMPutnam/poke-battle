import { ATTACKER_MAPPINGS, Pokemon, PokeType } from "../data/pokemon";

const DEFAULT_HEALTH = 80;
const DEFAULT_DAMAGE = 40;

interface PokemonBattleProps {
    xDim: number;
    yDim: number;
    prioritizeWeakest: boolean;
    skipRetaliation: boolean;
}

const randomEnum = <T extends Object>(enumValues: T[keyof T][]): T[keyof T] => {
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    return enumValues[randomIndex];
}

export class PokemonBattle implements Battle<Pokemon> {
    private pokemon: Pokemon[][];
    private xDim: number;
    private yDim: number;
    private pokeTypes: PokeType[keyof PokeType][];
    private prioritizeWeakest: boolean;
    private skipRelatization: boolean;


    constructor(props: PokemonBattleProps) {
        this.xDim = props.xDim;
        this.yDim = props.yDim;
        this.pokeTypes = (Object.values(PokeType) as unknown) as PokeType[keyof PokeType][];
        this.prioritizeWeakest = props.prioritizeWeakest;
        this.skipRelatization = props.skipRetaliation;
        this.reset();
    }

    public reset = () => {
        this.pokemon = new Array<Pokemon[]>();
        for (let y = 0; y < this.yDim; y += 1) {
            const subArray = new Array<Pokemon>();
            for (let x = 0; x < this.xDim; x += 1) {
                subArray.push(this.randomPokemon());
            }
            this.pokemon.push(subArray);
        };
    };

    public getContender = (x: number, y: number) => this.pokemon[y][x];

    public round = () => {
        this.battlePhase();
        this.spawnPhase();
    }

    private battlePhase = () => {
        this.pokemon.forEach((pokeArr, y) => {
            pokeArr.forEach((poke, x) => {
                if (poke.health <= 0) {
                    return;
                }
                const contender = this.getRandomNeighbor(poke, x, y);
                if (!contender) {
                    return;
                }
                this.battle(poke, contender);
            });
        });
    }

    private spawnPhase = () => {
        this.pokemon.forEach((pokeArr, y) => {
            pokeArr.forEach((poke, x) => {
                if (poke.health > 0) {
                    return;
                }
                poke.element = poke.killedByType;
                poke.killedByType = undefined;
                poke.health = DEFAULT_HEALTH;
            });
        });
    }

    private battle = (starter: Pokemon, finisher: Pokemon) => {
        finisher.health -= starter.defaultDamage * 
            ATTACKER_MAPPINGS[starter.element][finisher.element];
        if (finisher.health <= 0) {
            finisher.killedByType = starter.element;
            return;
        }

        if (this.skipRelatization) {
            return;
        }

        starter.health -= finisher.defaultDamage * 
            ATTACKER_MAPPINGS[finisher.element][starter.element];
        if (starter.health <= 0) {
            starter.killedByType = finisher.element;
        }
    } 

    private getRandomNeighbor = (poke: Pokemon, x: number, y: number) : Pokemon | undefined => {
        const contenders = [this.pokemon[y-1], this.pokemon[y+1]]
            .reduce<Pokemon[]>((accum, curr) => {
            if (curr && curr[x+1] && curr[x+1].health > 0) {
                accum.push(curr[x+1])
            }
            if (curr && curr[x-1] && curr[x-1].health > 0) {
                accum.push(curr[x-1])
            }
            return accum;
        }, []);
        if (contenders.length > 0) {
            return !this.prioritizeWeakest ? 
                contenders[Math.floor(Math.random() * contenders.length)] :
                contenders.sort(
                    (a, b) => ATTACKER_MAPPINGS[poke.element][b.element] 
                                - ATTACKER_MAPPINGS[poke.element][a.element]
                )[0];
        }
        return;
    };

    private randomPokemon = () => {
        const randEnum = randomEnum<PokeType>(this.pokeTypes) as PokeType;
        const poke: Pokemon = {
            defaultDamage: DEFAULT_DAMAGE,
            element: randEnum,
            health: DEFAULT_HEALTH,
            killedByType: undefined
        }
        return poke;
    }
}