import React from 'react';

import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import Confirm from '../src/app/components/Confirm';
import Toggle from '../src/app/containers/Toggle';

storiesOf('Toggle', module).add('default', () => (
  <Toggle>
    {({ on, setOn, setOff }) => (
      <>
        <span>State: {on ? 'on' : 'off'}</span>
        <button onClick={setOn}>On</button>
        <button onClick={setOff}>Off</button>
      </>
    )}
  </Toggle>
));

storiesOf('Confirm', module).add('active', () => (
  <Confirm
    title="Are you sure?"
    message="You are about to permanently delete this user."
    onConfirm={() => {}}
    onCancel={() => {}}
  />
));
