import * as R from 'ramda';

const MSGS = {
  AMOUNT_INPUT: 'AMOUNT_INPUT',
  TIP_INPUT: 'TIP_INPUT'
}

export function amountInputMsg(billAmount){
  return {
    type: MSGS.AMOUNT_INPUT,
    billAmount
  };
}

export function tipInputMsg(tipPercent){
  return {
    type: MSGS.TIP_INPUT,
    tipPercent
  };
}

function percentage(num, percent){
  return (num/100) * percent;
}
console.log(percentage(10, 15));

function totalBill(amount, tipAmount){
  return amount + tipAmount;
}
console.log(totalBill(10.00, 1.5));

function numParse(num){
  return num * 1;
}

function update (msg, model) {
  switch (msg.type) {
    case MSGS.AMOUNT_INPUT: {
      const billAmount = R.pipe(
        numParse
      )(msg.billAmount);
      return { ...model, billAmount };
      break;
    }
    case MSGS.TIP_INPUT: {
      const { tipPercent } = msg;
      return { ...model, tipPercent };
      break;
    }
  }
  return model;
}

export default update;
