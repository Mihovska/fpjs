import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';

const {
  div,
  h1,
  pre,
  input,
  select,
  option
} = hh(h);

function leftUnitField(inputValue){
  return input({
      className: 'pa2 input-reset ba w-30 mb2',
      type: 'text',
      value: inputValue
    });
}

function rightUnitField(inputValue) {
  return input({
    className: 'pa2 input-reset ba w-30 mb2',
    type: 'text',
    value: inputValue
  });
}

function unitSection(dispatch, unit, value) {
  return div({ className: 'w-50 ma1' }, [
    input({
      type: 'text',
      className: 'db w-100 mv2 pa2 input-reset ba',
      value
    }),
    select(
      {
        className: 'db w-100 pa2 ba input-reset br1 bg-white ba b--black'
      },
      unitOptions(unit)
    )
  ]);
}

function leftDropdown(selectedOption) {
  return select([
    option('Fahrenheit'),
    option('Celsius'),
    option('Kelvin')
  ]);
}

function rightDropdown(selectedOption) {
  return select([
    option('Fahrenheit'),
    option('Celsius'),
    option('Kelvin')
  ]);
}


function view(dispatch, model) {
  return div({ className: 'mw6 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Temperature Unit Converter'),
    div([leftUnitField(55), ' = ', rightUnitField(22)]),
    pre(JSON.stringify(model, null, 2)),
  ]);
}

export default view;
