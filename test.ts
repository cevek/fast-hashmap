import {createHashMap, get, remove, set} from './index.js';

const arr = Array.from({length: 10000}, (_, i) => [i, i + 1000]);
const hm = createHashMap();
for (const [k, v] of arr) {
    set(hm, k, v);
    set(hm, k, v);
}
console.assert(hm.s === 10000);
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
