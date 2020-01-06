(function() {
    'use strict';
    
    let logins = prompt('Введите ваш логин', "Логан");

    let MainLogin = "Admin";
    
    if (MainLogin) {
        prompt('Введите ваш пароль, если вы админ');
    } else {
        alert('Вход закрыт');
    }
})();