// фреймворк всплывающих сообщений
alertify.set('notifier','position', 'top-right');
//поиск coockiw по имени
function getCookie(name) {
    let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
// поставим дату пять дней
let date = new Date(Date.now() + 432000e3).toUTCString();
//инпут, куда вносим город
const cityInp = document.querySelector('.city-inp');
//когда DOM готов
document.addEventListener('DOMContentLoaded', function(){
    //запросим куки города и чекбоксов
    let cityCookie = getCookie('city');
    let boxCookie = getCookie('chboxes');
    //если есть cookie чакбоксов, проставим и задизейблим
    if (boxCookie !== undefined) {
        document.querySelector('input[type=button]').disabled = true;
        document.querySelectorAll('input[type=checkbox]').forEach( box => {
            box.disabled = true;
            if (boxCookie.split("").includes(box.value)) {
                box.checked = true;
            };
        })
        };
    //если есть cookie города, выведем город и ссылку удалить
    if (cityCookie !== undefined) {
        document.querySelector('.h2-city').innerHTML = `Ваш город - ${cityCookie}`;
        document.querySelector('.h2-city').style.display = 'unset';
        document.querySelector('.del-city').style.display = 'unset';
        cityInp.style.display = 'none';
    }
    //функция удаления cookie города
    document.querySelector('.del-city').addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        document.cookie = 'city=123; max-age=0';
        alertify.error('Удалено, перезагрузите страницу');
    })
    //функция добавления города
    cityInp.addEventListener('change', () => {
        if (cityInp.value) {
            document.cookie = `city=${encodeURIComponent(cityInp.value)}; expires=${date}`;
            alertify.success('Сохранено');
        }
    });
});
//сохраним чекбоксы
document.querySelector('input[type=button]').addEventListener('click', () => {
    let boxes = [];
    document.querySelectorAll('input[type=checkbox]').forEach( box => {
        if (box.checked) {
            boxes += box.value;
        }
    });
    document.cookie = `chboxes=${boxes}; expires=${date}`;
    alertify.success('Сохранено');
})