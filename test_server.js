/**
 * Created by Mikael Lindahl (mikael) on 10/3/16.
 */

'use strict';

const Hapi = require( 'hapi' );
const handlebars = require( 'handlebars' );
const path = require( 'path' );
const Promise = require( 'bluebird' );
const debug = require( 'debug' )( 'hapi-redirect:server' )

function get_server( options ) {
    let server = new Hapi.Server();

    server.connection( { host: '0.0.0.0', port: 3000 } );

    server.register( [
        require( 'vision' ),
        {
            register: require( './index.js' ),
            options: options
        },

    ] ).then( ()=> {


        // server.views( {
        //     engines: {
        //         html: handlebars
        //     },
        //     relativeTo: __dirname,
        //     path: './views'
        //
        // } );
        //
        // server.route( [
        //     {
        //         method: 'GET',
        //         path: '/login',
        //         handler: ( request, reply )=> {
        //             reply.view( 'public' );
        //         }
        //     }
        // ] );

        server.app.readyForTest = true;

    } );
    return server
}

function start_servet( options ) {
    let server = get_server( options );

    debug( options )

    let promise = new Promise( ( resolve, reject )=> {

        server.initialize( ( err )=> {

            resolve( server )
        } )
    } );

    return promise
}

module.exports = start_servet;


