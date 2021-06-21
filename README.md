# fast-hashmap

## Performance over native Map

- set - 2.5x
- set with initial capacity - 10x
- get - 5.5x
- remove - 13x
- iterate - 3.6x

## Limitations
- only integer keys
- key range -(2^30 + 1) .. (2^30 - 1)
- unset value is equal undefined

## Size - 1kb(0.5kb gzip)

