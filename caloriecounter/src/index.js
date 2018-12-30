import app from './App';
import initModel from './Model';
import view from './View';
import update from './Update';

const node = document.getElementById('app');

app(initModel, update, view, node);