[![Build Status](https://travis-ci.org/mickelindahl/hapi_activedirectory.svg?branch=master)](https://travis-ci.org/mickelindahl/hapi_activedirectory)
[![Coverage Status](https://coveralls.io/repos/github/mickelindahl/hapi_activedirectory/badge.svg?branch=master)](https://coveralls.io/github/mickelindahl/hapi_activedirectory?branch=master)

Hapi activedirectory
====================

A small [Hapi](http://hapijs.com) plugin for ldap activedirectory authentication   

## Installation

  npm install --save hapi-activedirectory

## Usage
```js
'use strict'

const Hapi = require( 'hapi' );

const server = new Hapi.Server( { port: 3000 } );

server.register( {
    register: require( 'hapi-activedirectory' ),
    options:  {
         url: 'ldap://ad.domain.com:389',
         baseDN: 'DC=ad,DC=domain,DC=com',
         domain: 'domain', //ldap domain e.g. ad.domain.com
     };
}, ( err ) => {
    // Oh no!
} );
```

- `options` Object or list of objects with the following keys
    `url` Ldap server
    `baseDN` base DN 
    `domain` Ldap server domain 
    

## Methods

### `authenticate(user, password)`
User authentication
 
- `user` sAMAcountName
- `password` passsword for account


### `findUser(user, password)`
Find user information
 
- `user` sAMAcountName
- `password` passsword for account
    
## Tests

  Lab.cmd

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.0.1 Initial release

