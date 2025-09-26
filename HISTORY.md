## 1.6.0

* Added the ability to override the architecture name use for cmake separately with the `LEVELDB_ZLIB_CMAKE_ARCH_OVERRIDE` environment variable.
* Updated `cmake-js` from `v6.3.2` to `v7.3.1`.
* The build function now has a minumum cmake version of `3.10` instead of `3.5` to stop `cmake-js` from throwing errors.
* Removed the `binary/napi_versions` field from the `package.json` file as it was preventing `cmake-js` from working on Windows.

## 1.5.0

* Added the ability for the architecture name override to force cmake to also build for that architecture.

## 1.4.1

* Added an extra debug log when installing.

## 1.4.0

* Added the ability to read `node-leveldb.node` binaries when the version portion of the path does not exactly match the version of the OS, it will try to find an exact match, and if it can't it will try to find the closest match to the version, that does exactly match the OS type and architecture.
* Added the ability to override the architecture name used in the path with the `LEVELDB_ZLIB_ARCH_OVERRIDE` environment variable.

## 1.3.0

* The build function now has a minumum cmake version of `3.5` instead of `3.2` to stop `cmake-js` from throwing errors.

## 1.2.0
* Add async iterator support for LevelDB and Iterator, use with `for await`

## 1.1.1
* Fix iterators not return all values [#8](https://github.com/extremeheat/node-leveldb-zlib/issues/8), [#9](https://github.com/extremeheat/node-leveldb-zlib/pull/9)

## 1.1.0
* Fix `LevelDB.repair()` and `LevelDB.destory()` methods, and make them static, use as such:
```js
import { LevelDB } from '@8crafter/leveldb-zlib'
await LeveDB.repair('./db')
```

## 1.0
* All LevelDB APIs now use Promise instead of callbacks
* Improve documentation

## 0.0

Initial release