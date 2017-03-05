cafy
===============================================
> Simple, fun, flexible query-based validator

cafyは、アサーションのようにメソッドチェーンで値のバリデーションを行うライブラリです。

[![][npm-badge]][npm-link]
[![][mit-badge]][mit]
[![][travis-badge]][travis-link]
[![][himawari-badge]][himasaku]
[![][sakurako-badge]][himasaku]

Installation
-----------------------------------------------
`npm install cafy`

Usage
-----------------------------------------------
``` javascript
cafy(value)[.anyQueries()...]
```

まずその値がどんな型でなければならないかを示し、
そのあとに追加の制約をメソッドチェーンで追加していくスタイルです。

### Examples
``` javascript
import it from 'cafy';

const x = 42;

const err1 = it(x).must.be.a.string().or('asc desc').check();
//→ xは文字列でなければならず、'asc'または'desc'でなければならない。

const err2 = it(x).must.be.a.number().required().range(0, 100).check();
//→ xは数値でなければならず、かつ0~100の範囲内でなければならない。この値は省略することはできない。

const err3 = it(x).must.be.an.array().unique().required().validate(x => x[0] != 'strawberry pasta').check();
//→ xは配列でなければならず、かつ中身が重複していてはならない。この値を省略することはできない。そして配列の最初の要素が'strawberry pasta'という文字列であってはならない。
```

### 規定値を設定する
[Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)の規定値機能を使うことができます。
``` javascript
const [val = 'desc', err] = it(x).must.be.a.string().or('asc desc').get();
//→ xは文字列でなければならず、'asc'または'desc'でなければならない。省略された場合は'desc'とする。
```

### 糖衣構文
``` javascript
const [val, err] = it(x).must.be.a.string().required().get();
```
は次のように書くこともできます:
``` javascript
const [val, err] = it(x, 'string', true);
```

### BDD風記法
must.be.a(n) の代わりに　expect とも書けます:
``` javascript
const err = it(x).expect.string().required().check();
```

### null と undefined の扱い
「値が`null`または`undefined`」な状態を「値が空である」と表現しています。
値が空である場合、バリデータやその他の処理メソッドは呼ばれません。

明示的に`null`を許可しない限り、`null`はエラーになります。
`null`を許可する場合は**nullable**をプリフィックスします:
``` javascript
const err = it(x).must.be.a.nullable.string().required().check();
```

API
-----------------------------------------------
ℹ️ 返り値が`Query`と表記されているものは、そのあとにメソッドチェーンを
繋げていくことができるということを示しています。

### 共通
#### `.required()` => `Query`
テスト対象の値は省略してはならないことを示します。
省略された場合エラーにします。

#### `.get()` => `[any, Error]`
テスト対象の値とテスト結果の配列を取得します。

#### `.check()` => `Error`
テスト結果を取得します。
テストに合格した場合は`null`を、そうでない場合は`Error`オブジェクトを返します。

#### `.isValid` => `boolean`
テストに合格したかどうかを取得します。

### Array
#### `.range(min, max)` => `Query`
`min`以上`max`以下の数の要素を持っていなければならないという制約を追加します。
要素数が指定された範囲内にない場合エラーにします。

#### `.unique()` => `Query`
ユニークな配列(=重複した値を持っていない)でなければならないという制約を追加します。
重複した要素がある場合エラーにします。

### Number
#### `.min(threshold)` => `Query`
`threshold`以上の数値でなければならないという制約を追加します。
値が`threshold`を下回る場合エラーにします。

#### `.max(threshold)` => `Query`
`threshold`以下の数値でなければならないという制約を追加します。
値が`threshold`を上回る場合エラーにします。

#### `.range(min, max)` => `Query`
`min`以上`max`以下の数値でなければならないという制約を追加します。
値が指定された範囲内にない場合エラーにします。

ℹ️ `range(30, 50)`は`min(30).max(50)`と同義です。

### String
#### `.match(pattern)` => `Query`
与えられた正規表現とマッチしていなければならないという制約を追加します。
正規表現と一致しない場合エラーにします。

#### `.or(pattern)` => `Query`
与えられたパターン内の文字列のいずれかでなければならないという制約を追加します。
`pattern`は文字列の配列またはスペースで区切られた文字列です。
どれとも一致しない場合エラーにします。

Testing
-----------------------------------------------
`npm run test`

License
-----------------------------------------------
[MIT](LICENSE)

[npm-link]:       https://www.npmjs.com/package/cafy
[npm-badge]:      https://img.shields.io/npm/v/cafy.svg?style=flat-square
[mit]:            http://opensource.org/licenses/MIT
[mit-badge]:      https://img.shields.io/badge/license-MIT-444444.svg?style=flat-square
[travis-link]:    https://travis-ci.org/syuilo/cafy
[travis-badge]:   http://img.shields.io/travis/syuilo/cafy.svg?style=flat-square
[himasaku]:       https://himasaku.net
[himawari-badge]: https://img.shields.io/badge/%E5%8F%A4%E8%B0%B7-%E5%90%91%E6%97%A5%E8%91%B5-1684c5.svg?style=flat-square
[sakurako-badge]: https://img.shields.io/badge/%E5%A4%A7%E5%AE%A4-%E6%AB%BB%E5%AD%90-efb02a.svg?style=flat-square
