/* eslint-disable import/no-cycle, no-unused-vars */
import checkItem from './checkItem.js';
import descriptionOnFocus from './inputsOnFocus.js';
import {
  onMouseOver, onMouseOut, onDragStart, onDragEnd, onDragOver,
} from './dragAndDrop.js';
import {
  addNewItem, clearAll, updateInput, removeItem,
} from './addRemoveUpdateClear.js';
import './style.css';

let toDoArr = [];
export const setToDoArr = () => {
  if (JSON.parse(localStorage.getItem('myToDos'))) {
    toDoArr = JSON.parse(localStorage.getItem('myToDos'));
  } else {
    toDoArr = [];
  }
};
setToDoArr();

const listWrap = document.querySelector('.todo-list-wrap');

export const implementToDoItems = (arr) => {
  arr.forEach((item) => {
    let isCompleted = '';
    let completedClass = '';
    if (item.completed) {
      isCompleted = 'checked';
      completedClass = 'completed-item';
    }
    listWrap.innerHTML += `<li class="list-item ${completedClass}" data-key="${item.index}" draggable="true">
    <div class="list-item-check-name">
        <input type="checkbox" class="check-item" data-key="${item.index}" ${isCompleted}>
        <input class="description-input" data-key="${item.index}" type="text" value="${item.description}">      </div>
      <button type="button" data-key="${item.index}" class="move-item"><i class="fas fa-ellipsis-v"></i></button>
      <button type="button" data-key="${item.index}" class="remove-item"><i class="far fa-trash-alt"></i></button>
    </li>`;
  });
};
implementToDoItems(toDoArr);
const toDoChecksInputs = [...document.querySelectorAll('.list-item .check-item')];
toDoChecksInputs.forEach((item) => item.addEventListener('change', () => checkItem(item)));

const toDoDescriptionsInputs = [...document.querySelectorAll('.list-item .description-input')];
toDoDescriptionsInputs.forEach((item) => item.addEventListener('focusin', (event) => descriptionOnFocus(event, item)));
toDoDescriptionsInputs.forEach((item) => item.addEventListener('focusout', (event) => descriptionOnFocus(event, item)));

const toDoItems = [...document.querySelectorAll('.list-item')];
toDoItems.forEach((item) => {
  item.addEventListener('mouseover', (event) => onMouseOver(event, item));
  item.addEventListener('mouseout', (event) => onMouseOut(event, item));
  item.addEventListener('dragstart', (event) => onDragStart(event, item));
  item.addEventListener('drop', (event) => onDragEnd(event, item, toDoItems, listWrap));
});
listWrap.addEventListener('dragover', (event) => onDragOver(event, listWrap));

const addNewButton = document.querySelector('.add-new-btn');
addNewButton.addEventListener('click', (event) => addNewItem(event, toDoArr, toDoItems, listWrap));

const clearAllBtn = document.querySelector('.clear-all');
clearAllBtn.addEventListener('click', () => clearAll(listWrap));
