import React, { SFC, ReactNode } from 'react';
import styled from 'styled-components';
import { rem, darken } from 'polished';
import { FormikProps } from 'formik';
import InputPlaceholder from '../atoms/InputPlaceholder';
import InputBorder from '../atoms/InputBorder';
import FieldState from '../../containers/FieldState';
import Reducer, { ReducerFn } from '../../containers/Reducer';
import List from './List';
import colors from '../../theme/colors';

type Option = {
  label: ReactNode;
  value: string;
};

type Props = {
  className?: string;
  options: Option[];
  placeholder?: ReactNode;
  field: {
    onChange: (e: React.ChangeEvent<any>) => void;
    onBlur: (e: any) => void;
    value: any;
    name: string;
  };
  form: FormikProps<any>;
};

const Select: SFC<Props> = ({
  className,
  field,
  placeholder,
  options,
  form,
}) => {
  const selected = options.find(o => o.value === field.value);
  const label = selected ? selected.label : '';
  const hasValue = label !== '';

  return (
    <Reducer reducer={dropdown} initialValue={false}>
      {({ value: isOpen, dispatch: dispatchDropdown }) => (
        <FieldState>
          {({ value: { isHovering }, dispatch: dispatchField }) => (
            <div className={className}>
              <SelectTarget
                onClick={() =>
                  dispatchDropdown({
                    type: 'SET_OPEN',
                    payload: !isOpen,
                  })
                }
              >
                {label}
              </SelectTarget>
              <InputBorder grow={isOpen} />
              <InputPlaceholder isLabel={hasValue}>
                {placeholder}
              </InputPlaceholder>
              {isOpen && (
                <Dropdown
                  items={options}
                  generateKey={option => `OPTION_${option.value}`}
                  renderItem={(option, index) => (
                    <DropdownItem
                      accent={index % 2 === 0}
                      onClick={() => {
                        form.setFieldValue(field.name, option.value);
                        dispatchDropdown({ type: 'SET_OPEN', payload: false });
                      }}
                    >
                      {option.label}
                    </DropdownItem>
                  )}
                />
              )}
            </div>
          )}
        </FieldState>
      )}
    </Reducer>
  );
};

export default styled(Select)`
  position: relative;
  border-bottom: 2px solid #aaa;
  margin: ${rem(32)} 0;
`;

const SelectTarget = styled.span`
  position: relative;
  width: 100%;
  padding: ${rem(5)};
  color: #eee;
  cursor: pointer;
  user-select: none;

  &:focus {
    outline: none;
  }
`;

type DropdownState = boolean;
type DropdownAction = { type: 'SET_OPEN'; payload: boolean };

const dropdown: ReducerFn<DropdownState, DropdownAction> = (state, action) => {
  switch (action.type) {
    case 'SET_OPEN':
      return action.payload;
    default:
      return state;
  }
};

const Dropdown = List.extend`
  position: absolute;
  z-index: 100;
  top: calc(100% + ${rem(5)});
  display: flex;
  overflow: hidden;
  width: 100%;
  flex-flow: column nowrap;
  background-color: ${colors.palette.dark[0]};
  border-radius: 5px;
`;

const getDropdownItemBackgroundColor = (props: { accent: boolean }) => {
  if (props.accent) {
    return darken(0.02, colors.palette.light[0]);
  }

  return colors.palette.light[0];
};

const DropdownItem = styled.button.attrs({ type: 'button' })`
  display: flex;
  flex-flow: row nowrap;
  padding: ${rem(10)};
  border: none;
  background-color: ${getDropdownItemBackgroundColor};
  color: ${colors.palette.dark[0]};
  cursor: pointer;
  user-select: none;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: ${colors.palette.dark[2]};
    color: ${colors.palette.light[0]};
  }
`;
