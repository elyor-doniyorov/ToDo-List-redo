/* eslint-disable import/no-cycle */
import { implementToDoItems, setToDoArr } from './index.js';
import { removeItem, updateInput } from './addRemoveUpdateClear.js';
import checkItem from './checkItem.js';
import descriptionOnFocus from './inputsOnFocus.js';

const listWrap = document.querySelector('.todo-list-wrap');
export const onMouseOver = (event, item) => {
  [...item.childNodes][3].innerHTML = '<i class="fas fa-arrows-alt"></i>';
  [...item.childNodes][3].style.color = '#545862';
};
export const onMouseOut = (event, item) => {
  [...item.childNodes][3].innerHTML = '<i class="fas fa-ellipsis-v"></i>';
  [...item.childNodes][3].style.color = '#c5c5c5';
};
export const dragAfterElement = (container, y) => {
  const draggableElements = [...container.querySelectorAll('.list-item:not(.active)')];
  return draggableElements.reduce((closes, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closes.offset) {
      return { offset, element: child };
    }
    return closes;
  }, { offset: Number.NEGATIVE_INFINITY }).element;
};
export const onDragStart = (event, item) => {
  item.style.backgroundColor = '#fffeca';
  item.classList.add('active');
};
export const onDragEnd = (event, item, arr, container) => {
  item.style.backgroundColor = '#fff';
  item.classList.remove('active');
  const newArr = [];
  arr = [...document.querySelectorAll('.list-item')];
  arr.forEach((item2, i) => {
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
};
export const onDragOver = (event, container) => {
  event.preventDefault();
  const afterElement = dragAfterElement(container, event.clientY);
  const dragElement = document.querySelector('.list-item.active');
  if (afterElement === undefined) {
    container.appendChild(dragElement);
  } else {
    container.insertBefore(dragElement, afterElement);
  }
};
