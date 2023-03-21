import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { authenticate } from './store/session';

import LandingPage from './components/LandingPage/LandingPage';
import BusinessPage from './components/BusinessPage/BusinessPage';
import SignUpPage from './components/UserAuthorizePage/SignUpPage/SignUpPage';
import LoginPage from './components/UserAuthorizePage/LoginPage/LoginPage'
import ProfilePage from './components/ProfilePage/ProfilePage';
import CreateBusinessPage from './components/ForBusinessPage/CreateBusinessPage/CreateBusinessPage'
import EditBusinessPage from './components/ForBusinessPage/EditBusinessPage/EditBusinessPage';
import CreateReviewPage from './components/WriteReviewPage/CreateReviewPage/CreateReviewPage';
import EditReviewPage from './components/WriteReviewPage/EditReviewPage/EditReviewPage';
import AddImagePage from './components/AddImagePage/AddImagePage';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <Switch>
        <Route path='/' exact={true}>
          <LandingPage />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpPage />
        </Route>
        <Route path='/login' exact={true}>
          <LoginPage />
        </Route>
        <Route path='/businesses/:id' exact={true}>
          <BusinessPage />
        </Route>
        <Route path='/profile' exact={true}>
          <ProfilePage />
        </Route>
        <Route path='/new/business' exact={true}>
          <CreateBusinessPage />
        </Route>
        <Route path='/business/edit/:id' exact={true}>
          <EditBusinessPage />
        </Route>
        <Route path='/review/new/business/:id' exact={true}>
          <CreateReviewPage />
        </Route>
        <Route path='/review/edit/:id' exact={true}>
          <EditReviewPage />
        </Route>
        <Route path='/image/new/business/:id' exact={true}>
          <AddImagePage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
