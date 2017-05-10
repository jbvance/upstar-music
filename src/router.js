import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Home from './components/Home';
import ArtistMain from './components/artists/ArtistMain';

//Don't need import statements anymore because we are using
// code splitting. We leave the first two above in b/c we assume
// they will be loaded with application instantly every time.
//import ArtistDetail from './components/artists/ArtistDetail';
//import ArtistCreate from './components/artists/ArtistCreate';
//import ArtistEdit from './components/artists/ArtistEdit';


// Done for codesplitting of routes
const componentRoutes = {
  component: Home,
  path: '/',
  indexRoute: { component: ArtistMain },
  childRoutes: [
    {
      path:'artists/new',
      getComponent(location, cb) {
        // Whenever webpack sees 'System.import', it will automatically
        // modify te bundle that is generated to split off a second bundle
        // that can be fetched dynamically to load all the code inside of it.
        //First parameter to cb is error, and we pass null for it here.
        // Second argument is the code we care about from the split off
        // module
        System.import('./components/artists/ArtistCreate')
          .then(module => cb(null, module.default));
      }
    },
    {
      path:'artists/:id',
      getComponent(location, cb) {
        System.import('./components/artists/ArtistDetail')
          .then(module => cb(null, module.default));
      }
    },
    {
      path:'artists/:id/edit',
      getComponent(location, cb) {
        System.import('./components/artists/ArtistEdit')
          .then(module => cb(null, module.default));
      }
    }
  ]
};

const Routes = () => {
  return (
    <Router history={hashHistory}  routes={ componentRoutes }/>
  );
};

export default Routes;
