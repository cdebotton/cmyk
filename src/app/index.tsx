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

  ::selection {
    background-color: hsla(300, 100%, 50%, 0.5);
  }

  a {
    color: hsla(212, 50%, 50%, 1.0);
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
