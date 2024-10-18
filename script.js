const openButton = document.querySelector('.add-new-password');
const closeButton = document.querySelector('.modal-close-button');
const savePass = document.querySelector('.modal-save-button');
const modalWindow = document.querySelector('.modal-container');
const page = document.querySelector('.page');
const inputUserData = document.querySelectorAll('.modal-input');
const passList = document.querySelector('.list');
const passInfoContent = document.querySelector('.section-demo');
const formPassword = document.querySelector('.modal-input-wrapper');

const savedPassList = JSON.parse(localStorage.getItem('winPas')) ?? {};

renderPassList();

window.app = {};

window.app.currentPassId = Object.keys(savedPassList)[0] ?? undefined;

showPassInfo(savedPassList[window.app.currentPassId]);

formPassword.addEventListener('submit', saveAuth)

// localStorage.setItem('winPas', JSON.stringify({
//     'adobe': {
//         name: 'adobe',
//         login: 'thomas@gmail.com',
//         password: '12345',
//         webSite: 'adobe.com',
//         notes: 'loren ipsum',
//         logo: "https://i.pinimg.com/originals/57/4b/19/574b19b1ee2704b2bb9b64e9b4e69ce7.png",
//     },

// }))

passList.addEventListener('click', (event) => {
    const target = event.target;
    const currentPassword = target.closest('.list-item');
    const passId = currentPassword.dataset.passId;

    window.app.currentPassId = passId;

    const passwordInfo = getPasInfoInLocalStorage(passId);
    showPassInfo(passwordInfo);
})

passInfoContent.addEventListener('click', editAuth);
passInfoContent.addEventListener('click', deleteAuth);
passInfoContent.addEventListener('click', copeValue);
passInfoContent.addEventListener('click', showOrHidePassword);

function showPassList(pass) {
    const  passItem = createPassList(pass);
    passList.append(passItem);
}

function renderPassList() {
    passList.innerHTML = '';

    for (const key in savedPassList) {
        const passInfo = savedPassList[key];
        showPassList(passInfo);
    }
}

function getPasInfoInLocalStorage(id) {
    if (savedPassList.length) {
        return;
    }

    return savedPassList[id] ?? undefined;
}

function createPassList(data) {
    const {name, login, logo} = data;

    const listItem = document.createElement('li');
    listItem.classList.add('list-item');
    listItem.dataset.passId = name;

    const wrapperLogoLeft = document.createElement('div');
    wrapperLogoLeft.classList.add('wrapper-logo-left');

    listItem.append(wrapperLogoLeft);

    const logoImg = document.createElement('img');
    logoImg.setAttribute('src', logo);
    logoImg.classList.add('logo-one');
    logoImg.alt = 'logo';

    wrapperLogoLeft.append(logoImg);

    const wrapperSubtitleText = document.createElement('wrapper-subtitle-text');
    wrapperSubtitleText.classList.add('wrapper-subtitle-text');

    wrapperLogoLeft.append(wrapperSubtitleText);

    const logoSubtitle = document.createElement('h2');
    logoSubtitle.classList.add('logo-subtitle');
    logoSubtitle.textContent = name;

    wrapperSubtitleText.append(logoSubtitle);

    const logoTextMail = document.createElement('p');
    logoTextMail.classList.add('logo-text-mail');
    logoTextMail.textContent = login;

    wrapperSubtitleText.append(logoTextMail);

    return listItem;

}

function createButtonPanel() {
    const buttonsWrapper = document.createElement('div');
    buttonsWrapper.classList.add('buttons-wrapper');

    const buttonEdit = document.createElement('button');
    buttonEdit.classList.add('button-change', 'button-edit');

    const buttonEditImage = document.createElement('img');
    buttonEditImage.setAttribute('src', './images/path.svg');
    buttonEditImage.setAttribute('alt', 'waste-basket');

    const buttonEditText =  document.createElement('span');
    buttonEditText.classList.add('button-text');
    buttonEditText.textContent = 'Edit';

    buttonEdit.append(buttonEditImage);
    buttonEdit.append(buttonEditText);

    const buttonDelete = document.createElement('button');
    buttonDelete.classList.add('button-change', 'button-delete');

    const buttonDeleteImage = document.createElement('img');
    buttonDeleteImage.setAttribute('src', './images/waste-basket.svg');
    buttonDeleteImage.setAttribute('alt', 'pencil');

    const buttonDeleteText =  document.createElement('span');
    buttonDeleteText.classList.add('button-text');
    buttonDeleteText.textContent = 'Delete';

    buttonDelete.append(buttonDeleteImage);
    buttonDelete.append(buttonDeleteText);

    buttonsWrapper.append(buttonEdit);
    buttonsWrapper.append(buttonDelete);

    return buttonsWrapper;
}

