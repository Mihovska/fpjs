import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';

const {
  div,
  h1,
  pre,
  label,
  input,
  form
} = hh(h);


function fields(labelText, inputValue) {
  return div([
    label({className: 'db mb1'}, labelText),
    input({
      className: 'pa2 input-reset ba w-50 mb2',
      type: 'text',
      value: inputValue
    })
  ]);
}

function formView(dispatch, model) {
  const { billAmount, tipPercent } = model;

  return form(
    {
      className: 'w-100 mv2'
    },
    [
      fields('Bill Amount', billAmount),
      fields('Tip %', tipPercent)
    ]
  )
}

function view(dispatch, model) {
  return div({ className: 'mw6 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Tip Calculator'),
    formView(dispatch, model),
    pre(JSON.stringify(model, null, 2)),
  ]);
}

export default view;
