import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import { 
  leftInputMsg,
  rightInputMsg,
  leftDropdownMsg,
  rightDropdownMsg
} from './Update';

const {
  div,
  h1,
  pre,
  input,
  select,
  option
} = hh(h);

const UNITS = ['Fahrenheit', 'Celsius', 'Kelvin'];

function unitOptions(selectedUnit) {
  return R.map(
    unit => option({ value: unit, selected: selectedUnit === unit}, unit),
    UNITS
  )
}

function unitSection(dispatch, unit, value, oninput, onchange) {
  return div({ className: 'w-50 ma1' }, [
    input({
      type: 'text',
      className: 'db w-100 mv2 pa2 input-reset ba',
      value,
      oninput
    }),
    select(
      {
        className: 'db w-100 pa2 ba input-reset br1 bg-white ba b--black',
        onchange
      },
      unitOptions(unit)
    )
  ]);
}

function view(dispatch, model) {
  return div({ className: 'mw6 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Temperature Unit Converter'),
    // div([leftUnitField(55), ' = ', rightUnitField(22)]),
    div({ className: 'flex' }, [
      unitSection(
        dispatch,
        model.leftDropdown,
        model.leftUnitInput,
        e => dispatch(leftInputMsg(e.target.value)),
        e => dispatch(leftDropdownMsg(e.target.value))
      ),
      unitSection(
        dispatch,
        model.rightDropdown,
        model.rightUnitInput,
        e => dispatch(rightInputMsg(e.target.value)),
        e => dispatch(rightDropdownMsg(e.target.value))
      )
    ]),
    pre(JSON.stringify(model, null, 2)),
  ]);
}

export default view;