function createPassHeader(src, name) {
    const passHeader = document.createElement('div');
    passHeader.classList.add('wrapper-logo-right');

    const passHeaderImg = document.createElement('img');
    passHeaderImg.classList.add('logo-two');
    passHeaderImg.setAttribute('src', src);

    const passHeaderName = document.createElement('h2');
    passHeaderName.classList.add('logo-subtitle-two');
    passHeaderName.textContent = name;
   
    passHeader.append(passHeaderImg);
    passHeader.append(passHeaderName);

    return passHeader;
}

function createPassInfo(data) {

    const {key, value} = data;

    let passValue = value;

    if(key === 'password') {
        // passValue = passValue.split('').map(num => '*').join('');

        
    }

    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper-demo', 'hover');

    const wrapp = document.createElement('div');

    wrapper.append(wrapp);

    const subtitle = document.createElement('h3');
    subtitle.classList.add('subtitle');
    subtitle.textContent = key;
    
    wrapp.append(subtitle);

    let newTag;

    if(key === 'password') {
        newTag = 'input';
    } else {
        newTag = 'p';
    }
    const text = document.createElement(newTag);
    
    text.classList.add('text');
    text.textContent = passValue;
    text.value = passValue
    text.setAttribute('readonly', true)
    wrapp.append(text);
    
    if(key !== 'login' && key !== 'password') {
        return wrapper;
    }

    const buttonWrapper = document.createElement('div');
    buttonWrapper.classList.add('wrapper-buttons');
    wrapper.append(buttonWrapper)
    
    const buttonCopy = document.createElement('button');
    buttonCopy.classList.add('button-copy', 'button');

    const buttonCopyImg = document.createElement('img');
    buttonCopyImg.setAttribute('src', './images/copy.svg');

    buttonCopy.append(buttonCopyImg);

    buttonWrapper.append(buttonCopy);

    if(key !== 'password') {
        return wrapper;
    }

    const buttonShowPass = document.createElement('button');
    buttonShowPass.classList.add('button-show-pass', 'button');

    const buttonShowPassImg = document.createElement('img');
    buttonShowPassImg.setAttribute('src', './images/eye.svg');

    buttonShowPass.append(buttonShowPassImg);

    buttonWrapper.append(buttonShowPass);

    return wrapper;
}

function showPassInfo(data) {

    passInfoContent.innerHTML = '';

    if (!data) {
        return;
    } 

    const {name, logo} = data;

    const buttonPanel = createButtonPanel();
    const passHeader = createPassHeader(logo, name);

    passInfoContent.append(buttonPanel);
    passInfoContent.append(passHeader);

    for (const key in data) {
        const value = data[key];
        
        if(key === 'logo' || key === 'name') {
            continue;
        }

        const passInfo = createPassInfo({key, value});
        passInfoContent.append(passInfo);
    }
}

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

function validateAuthData(data) {
    const {login, password, site} = data;

    if (!login || !password || !site) {
        return false;
    }

    return true;
}

function saveToLocalStorage(id,data) {

    const {name, login, password, notes, logo, webSite} = data;

    const savePassInfo = {
        login,
        password,
        notes,
        logo,
        webSite,
        name
    }

    savedPassList[id] = savePassInfo;

    localStorage.setItem('winPas', JSON.stringify(savedPassList));
}

function saveAuth(event) {
    event.preventDefault();
    const target = event.target;
    const formData = {};
    
    const formPassInfo = target.querySelectorAll('.modal-input');

    for (const field of formPassInfo) {
        const value = field.value;
        const name = field.name;
        console.log(field)
        formData[name] = value
    }   

    const passName = formData.name;
        
    saveToLocalStorage(passName, formData);
    savedPassList[passName] = formData;

    renderPassList();
    showPassInfo(formData);
    window.app.currentPassId = passName;
    closeModal();
};

function editAuth(event) {
    const target = event.target;
    
    if (!target.classList.contains('button-edit') && !target.closest('.button-edit')) {
        return;
    }

    const currentPass = savedPassList[window.app.currentPassId];

    const formFields = document.querySelectorAll('.modal-input');

    for (const field of formFields) {
        const fieldName = field.name;
        field.value = currentPass[fieldName];
    }

    openModal();
}

function deleteAuth(event) {
    const target = event.target;

    if (!target.classList.contains('button-delete') && !target.closest('.button-delete')) {
        return;
    }

    delete savedPassList[window.app.currentPassId];

    localStorage.setItem('winPas', JSON.stringify(savedPassList));

    renderPassList();
    showPassInfo(savedPassList[Object.keys(savedPassList)[0]]);
}

function copeValue(event) {
    const target = event.target;

    if(!target.closest('.button-copy')) {
        return;
    }

    const wrapper = target.closest('.wrapper-demo');
    const value = wrapper.querySelector('.text').textContent;

    

    navigator.clipboard.writeText(value);
}

function showOrHidePassword(event) {
    const target = event.target;
    const showButton = target.closest('.button-show-pass');
    
    if(!showButton) { 
        return;
    }

    const targetWrapper = showButton.closest('.wrapper-demo');
    const passValue = targetWrapper.querySelector('.text');
    const currentType = passValue.type;

    currentType === 'text' ? passValue.setAttribute('type', 'password') : passValue.setAttribute('type', 'text')
}