import { FieldProps } from 'formik';
import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';

interface Option<T> {
  value: T;
  label: ReactNode;
}

interface Props<T> extends FieldProps<any> {
  className?: string;
  label: ReactNode;
  options: Option<T>[];
}

const SelectContainer = styled.div``;

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SelectLabel = styled.div``;

const OptionList = styled.ul`
  position: absolute;
  list-style: none;
  padding: 0;
  margin: 0;
  top: 100%;
`;

const Option = styled.li`
  cursor: pointer;
`;

function Select<T extends string>({
  className,
  options,
  form,
  field,
  ...props
}: Props<T>) {
  const [open, setOpen] = useState(false);
  const selected = options
    .map<[ReactNode, T]>(({ label, value: optionValue }) => [
      label,
      optionValue,
    ])
    .find(([_, optionValue]) => optionValue === field.value);

  let selectedLabel: ReactNode;
  if (!selected) {
    selectedLabel = props.label;
  } else {
    [selectedLabel] = selected;
  }

  return (
    <SelectContainer className={className}>
      <SelectWrapper>
        <SelectLabel onClick={() => setOpen(prevOpen => !prevOpen)}>
          {selectedLabel}
        </SelectLabel>
        {open && (
          <OptionList>
            {options.map(option => (
              <Option
                key={`OPTION_${field.name}_${option.value}`}
                onClick={event => {
                  form.setFieldValue(field.name, option.value);
                  setOpen(false);
                }}
              >
                {option.label}
              </Option>
            ))}
          </OptionList>
        )}
      </SelectWrapper>
    </SelectContainer>
  );
}

export default Select;
