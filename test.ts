import {clear, createHashMap, get, map, remove, set, setAll} from './index.js';

function test(count: number) {
    const arr = Array.from({length: 10000}, (_, i) => [i, i + 20000] as [number, number]);
    const hm = createHashMap<number>();
    for (const [k, v] of arr) {
        set(hm, k, v);
        set(hm, k, v);
    }
    console.assert(hm.s === arr.length);
    for (const [k, v] of arr) {
        console.assert(v === get(hm, k));
    }
    for (const [k, v] of arr) {
        set(hm, k, k);
    }
    for (const [k, v] of arr) {
        console.assert(k === get(hm, k));
    }
    for (const [k, v] of arr) {
        remove(hm, k);
        remove(hm, k);
    }
    console.assert(hm.s === 0);
    for (const [k, v] of arr) {
        console.assert(get(hm, k) === undefined);
    }

    set(hm, 0, 1);
    console.assert(get(hm, 0) === 1);

    clear(hm);
    console.assert(hm.s === 0);

    setAll(hm, arr);
    const obj = map(hm, (v, k) => ({k, v})).reduce((obj, {k, v}) => ({...obj, [k]: v}), {} as Record<number, number>);
    for (const [k, v] of arr) {
        console.assert(obj[k] === v);
    }
    console.assert(hm.s === Object.keys(obj).length);
    console.assert(hm.s === arr.length);

    clear(hm);
    console.assert(hm.s === 0);
}
test(0);
test(3);
test(7);
test(17);
test(20);
test(50);
test(64);
test(100);
test(1000);
test(10000);
test(100000);
