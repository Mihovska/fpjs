import * as R from 'ramda';

const MSGS = {
  LEFT_INPUT: 'LEFT_INPUT',
  RIGHT_INPUT: 'RIGHT_INPUT',
  LEFT_DROPDOWN: 'LEFT_DROPDOWN',
  RIGHT_DROPDOWN: 'RIGHT_DROPDOWN'
}

export function leftInputMsg(leftUnitInput){
  return {
    type: MSGS.LEFT_INPUT,
    leftUnitInput
  };
}

export function rightInputMsg(rightUnitInput){
  return {
    type: MSGS.RIGHT_INPUT,
    rightUnitInput
  };
}

export function leftDropdownMsg(leftDropdown){
  return {
    type: MSGS.LEFT_DROPDOWN,
    leftDropdown
  };
}

export function rightDropdownMsg(rightDropdown){
  return {
    type: MSGS.RIGHT_DROPDOWN,
    rightDropdown
  };
}

function update (msg, model) {
  switch(msg.type){
    case MSGS.LEFT_INPUT: {
      if (msg.leftUnitInput === '')
        return {...model, sourceLeft: true, leftUnitInput: '', rightUnitInput: '' };
      
      const leftUnitInput = R.pipe(
        parseInt,
        R.defaultTo(0)
      )(msg.leftUnitInput);
      return { ...model, sourceLeft: true, leftUnitInput };
      break;
    }
    case MSGS.RIGHT_INPUT: {
      if (msg.rightUnitInput === ''){
        return {...model, sourceLeft: false, leftUnitInput: '', rightUnitInput: '' };
      }
      const rightUnitInput = R.pipe(
        parseInt,
        R.defaultTo(0)
      )(msg.rightUnitInput);
      return { ...model, sourceLeft: false, rightUnitInput };
      break;
    }
    case MSGS.LEFT_DROPDOWN: {
      const { leftDropdown } = msg;
      return {...model, leftDropdown};
      break;
    }
    case MSGS.RIGHT_DROPDOWN: {
      const { rightDropdown } = msg;
      return {...model, rightDropdown};
      break;
    }
  }
  return model;
}

export default update;
