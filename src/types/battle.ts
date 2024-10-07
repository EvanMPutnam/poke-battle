interface Battle<T> {
    reset: () => void;
    round: () => void;
    getContender: (x: number, y: number) => T
}