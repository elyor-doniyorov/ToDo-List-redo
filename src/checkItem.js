const checkItem = (btn) => {
  const newArr = JSON.parse(localStorage.getItem('myToDos'));
  const arrElement = newArr.filter((item) => item.index === Number(btn.dataset.key))[0];
  const indexOfArrElement = newArr.indexOf(arrElement);
  if (btn.checked) {
    btn.parentElement.parentElement.classList.add('completed-item');
    btn.parentElement.parentElement.style.backgroundColor = '#fff';
    newArr[indexOfArrElement].completed = true;
  } else {
    btn.parentElement.parentElement.classList.remove('completed-item');
    btn.parentElement.parentElement.style.backgroundColor = '#fff';
    newArr[indexOfArrElement].completed = false;
  }
  localStorage.setItem('myToDos', JSON.stringify(newArr));
};
export default checkItem;
