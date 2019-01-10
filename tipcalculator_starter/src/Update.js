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

function update (msg, model) {
  switch (msg.type) {
    case MSGS.AMOUNT_INPUT: {
      const { billAmount } = msg.billAmount;
      return { ...model, billAmount };
      break;
    }
    case MSGS.TIP_INPUT: {
      const { tipPercent } = msg.tipPercent;
      return { ...model, tipPercent };
      break;
    }
  }
  return model;
}

export default update;
