import {clear, createHashSet, has, map, remove, add, addAll} from './HashSet.js';

function test(count: number) {
    const arr = Array.from({length: count}, (_, i) => i);
    const hs = createHashSet();
    for (const v of arr) {
        add(hs, v);
        add(hs, v);
    }
    console.assert(hs.s === arr.length);
    for (const v of arr) {
        console.assert(has(hs, v));
    }
    for (const v of arr) {
        add(hs, v);
    }
    for (const v of arr) {
        console.assert(has(hs, v));
    }
    for (const v of arr) {
        remove(hs, v);
        remove(hs, v);
    }
    console.assert(hs.s === 0);
    for (const v of arr) {
        console.assert(!has(hs, v));
    }

    add(hs, 0);
    console.assert(has(hs, 0));

    clear(hs);
    console.assert(hs.s === 0);

    addAll(hs, arr);
    const obj = new Set(map(hs, (v) => v));
    for (const v of arr) {
        console.assert(obj.has(v));
    }
    console.assert(hs.s === obj.size);
    console.assert(hs.s === arr.length);

    clear(hs);
    console.assert(hs.s === 0);
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
