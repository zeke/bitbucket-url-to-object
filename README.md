# bitbucket-url-to-object  [![Build Status](https://travis-ci.org/zeke/bitbucket-url-to-object.png?branch=master)](https://travis-ci.org/zeke/bitbucket-url-to-object)

A node module that extracts useful properties like `user` and
`repo` from various flavors of bitbucket URLs.

There's also a GitHub equivalent to this library: [github-url-to-object](https://github.com/zeke/github-url-to-object).

## Installation

```sh
npm install bitbucket-url-to-object --save
```

## Usage

Pass whatever flavor of bitbucket URL you like:

```js
var bb = require('bitbucket-url-to-object')

bb('monkey/business')
bb('bitbucket:monkey/business')
bb('https://bitbucket.org/monkey/business')
bb('https://bitbucket.org/monkey/business.git')
bb('http://bitbucket.org/monkey/business')
bb('git://bitbucket.org/monkey/business.git')
```

Here's what you'll get:

```js
{
  user: 'monkey',
  repo: 'business',
  branch: 'master',
  https_url: 'https://bitbucket.org/monkey/business',
  tarball_url: 'https://bitbucket.org/monkey/business/get/master.tar.gz'
  travis_url: 'https://travis-ci.org/monkey/business',
}
```

The shorthand format lets you specify a branch:

```js
  bb('monkey/business#nachos')
{
  user: 'monkey',
  repo: 'business',
  branch: 'nachos',
  https_url: 'https://bitbucket.org/monkey/business/tree/nachos',
  tarball_url: 'https://bitbucket.org/monkey/business/get/nachos.tar.gz'
  travis_url: 'https://travis-ci.org/monkey/business',
}
```

If you provide a non-bitbucket URL or a falsy value, you'll get `null`.

## Test

```sh
npm install
npm test
```

## License

MIT
