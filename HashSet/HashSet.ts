export type HashSet = {
    s: number;
    v: (number | undefined)[];
};
export const createHashSet = (capacity = 8): HashSet => {
    const power = Math.ceil(Math.log2(capacity));
    capacity = 2 ** power;
    return {
        s: 0,
        v: Array(capacity),
    };
};
export const clone = (hashSet: HashSet): HashSet => {
    return {
        s: hashSet.s,
        v: hashSet.v.slice(),
    };
};

export const has = (hashSet: HashSet, value: number): boolean => {
    let j = 0;
    while (true) {
        const k = (j++ + value) & (hashSet.v.length - 1);
        const existValue = hashSet.v[k];
        if (existValue === value) return true;
        if (existValue === void 0) return false;
    }
};

export const size = (hashSet: HashSet): number => {
    return hashSet.s;
};

export const add = (hashSet: HashSet, value: number): void => {
    if (hashSet.s > ((hashSet.v.length * 0.7) | 0)) {
        resize(hashSet, hashSet.v.length << 1);
    }
    addWithoutResize(hashSet, value);
};

export const addAll = (hashSet: HashSet, values: number[]): void => {
    if (hashSet.s + values.length > (hashSet.v.length - 1) * 0.7) {
        resize(hashSet, 2 ** Math.ceil(Math.log2(hashSet.s + values.length) + 1));
    }
    for (const item of values) {
        addWithoutResize(hashSet, item);
    }
};

const addWithoutResize = (hashSet: HashSet, value: number): void => {
    let j = 0;
    while (true) {
        const k = (j++ + value) & (hashSet.v.length - 1);
        const existVal = hashSet.v[k];
        if (existVal === void 0) {
            hashSet.v[k] = value;
            hashSet.s++;
            break;
        }
        if (existVal === value) break;
    }
};

export const forEach = (hashSet: HashSet, fn: (val: number) => void): void => {
    let j = 0;
    for (let i = 0; j < hashSet.s; i++) {
        const value = hashSet.v[i];
        if (value !== void 0) {
            fn(value);
            j++;
        }
    }
};

export const map = <T, R>(hashSet: HashSet, fn: (val: number) => R): R[] => {
    const newArr = Array(hashSet.s);
    let i = 0;
    forEach(hashSet, (v) => (newArr[i++] = fn(v)));
    return newArr;
};

export const remove = (hashSet: HashSet, value: number) => {
    let j = 0;
    while (true) {
        const k = (j++ + value) & (hashSet.v.length - 1);
        const existVal = hashSet.v[k];
        if (existVal === value) {
            hashSet.v[k] = void 0;
            hashSet.s--;
            break;
        }
        if (existVal === void 0) break;
    }
};

export const clear = (hashSet: HashSet) => {
    hashSet.v.fill(void 0);
    hashSet.s = 0;
};

const resize = (hashSet2: HashSet, newCapacity: number) => {
    const hm = createHashSet(newCapacity);
    let i = 0,
        c = 0;
    while (c < hashSet2.s) {
        const value = hashSet2.v[i];
        if (value !== void 0) {
            c++;
            let j = 0;
            while (true) {
                const k = (j++ + value) & (hm.v.length - 1);
                if (hm.v[k] === void 0) {
                    hm.v[k] = value;
                    break;
                }
            }
        }
        i++;
    }
    hashSet2.v = hm.v;
};
