import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { authenticate } from './store/session';

import LandingPage from './components/LandingPage/LandingPage';
import BusinessPage from './components/BusinessPage/BusinessPage';
import SignUpPage from './components/Authorized/SignUpPage/SignUpPage';
import LoginPage from './components/Authorized/LoginPage/LoginPage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import CreateBusinessPage from './components/ForBusinessPage/CreateBusinessPage/CreateBusinessPage'
import EditBusinessPage from './components/ForBusinessPage/EditBusinessPage/EditBusinessPage';

// import ProtectedRoute from './components/auth/ProtectedRoute';
// import UsersList from './components/UsersList';
// import User from './components/User';

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
        <Route path='/business/new' exact={true}>
          <CreateBusinessPage />
        </Route>
        <Route path='/business/edit/:id' exact={true}>
          <EditBusinessPage />
        </Route>
      </Switch>

      {/* <Switch>
      <NavigationBar />
        <Route path='/' exact={true}>
          <LandingPage />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/myprofile' exact={true}>
          <ProfilePage />
        </Route>
        <Route path='/businesses/:id' exact={true}>
          <BusinessPage />
        </Route>
      </Switch> */}
    </>
    // <BrowserRouter>
    //   <NavBar />
    //   <Switch>
    //     <Route path='/login' exact={true}>
    //       <LoginForm />
    //     </Route>
    //     <Route path='/sign-up' exact={true}>
    //       <SignUpForm />
    //     </Route>
    //     <ProtectedRoute path='/users' exact={true} >
    //       <UsersList/>
    //     </ProtectedRoute>
    //     <ProtectedRoute path='/users/:userId' exact={true} >
    //       <User />
    //     </ProtectedRoute>
    //     <Route path='/' exact={true} >
    //       <h1>My Home Page</h1>
    //     </Route>
    //   </Switch>
    // </BrowserRouter>
  );
}

export default App;
