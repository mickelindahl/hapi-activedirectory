/**
 * Created by Mikael Lindahl (s057wl) on 2016-10-06.
 */

'use strict';

const ActiveDirectory = require( 'activedirectory' );
const Promise = require( 'bluebird' );

let _config;


/**
 * User authentication
 *
 * - `user` sAMAcountName
 * - `password` passsword for account
 *
 * @param {user|string}
 * @param {user|string}
 * @api public
 */
function authenticate( user, password ) {

    return new Promise( ( resolve, reject )=> {

        let username=user + '@'+_config.domain;

        let config = {
            url: _config.url,
            baseDN: _config.baseDN,
            username: username, //sAMAccountName@domain
            password: password
        };

        console.log(config)

        let ad = new ActiveDirectory( config );

        ad.authenticate( username, password, function ( err, auth ) {
            if ( err ) {
                return reject( err );
            }

            resolve( auth )

        });
    } )
}

/**
 * Find user information
 *
 * - `user` sAMAcountName
 * - `password` passsword for account
 *
 * @param {user|string}
 * @param {user|string}
 * @api public
 */
function findUser( user, password ) {

    return new Promise( ( resolve, reject )=> {

        let username=user + '@'+_config.domain;

        let config = {
            url: _config.url,
            baseDN: _config.baseDN,
            username: username, //sAMAccountName@domain
            password: password
        };

        let ad = new ActiveDirectory( config );

        ad.findUser( username, function ( err, user ) {

            if ( err ) {
                return reject( err );
            }

            resolve( user )

        } );
    } )
}

exports.register = function ( server, options, next ) {

    _config=options;

    server.method( [
        {
            name: 'ad.authenticate',
            method: authenticate,
            options: {}
        },
        {
            name: 'ad.findUser',
            method: findUser,
            options: {}
        }] );

    next();
};

exports.register.attributes = {
    name: 'hapi_activedirectory',
    version: '0.0.1'
};


