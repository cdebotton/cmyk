import React from 'react';
import { unstable_createRoot as createRoot } from 'react-dom';
import Root from './Root';

const element = document.getElementById('app');

if (!element) {
  throw new Error(`Root element "#app" doesn't exist on the DOM`);
}

const root = createRoot(element);

function app() {
  return <Root />;
}

root.render(app());
