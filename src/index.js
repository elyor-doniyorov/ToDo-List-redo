import checkItem from './checkItem.js';
import {
  onMouseOver, onMouseOut, onDragStart, onDragEnd, onDragOver,
} from './dragAndDrop.js';
import './style.css';

let toDoArr = [];
const setToDoArr = () => {
  if (JSON.parse(localStorage.getItem('myToDos'))) {
    toDoArr = JSON.parse(localStorage.getItem('myToDos'));
  } else {
    toDoArr = [{ description: 'Go to School', completed: false, index: 1 }, { description: 'Play Footbal', completed: false, index: 2 }, { description: 'Do a Homework', completed: false, index: 3 }];
  }
};
setToDoArr();

const listWrap = document.querySelector('.todo-list-wrap');

const implementToDoItems = () => {
  toDoArr.forEach((item) => {
    let isCompleted = '';
    let completedClass = '';
    if (item.completed) {
      isCompleted = 'checked';
      completedClass = 'completed-item';
    }
    listWrap.innerHTML += `<li class="list-item ${completedClass}" data-key="${item.index}" draggable="true">
    <div class="list-item-check-name">
        <input type="checkbox" class="check-item" data-key="${item.index}" ${isCompleted}>
        <input class="description-input" type="text" value="${item.description}">
      </div>
      <button type="button" data-key="${item.index}" class="move-item"><i class="fas fa-ellipsis-v"></i></button>
      <button type="button" data-key="${item.index}" class="remove-item"><i class="far fa-trash-alt"></i></button>
    </li>`;
  });
};
implementToDoItems();
const toDoChecksInputs = [...document.querySelectorAll('.list-item .check-item')];
toDoChecksInputs.forEach((item) => item.addEventListener('change', () => checkItem(item, toDoArr)));

const toDoDescriptionsInputs = [...document.querySelectorAll('.list-item .description-input')];
const descriptionOnFocus = (event, item) => {
  if (event.type === 'focusin') {
    item.parentElement.parentElement.classList.add('uncompleted-item');
    item.parentElement.parentElement.style.backgroundColor = '#fffeca';
    item.parentElement.nextElementSibling.style.display = 'none';
    [...item.parentElement.parentElement.childNodes][5].style.display = 'flex';
  } else if (event.type === 'focusout') {
    item.parentElement.parentElement.classList.remove('uncompleted-item');
    item.parentElement.parentElement.style.backgroundColor = '#fff';
    setTimeout(() => {
      [...item.parentElement.parentElement.childNodes][5].style.display = 'none';
      item.parentElement.nextElementSibling.style.display = 'flex';
    }, 1000);
  }
};
toDoDescriptionsInputs.forEach((item) => item.addEventListener('focusin', (event) => descriptionOnFocus(event, item)));
toDoDescriptionsInputs.forEach((item) => item.addEventListener('focusout', (event) => descriptionOnFocus(event, item)));

const toDoItems = [...document.querySelectorAll('.list-item')];
toDoItems.forEach((item) => {
  item.addEventListener('mouseover', (event) => onMouseOver(event, item));
  item.addEventListener('mouseout', (event) => onMouseOut(event, item));
  item.addEventListener('dragstart', (event) => onDragStart(event, item));
  item.addEventListener('drop', (event) => onDragEnd(event, item, toDoArr));
});
listWrap.addEventListener('dragover', (event) => onDragOver(event, listWrap));
