## Documentation

You can see below the API reference of this module.

### `pullFromSource(path, opts, cb)`
Pulls the changes from the source repository in the forked one.

#### Params

- **String** `path`: The path to the local git repository.
- **Object** `opts`: The options passed to [`gh-fork-source`](https://github.com/IonicaBiau/gh-fork-source).
- **Function** `cb`: The callback function.

#### Return
- **EventEmitter** An event emitter emitting the following events:
 - `progress` (String): The progress message.

