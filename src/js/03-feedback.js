// 1)(DONE!)Отслеживай на форме событие input,
// и каждый раз записывай в локальное хранилище объект с полями email и message,
// в которых сохраняй текущие значения полей формы.Пусть ключом для хранилища будет строка "feedback-form-state".
//
// 2)(DONE?)При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные данные,
// заполняй ими поля формы.В противном случае поля должны быть пустыми.
//
// 3)При сабмите формы очищай хранилище и поля формы, а также выводи объект с полями email,
// message и текущими их значениями в консоль.
//
// 4)Сделай так, чтобы хранилище обновлялось не чаще чем раз в 500 миллисекунд.
// Для этого добавь в проект и используй библиотеку lodash.throttle.
import throttle from 'lodash.throttle';


const STORAGE_KEY = 'feedback-form-state';
const formData = {};

const refs = {
  form: document.querySelector('.feedback-form')
}


refs.form.addEventListener('input', throttle(onFormInput,500));

refs.form.addEventListener('submit', onFormSubmit);

onPopulateTextarea();


function onFormInput(evt) {
  formData.email = refs.form.email.value;
  formData.message = refs.form.message.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

function onFormSubmit(evt) {
  evt.preventDefault();

   const formDataToSend = new FormData(evt.currentTarget);
    formDataToSend.forEach((value, name) => {
    formData[name] = value;
    });

  evt.currentTarget.reset();

  localStorage.removeItem(STORAGE_KEY);

  console.log(formData);
 };



function onPopulateTextarea() {
  const saveMessage = localStorage.getItem(STORAGE_KEY);

  if (saveMessage) {
    const { email, message } = JSON.parse(saveMessage);

    refs.form.email.value = email;
    refs.form.message.value = message;
    formData.email = email;
    formData.message = message;
  }
  // if (formData.email) {
  //   refs.email.value = formData.email;
  // }
  // if (formData.message) {
  //   refs.textarea.value = formData.message;
  // }
}
