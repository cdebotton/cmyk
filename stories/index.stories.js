import React from 'react';

import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { linkTo } from '@storybook/addon-links';
import { withNotes } from '@storybook/addon-notes';
import { storiesOf } from '@storybook/react';

import { MemoryRouter } from 'react-router';
import ButtonLink from '../src/app/components/ButtonLink';
import Confirm from '../src/app/components/Confirm';
import Toggle from '../src/app/containers/Toggle';

const InfoDecorator = storyFn => withInfo()(storyFn)();

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
), { inline: true });

storiesOf('Confirm', module)
  .add('active', () => (
    <Confirm
      title="Are you sure?"
      message="You are about to permanently delete this user."
      onConfirm={action('confirm')}
      onCancel={action('cancel')}
    />
  ), { inline: true });

storiesOf('Button link', module)
  .add('default', () => (
    <MemoryRouter>
      <div
        style={{
          backgroundColor: 'hsla(212, 50%, 50%, 1.0)',
          height: '100px',
          padding: '10px',
          width: '100px',
        }}
      >
        <ButtonLink to="/">Hi</ButtonLink>
      </div>
    </MemoryRouter>
  ), { inline: true, propTables: [ButtonLink] });
