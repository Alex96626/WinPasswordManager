# WinPasswordManager
Архитектура приложения 

## Логига приложения

Кнопка Добавить - при клике открывтается модальное окно с поля для воода данных\
Кнопка Редактировать - при клике открывтается модальное окно с заполненмы поля с возможность их изменения\
Кнопка Удалить - при клике происходит удаление данных из localStorage

Кнопка Сохранить (в модальном окне) сохраняет введенные даные и записывает их в localStorage

При клике на элемент в левой колонке - справа отображаются данные соответсвующие данном элемену, при этом проиходит перерисовка компонента

Кнопка Скопировать - копирует данные из поля в буфер обмена

Кнопка Отобразить - показывает пароль. заменяя звездочки на действующий пароль

## Описание функций проекта

openModal()\
Параметры: без параметров\
Открывает мадальное окно, блокирует прокрутку страницы, блюрит всю пустое пространство

сloseModal ()\
Папаметры: без параметров\
Закрывает мадальное окно, разрешает прокрутку страницы, убирает блюр, при закрытии все данные введенные в поля  - стираются

saveAuth()\
Параметры:\
{id: string, data {login:string, password:string, companyName: string, site:string, sitePicture:string, notes:string}}

Добавляет/перезаписывает данные для элемента в localStorage с идентификатором равным id\
Закрывает модалку вызовом функции сloseModal()

editAuth()\
Параметры:\
Id – идентификатор пароля в localStorage

Получить данные о пароле с идентификатором равным id\
*Открывает модальное окно функцией openModal()\
*В поля мадального окна записывает данные полученные ранее

newAuth()\
Параметры: без параметров\
Открывает модальное окно функцией openModal()

deleteAuth()\
Параметры: \
Id – идентификатор пароля в localStorage

Удаляет пароль из locacStorage с идентификатор равным id

copyAuthValue\
Папаметры: \
value – копируемое значение

копирует value в буфер обмена

renderAuthInfo()\
Параметры: \
{login:string, password:string, companyName: string, site:string, sitePicture:string, notes:string}

*Создает компонент с отрисовкой всех полей для отображения инфомрации о пароле\
*Возвращает DOM-узел

showAuthInfo()\
Параметры: \
DOM –узел

Вставляет dom узел на страницу








