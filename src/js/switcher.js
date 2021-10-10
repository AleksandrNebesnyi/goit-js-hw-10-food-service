// Импортируем элементы меню, шаблон из templates
// import '../sass/main.scss';
// import cardTemplate from '../templates/menus-card.hbs';
import menuItems from '../menu.json';
import cardTemplates from '../templates/menu-cards';
// console.log(cardTemplates);

// Выбираем элементи из HTML.
const menuList = document.querySelector('.js-menu');
const switchCheckBox = document.querySelector('#theme-switch-toggle');

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

// Функция создания разметки на основе шаблона.

function createMenuCardMarkup(menuItems) {
  //   return menuItems.map(menuItems => cardTemplate(menuItems)).join('');
  // return menuItems.map(cardTemplate).join('');
  return cardTemplates(menuItems);
}
// Генерируем все элементы
const menuMarkup = createMenuCardMarkup(menuItems);

// Вставляем элементы в разметкую
menuList.insertAdjacentHTML('beforeend', menuMarkup);

// Слушатель на переключатель
switchCheckBox.addEventListener('change', event);

function event() {
  if (switchCheckBox.checked) {
    // document.body.classList.add(Theme.DARK);
    document.body.classList.replace(Theme.LIGHT, Theme.DARK);
  } else {
    document.body.classList.replace(Theme.DARK, Theme.LIGHT);
  }
  //Сохраняем выбранную тему
  // Свойство classList возвращает псевдомассив DOMTokenList, содержащий
  // все классы элемента.
  localStorage.setItem(
    'theme',
    JSON.stringify({ theme: document.body.classList[0], checked: switchCheckBox.checked }),
  );
}

// Функция применения сохраненной темы при перезагрузке

const SetThemeAfterReload = function () {
  const saveTheme = localStorage.getItem('theme');
  if (!saveTheme) {
    document.body.classList.add(Theme.LIGHT);
  } else {
    const { theme, checked } = JSON.parse(saveTheme);
    document.body.classList.add(theme);
    switchCheckBox.checked = checked;
  }
};
SetThemeAfterReload();
