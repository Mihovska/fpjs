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
      return convert({ ...model, sourceLeft: true, leftUnitInput });
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
      return convert({ ...model, sourceLeft: false, rightUnitInput });
      break;
    }
    case MSGS.LEFT_DROPDOWN: {
      const { leftDropdown } = msg;
      return convert({...model, leftDropdown});
      break;
    }
    case MSGS.RIGHT_DROPDOWN: {
      const { rightDropdown } = msg;
      return convert({...model, rightDropdown});
      break;
    }
  }
  return model;
}

function convert(model){
  const { leftUnitInput, rightUnitInput, leftDropdown, rightDropdown } = model;
  
  const [fromUnit, fromTemp, toUnit] = 
    model.sourceLeft ? [leftDropdown, leftUnitInput, rightDropdown] : [rightDropdown, rightUnitInput, leftDropdown];

  const otherValue = R.pipe(
    convertFromTo,
    Math.round,
  )(fromUnit, toUnit, fromTemp);

  return model.sourceLeft ? { ...model, rightUnitInput: otherValue } : { ...model, leftUnitInput: otherValue };
}

function convertFromTo(unitFrom, unitTo, temp) {
  const convertUnit = R.pathOr(
    R.identity,
    [unitFrom, unitTo],
    unitConvertion
  );
  
  return convertUnit(temp);
  
}

function celsiusToFahrenheit(celsius){
  const fahrenheit = (celsius * (9/5)) + 32;
  return fahrenheit;
}

function fahrenheitToCelsius(fahrenheit){
  const celsius = 5/9 * (fahrenheit - 32);
  return celsius;
}

function celsiusToKelvin(celsius){
  return (celsius + 273.15);
}

function kelvinToCelsius(kelvin){
  return (kelvin - 273.15);
}

const kelvinToFahrenheit = R.pipe(kelvinToCelsius, celsiusToFahrenheit);
const fahrenheitToKelvin = R.pipe(fahrenheitToCelsius, celsiusToKelvin);

const unitConvertion = {
  Celsius: {
    Fahrenheit: celsiusToFahrenheit,
    Kelvin: celsiusToKelvin
  },
  Fahrenheit: {
    Celsius: fahrenheitToCelsius,
    Kelvin: fahrenheitToKelvin
  },
  Kelvin: {
    Celsius: kelvinToCelsius,
    Fahrenheit: kelvinToFahrenheit
  }
};

export default update;
