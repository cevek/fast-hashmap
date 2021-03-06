type HashMap<T> = {
    s: number;
    k: Int32Array;
    v: (T | undefined)[];
};
export const createHashMap = <T>(capacity = 8): HashMap<T> => {
    const power = Math.ceil(Math.log2(capacity));
    capacity = 2 ** power;
    return {
        s: 0,
        k: new Int32Array(capacity),
        v: Array(capacity),
    };
};
export const clone = <T>(hashMap: HashMap<T>): HashMap<T> => {
    return {
        s: hashMap.s,
        k: hashMap.k.slice(),
        v: hashMap.v.slice(),
    };
};

export const get = <T>(hashMap: HashMap<T>, key: number): T | undefined => {
    let j = 0;
    while (true) {
        const k = (j++ + key) & (hashMap.k.length - 1);
        const existValue = hashMap.v[k];
        if (existValue === void 0) return;
        const existKey = hashMap.k[k];
        if (existKey === key) return existValue;
    }
};

export const size = <T>(hashMap: HashMap<T>): number => {
    return hashMap.s;
};

export const set = <T>(hashMap: HashMap<T>, key: number, value: T): void => {
    if (hashMap.s > ((hashMap.k.length * 0.7) | 0)) {
        resize(hashMap, hashMap.k.length << 1);
    }
    setWithoutResize(hashMap, key, value);
};

export const setAll = <T>(hashMap: HashMap<T>, data: [number, T][]): void => {
    if (hashMap.s + data.length > (hashMap.k.length - 1) * 0.7) {
        resize(hashMap, 2 ** Math.ceil(Math.log2(hashMap.s + data.length) + 1));
    }
    for (const item of data) {
        setWithoutResize(hashMap, item[0], item[1]);
    }
};

const setWithoutResize = <T>(hashMap: HashMap<T>, key: number, value: T): void => {
    let j = 0;
    while (true) {
        const k = (j++ + key) & (hashMap.k.length - 1);
        if (hashMap.v[k] === void 0) {
            hashMap.k[k] = key;
            hashMap.v[k] = value;
            hashMap.s++;
            break;
        }
        if (hashMap.k[k] === key) {
            hashMap.v[k] = value;
            break;
        }
    }
};

export const forEach = <T>(hashMap: HashMap<T>, fn: (val: T, key: number) => void): void => {
    let j = 0;
    for (let i = 0; j < hashMap.s; i++) {
        const value = hashMap.v[i];
        if (value !== void 0) {
            const key = hashMap.k[i];
            fn(value, key);
            j++;
        }
    }
};

export const map = <T, R>(hashMap: HashMap<T>, fn: (val: T, key: number) => R): R[] => {
    const newArr = Array(hashMap.s);
    let i = 0;
    forEach(hashMap, (v, k) => {
        newArr[i++] = fn(v, k);
    });
    return newArr;
};

export const remove = <T>(hashMap: HashMap<T>, key: number) => {
    let j = 0;
    while (true) {
        const k = (j++ + key) & (hashMap.k.length - 1);
        if (hashMap.v[k] === void 0) break;

        if (hashMap.k[k] === key) {
            hashMap.v[k] = void 0;
            hashMap.k[k] = 0;
            hashMap.s--;
            break;
        }
    }
};

export const clear = <T>(hashMap: HashMap<T>) => {
    hashMap.k.fill(0);
    hashMap.v.fill(void 0);
    hashMap.s = 0;
};

const resize = <T>(hashMap2: HashMap<T>, newCapacity: number) => {
    const hm = createHashMap<T>(newCapacity);
    let i = 0,
        c = 0;
    while (c < hashMap2.s) {
        const value = hashMap2.v[i];
        if (value !== void 0) {
            const key = hashMap2.k[i];
            c++;
            let j = 0;
            while (true) {
                const k = (j++ + key) & (hm.k.length - 1);
                if (hm.v[k] === void 0) {
                    hm.k[k] = key;
                    hm.v[k] = value;
                    break;
                }
            }
        }
        i++;
    }
    hashMap2.k = hm.k;
    hashMap2.v = hm.v;
};
