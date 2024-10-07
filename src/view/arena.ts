import p5 from "p5";

export type ColorMapper<T> = <T>(t: T) => [number, number, number, number];

export interface ArenaProps<T> {
    xDim: number; 
    yDim: number; 
    battle: Battle<T>, 
    colorMapper: ColorMapper<T>
}

export class Arena<T> {
    private battle: Battle<T>;
    private colorMapper: ColorMapper<T>;
    private xDim: number;
    private yDim: number;

    constructor(props: ArenaProps<T>) {
        this.battle = props.battle;
        this.xDim = props.xDim;
        this.yDim = props.yDim;
        this.colorMapper = props.colorMapper;
    }

    public tick = () => {
        this.battle.round();
    }

    public draw = (drawer: p5) => {
        for (let y = 0; y < this.yDim; y += 1) {
            for (let x = 0; x < this.xDim; x += 1) {
                const contender = this.battle.getContender(x, y);
                const color = this.colorMapper(contender);
                drawer.set(x, y, color);
            }
        }
    }
}