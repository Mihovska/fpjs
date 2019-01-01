import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import { 
  showFormMsg,
  mealInputMsg,
  caloriesInputMsg,
  saveMealMsg,
} from './Update';

const { pre, div, h1, button, form, label, input, tr, td, tbody, th, thead, table } = hh(h);

function fieldSet(labelText, inputValue, oninput) {
  return div([
    label({ className: 'db mb1' }, labelText),
    input({
      className: 'pa2 input-reset ba w-100 mb2',
      type: 'text',
      value: inputValue,
      oninput
    }),
  ]);
}

function buttonSet(dispatch) {
  return div([
    button(
      {
        className: 'f3 pv2 ph3 bg-blue white bn mr2 dim',
        type: 'submit',
      },
      'Save',
    ),
    button(
      {
        className: 'f3 pv2 ph3 bn bg-light-gray dim',
        type: 'button',
        onclick: () => dispatch(showFormMsg(false)),
      },
      'Cancel',
    ),
  ]);
}

function formView(dispatch, model) {
  const { description, calories, showForm } = model;
  if (showForm) {
    return form(
      {
        className: 'w-100 mv2',
        onsubmit: e => {
          e.preventDefault();
          dispatch(saveMealMsg);
        },
      },
      [
        fieldSet('Meal', description,
          e => dispatch(mealInputMsg(e.target.value))
        ),
        fieldSet('Calories', calories || '',
          e => dispatch(caloriesInputMsg(e.target.value))
        ),
        buttonSet(dispatch),
      ],
    );
  }
  return button( 
      { 
        className: 'f3 pv2 ph3 bg-blue white bn',
        onclick: () => dispatch(showFormMsg(true)),
      },
      'Add Meal',
    );
}

function cell(tag, className, value) {
  return tag({ className }, value );
};

function mealRow(className, meal) {
  return tr({ className }, [
    cell(td, 'pa2', meal.description),
    cell(td, 'pa2', meal.calories),
    cell(td, 'pa2 tr', 'test')
  ]);
};

function mealsBody(className, meals) {
  const rows = R.map(R.partial(mealRow, ['stripe-dark']), meals);
  return tbody({ className }, rows);
};

function headerRow() {
  return ([
    cell(th, 'pa2 tl', 'Meal'),
    cell(th, 'pa2 tr', 'Calories'),
    cell(th, 'pa2 tr', '')
  ])
};

function tableHeader() {
  return thead(headerRow());
};

function totalRow(className, meals) {
  const takeCalories = function(mealsItem) {
    return mealsItem.calories;
  }
  const totalAmount = R.pipe(R.map(takeCalories), R.sum);
  return tr({ className }, [
    cell(td, 'pa2 tr', 'Total: '),
    cell(td, 'pa2 tr', totalAmount(meals)),
    cell(td, 'pa2 tr', '')
  ]);
};

function tableView(className, model) {
  const { meals } = model;
 return table({ className }, [
   tableHeader(),
   mealsBody('', meals),
   totalRow('', meals)
 ])
};

function view(dispatch, model) {
  return div({ className: 'mw6 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Calorie Counter'),
    formView(dispatch, model),
    tableView('', model)
  ]);
}

export default view;