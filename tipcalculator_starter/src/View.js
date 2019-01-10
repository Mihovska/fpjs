import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import { 
  amountInputMsg,
  tipInputMsg
} from './Update';

const {
  div,
  h1,
  pre,
  label,
  input,
  form,
  tr,
  h3
} = hh(h);

function fields(labelText, inputValue, oninput) {
  return div([
    label({className: 'db mb1'}, labelText),
    input({
      className: 'pa2 input-reset ba w-50 mb2',
      type: 'text',
      value: inputValue,
      oninput
    })
  ]);
}

function calculatedAmount(text, amount){
  return div([
    h3(text),
    h3(amount)
  ]);
}

function calculatedTotal(tip, total){
  return div([
    calculatedAmount('Tip: $', tip),
    calculatedAmount('Total bill: $', total)
  ]);
}

function totalBill(amount, tipPercent){
  const tip = parseFloat(amount) * parseFloat(tipPercent) / 100 || 0;  
  return [tip,  tip + amount];
}
console.log(totalBill(10, 15));

function view(dispatch, model) {
  const { billAmount, tipPercent } = model;

  const [tip, total] = totalBill(billAmount, tipPercent);

  return div({ className: 'mw6 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Tip Calculator'),
    fields('Bill Amount', billAmount,
      e => dispatch(amountInputMsg(e.target.value))
      ),
      fields('Tip %', tipPercent,
      e => dispatch(tipInputMsg(e.target.value))
      ),
      calculatedTotal(tip, total),
    // formView(dispatch, model),
    pre(JSON.stringify(model, null, 2)),
  ]);
}

export default view;
