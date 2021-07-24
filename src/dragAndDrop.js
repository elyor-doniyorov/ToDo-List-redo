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
export const onDragEnd = (event, item, arr) => {
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
  localStorage.setItem('myToDos', JSON.stringify(newArr));
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
