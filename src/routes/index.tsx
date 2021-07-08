import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import IndexPage from '../pages/IndexPage';
import LibraryInfoPage from '../pages/LibraryInfoPage';
import NotFoundPage from '../pages/404';

const Routes: FC = () => {
  return (
    <Switch>
      <Route exact path="/">
        <IndexPage />
      </Route>
      <Route exact path="/library/:id">
        <LibraryInfoPage />
      </Route>
      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  );
};

export default Routes;
