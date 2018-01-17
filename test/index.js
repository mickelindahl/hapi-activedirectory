/**
 * Created by Mikael Lindahl (s057wl) on 2016-10-17.
 */

'use strict';

const Lab = require( 'lab' );
const code = require( 'code' );
const debug = require( 'debug' )( 'hapi_activedirectory:test' );
const start_server = require( '../test_server.js' );
const mock = require( 'mock-require' );

let lab = exports.lab = Lab.script();


function ad() {
    return {
        authenticate: function ( user, password, done ) {

            if ( user == 'sam@domain' &&  password=='secret') {
                return done( null, true )
            } else if ( user == 'hank@domain' ) {
                return done( null, false )
            } else {
                return done( 'error', null )
            }
        },
        findUser: function ( user, done ) {

            if ( user == 'sam@domain' ) {
                return done( null, true )
            } else if ( user == 'hank@domain' ) {
                return done( null, false )
            } else {
                return done( 'error', null )
            }
        }
    }
}

mock( 'activedirectory', ad );


let options = {
    url: 'ad.domain.com',
    baseDN: 'DC=ad,DC=domain,DC=com',
    domain: 'domain', //ldap domain e.g. ad.domain.com
};

lab.experiment( 'activedirectory', ()=> {


    // lab.test( 'authenticate', ( done )=> {
    //
    //     start_server( options ).then( ( server )=> {
    //
    //         let user = 'sam'; //sAMAccountName
    //         let password = 'secret';
    //
    //         server.methods.ad.authenticate(user, password).then(( auth  ) => {
    //
    //             code.expect(auth).to.be.true();
    //             done()
    //
    //         } )
    //     } ).catch(err=>{
    //         debug(err)
    //     })
    // } );
    //
    // lab.test( 'unauthenticate', ( done )=> {
    //
    //     start_server( options ).then( ( server )=> {
    //
    //         let user = 'hank'; //sAMAccountName
    //         let password = 'secret';
    //
    //         server.methods.ad.authenticate(user, password).then(( auth  ) => {
    //
    //             code.expect(auth).to.be.false();
    //             done()
    //
    //         } )
    //     } ).catch(err=>{
    //         debug(err)
    //     })
    //
    // } );
    //
    //
    // lab.test( 'authenticate error', ( done )=> {
    //
    //     start_server( options ).then( ( server )=> {
    //
    //         let user = 'max'; //sAMAccountName
    //         let password = 'secret';
    //
    //         server.methods.ad.authenticate(user, password).then(( auth  ) => {
    //
    //         } ).catch(err=>{
    //
    //             code.expect(err).to.equal('error');
    //             done()
    //
    //         });
    //     } ).catch(err=>{
    //         debug(err)
    //     })
    //
    // } );
    //
    //
    // lab.test( 'findUser', ( done )=> {
    //
    //     start_server( options ).then( ( server )=> {
    //
    //         let user = 'sam'; //sAMAccountName
    //         let password = 'secret';
    //
    //         server.methods.ad.findUser(user, password).then(( auth  ) => {
    //
    //             code.expect(auth).to.be.true();
    //             done()
    //
    //         } )
    //     } ).catch(err=>{
    //         debug(err)
    //     })
    // } );
    //
    // lab.test( 'not findUser', ( done )=> {
    //
    //     start_server( options ).then( ( server )=> {
    //
    //         let user = 'hank'; //sAMAccountName
    //         let password = 'secret';
    //
    //         server.methods.ad.findUser(user, password).then(( auth  ) => {
    //
    //             code.expect(auth).to.be.false();
    //             done()
    //
    //         } )
    //     } ).catch(err=>{
    //         debug(err)
    //     })
    //
    // } );
    //
    //
    // lab.test( 'findUser error', ( done )=> {
    //
    //     start_server( options ).then( ( server )=> {
    //
    //         let user = 'max'; //sAMAccountName
    //         let password = 'secret';
    //
    //         server.methods.ad.findUser(user, password).then(( auth  ) => {
    //
    //         } ).catch(err=>{
    //
    //             code.expect(err).to.equal('error');
    //             done()
    //
    //         });
    //     } ).catch(err=>{
    //         debug(err)
    //     })
    //
    // } );

    lab.test( 'hot authenticate', ( done )=> {

        mock.stop( 'activedirectory');

        // Clear node cache
        for (let key in require.cache){
            delete require.cache[key]
        }

        require( 'dotenv' ).config({silent:true});

        if (process.env.AD_URL){
            options = {
                url: process.env.AD_URL,
                baseDN: process.env.AD_BASEDN,
                domain:  process.env.AD_DOMAIN, //ldap domain e.g. ad.domain.com

            };

            start_server( options ).then( ( server )=> {

                let user = process.env.AD_USER; //sAMAccountName
                let password =  process.env.AD_PASSWORD;

                server.methods.ad.authenticate(user, password).then(( auth  ) => {

                    code.expect(auth).to.be.true();
                    done()

                } ).catch(err=>{

                });
            } ).catch(err=>{
                console.error(err)
                done()
            })
        }else{

            debug('Skipping test hot authenticate')
            done()

        }

    } );

    //
    // lab.test( 'hot findUser', ( done )=> {
    //
    //     mock.stop( 'activedirectory');
    //
    //     // Clear node cache
    //     for (let key in require.cache){
    //         delete require.cache[key]
    //     }
    //
    //     require( 'dotenv' ).config({silent:true});
    //
    //     if (process.env.AD_URL){
    //         options = {
    //             url: process.env.AD_URL,
    //             baseDN: process.env.AD_BASEDN,
    //             domain:  process.env.AD_DOMAIN, //ldap domain e.g. ad.domain.com
    //
    //         };
    //
    //         start_server( options ).then( ( server )=> {
    //
    //             let user = process.env.AD_USER; //sAMAccountName
    //             let password =  process.env.AD_PASSWORD;
    //
    //             server.methods.ad.findUser(user, password).then(( user  ) => {
    //
    //                 debug(user)
    //                 code.expect(user.sAMAccountName).to.equal(process.env.AD_USER.toUpperCase());
    //                 done()
    //
    //             } ).catch(err=>{
    //
    //                 console.error(err)
    //                 done()
    //
    //             });
    //         } ).catch(err=>{
    //             console.error(err)
    //             done()
    //         })
    //     }else{
    //
    //         debug('Skipping test hot authenticate')
    //         done()
    //
    //     }
    //
    // } );

} );