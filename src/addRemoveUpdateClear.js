/* eslint-disable import/no-cycle */
import { implementToDoItems, setToDoArr } from './index.js';
import {
  onMouseOver, onMouseOut, onDragStart, onDragEnd,
} from './dragAndDrop.js';
import checkItem from './checkItem.js';
import descriptionOnFocus from './inputsOnFocus.js';

const listWrap = document.querySelector('.todo-list-wrap');
const addNewInput = document.querySelector('.add-new-input');

export const updateInput = (item) => {
  const newArr = JSON.parse(localStorage.getItem('myToDos'));
  const updateItem = newArr.filter((item2) => item2.index === Number(item.dataset.key))[0];
  const indexOfNewItem = newArr.indexOf(updateItem);
  newArr[indexOfNewItem].description = item.value;
  localStorage.setItem('myToDos', JSON.stringify(newArr));
};

export const removeItem = (item, arr, container) => {
  const newArr = JSON.parse(localStorage.getItem('myToDos'));
  const removedItem = newArr.filter((item2) => item2.index === Number(item.dataset.key))[0];
  const removedIndex = newArr.indexOf(removedItem);
  newArr.splice(removedIndex, 1);
  container.innerHTML = '';
  localStorage.setItem('myToDos', JSON.stringify(newArr));
  setToDoArr(newArr);
  implementToDoItems(newArr);
  const toDoDescriptionsInputs = [...document.querySelectorAll('.list-item .description-input')];
  toDoDescriptionsInputs.forEach((item) => item.addEventListener('focusin', (event) => descriptionOnFocus(event, item)));
  toDoDescriptionsInputs.forEach((item) => item.addEventListener('focusout', (event) => descriptionOnFocus(event, item)));
  toDoDescriptionsInputs.forEach((item) => item.addEventListener('input', () => updateInput(item)));
  arr = [...document.querySelectorAll('.list-item')];
  arr.forEach((item) => {
    item.addEventListener('mouseover', (event) => onMouseOver(event, item));
    item.addEventListener('mouseout', (event) => onMouseOut(event, item));
    item.addEventListener('dragstart', (event) => onDragStart(event, item));
    item.addEventListener('drop', (event) => onDragEnd(event, item, arr, listWrap));
  });
  const removeBtns = document.querySelectorAll('.remove-item');
  removeBtns.forEach((item) => item.addEventListener('click', () => removeItem(item, arr, container)));
  const toDoChecksInputs = [...document.querySelectorAll('.list-item .check-item')];
  toDoChecksInputs.forEach((item) => item.addEventListener('change', () => checkItem(item)));
};

export const addNewItem = (event, arr, items, container) => {
  event.preventDefault();
  const description = addNewInput.value;
  const index = arr.length + 1;
  const newItem = document.createElement('li');
  newItem.classList.add('list-item');
  newItem.dataset.key = index;
  newItem.draggable = true;
  newItem.innerHTML = `<div class="list-item-check-name">
                          <input type="checkbox" class="check-item" data-key="${index}">
                          <input class="description-input" type="text" value="${description}">
                        </div>
                        <button type="button" data-key="${index}" class="move-item"><i class="fas fa-ellipsis-v"></i></button>
                        <button type="button" data-key="${index}" class="remove-item"><i class="far fa-trash-alt"></i></button>`;
  container.insertBefore(newItem, container.children[0]);
  const newArr = [];
  items = [...document.querySelectorAll('.list-item')];
  items.forEach((item2, i) => {
    const description = item2.querySelector('.description-input').value;
    let completed = true;
    if (item2.classList.contains('completed-item')) {
      completed = true;
    } else {
      completed = false;
    }
    const index = i + 1;
    newArr.push({ description, completed, index });
  });
  container.innerHTML = '';
  localStorage.setItem('myToDos', JSON.stringify(newArr));
  setToDoArr(newArr);
  implementToDoItems(newArr);
  const toDoDescriptionsInputs = [...document.querySelectorAll('.list-item .description-input')];
  toDoDescriptionsInputs.forEach((item) => item.addEventListener('focusin', (event) => descriptionOnFocus(event, item)));
  toDoDescriptionsInputs.forEach((item) => item.addEventListener('focusout', (event) => descriptionOnFocus(event, item)));
  toDoDescriptionsInputs.forEach((item) => item.addEventListener('input', () => updateInput(item)));
  arr = [...document.querySelectorAll('.list-item')];
  arr.forEach((item) => {
    item.addEventListener('mouseover', (event) => onMouseOver(event, item));
    item.addEventListener('mouseout', (event) => onMouseOut(event, item));
    item.addEventListener('dragstart', (event) => onDragStart(event, item));
    item.addEventListener('drop', (event) => onDragEnd(event, item, arr, listWrap));
  });
  const removeBtns = document.querySelectorAll('.remove-item');
  removeBtns.forEach((item) => item.addEventListener('click', () => removeItem(item, arr, container)));
  const toDoChecksInputs = [...document.querySelectorAll('.list-item .check-item')];
  toDoChecksInputs.forEach((item) => item.addEventListener('change', () => checkItem(item)));
  addNewInput.value = '';
};

export const clearAll = (container) => {
  let newArr = JSON.parse(localStorage.getItem('myToDos'));
  newArr = newArr.filter((item) => item.completed === false);
  const newSorteredArr = [];
  newArr.forEach((item, i) => {
    const { description, completed } = item;
    const index = i + 1;
    newSorteredArr.push({ description, completed, index });
  });
  container.innerHTML = '';
  localStorage.setItem('myToDos', JSON.stringify(newSorteredArr));
  setToDoArr(newSorteredArr);
  implementToDoItems(newSorteredArr);
  const toDoDescriptionsInputs = [...document.querySelectorAll('.list-item .description-input')];
  toDoDescriptionsInputs.forEach((item) => item.addEventListener('focusin', (event) => descriptionOnFocus(event, item)));
  toDoDescriptionsInputs.forEach((item) => item.addEventListener('focusout', (event) => descriptionOnFocus(event, item)));
  toDoDescriptionsInputs.forEach((item) => item.addEventListener('input', () => updateInput(item)));
  const arr = [...document.querySelectorAll('.list-item')];
  arr.forEach((item) => {
    item.addEventListener('mouseover', (event) => onMouseOver(event, item));
    item.addEventListener('mouseout', (event) => onMouseOut(event, item));
    item.addEventListener('dragstart', (event) => onDragStart(event, item));
    item.addEventListener('drop', (event) => onDragEnd(event, item, arr, listWrap));
  });
  const removeBtns = document.querySelectorAll('.remove-item');
  removeBtns.forEach((item) => item.addEventListener('click', () => removeItem(item, arr, container)));
  const toDoChecksInputs = [...document.querySelectorAll('.list-item .check-item')];
  toDoChecksInputs.forEach((item) => item.addEventListener('change', () => checkItem(item)));
};