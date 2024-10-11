const openButton = document.querySelector('.add-new-password');
const closeButton = document.querySelector('.modal-close-button');
const savePass = document.querySelector('.modal-save-button');
const modalWindow = document.querySelector('.modal-container');
const page = document.querySelector('.page');
const inputUserData = document.querySelectorAll('.modal-input');

function openModal() {
    modalWindow.classList.add('modal-open');
    page.classList.add('no-scroll');
}

function closeModal() {
    modalWindow.classList.remove('modal-open');
    page.classList.remove('no-scroll');
    for (let oneValue of inputUserData) {
        oneValue.value = '';
    }
}

openButton.addEventListener('click', openModal);
closeButton.addEventListener('click', closeModal);
// savePass.addEventListener('click', saveAuth)

function validateAuthData(data) {
    const {login, password, site} = data;

    if (!login || !password || !site) {
        return false;
    }

    return true;
}

function saveToLocalStorage(id, data) {
    localStorage.setItem(id, JSON.stringify(data));
}

function saveAuth(id, data) {
    if (!validateAuthData(data)) {
        console.error('Ошибка: не все данные заполнены!');
        return;
    }

    saveToLocalStorage(id, data);

    closeModal();
};