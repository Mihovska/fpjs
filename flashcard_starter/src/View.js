import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';

const { div, h1, pre, button, i } = hh(h);

function add_button(dispatch) {
  return div([
    button({
      className: 'pa2 br1 mv2 bg-green bn white'},
      'Add Flashcard',
      i({className: 'fa fa-plus ph1'})
      ), 
  ])
}

function view(dispatch, model) {
  return div({ className: 'mw8 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Flashcard Study'),
    add_button(dispatch),
    pre(JSON.stringify(model, null, 2)),
  ]);
}

export default view;
