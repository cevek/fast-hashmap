# fast-hashmap

## Performance over native Map

-   set - 2.5x
-   exist set - 10x
-   get - 5.5x
-   remove - 13x
-   iterate - 3.6x
-   clone - 12x

## Performance over native Set

-   add - 2.5x
-   exist add - 3x
-   has - 8.5x
-   remove - 13x
-   iterate - 3.9x
-   clone - 13x

## Limitations

-   only Int32 keys
-   unset value is equal undefined

## Size - 1kb(0.5kb gzip)
