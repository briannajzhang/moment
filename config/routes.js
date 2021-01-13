/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'layouts/general/home' },
  '/signup': { view: 'layouts/general/signup_page' },
  '/login': { view: 'layouts/general/login_page' },
  '/forgot': { view: 'layouts/reset/forgot_page' },
  '/reset': { view: 'layouts/reset/reset_page' },

  '/homepage': { view: 'layouts/homepage' },

  'GET /user/confirm': 'user/confirm',

  'POST /user/register': 'user/register',
  'POST /user/login': 'user/login',
  'POST /user/forgot-password': 'user/forgot-password',
  'POST /user/reset-password': 'user/reset-password',
  


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/

};
