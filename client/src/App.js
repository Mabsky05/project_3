import React from 'react';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,

} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./index.css"

import Header from './components/Header';
import Signup from './components/Signup';
import Login from './components/Login';
import About from './components/About'
import Mapview from './components/Mapview'

import mapboxgl from 'mapbox-gl/dist/mapbox-gl.css';
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const httpLink = createHttpLink({
  uri: '/graphql',
});

// Attach JWT as token
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Execute Authlink prior to connecting to GraphQL 
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client} className="Mapquery">
      <Router>
          <Header />
            <Routes>
              <Route 
                path="/login"
                element={<Login />}
              />
              <Route 
                path="/signup"
                element={<Signup />}
              />
              <Route 
                path="/about"
                element={<About />}
              />
            </Routes>
            <Mapview />
      </Router>
    </ApolloProvider>
  );
}

export default App;