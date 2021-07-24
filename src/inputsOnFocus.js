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
export default descriptionOnFocus;