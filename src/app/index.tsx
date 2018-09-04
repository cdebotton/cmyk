import { normalize } from 'polished';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { unstable_createRoot as createRoot } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { injectGlobal } from 'styled-components';
import client from './client';
import Root from './Root';

// tslint:disable-next-line no-unused-expression
injectGlobal`
  ${normalize()};

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    font-family: Roboto, sans-serif;
  }
`;

const element = document.getElementById('app');

if (!element) {
  throw new Error(`Root element "#app" doesn't exist on the DOM`);
}

const root = createRoot(element);

function app() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </ApolloProvider>
  );
}

root.render(app());
