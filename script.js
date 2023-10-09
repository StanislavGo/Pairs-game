/**
 * 1. Вибрати поле для гри - done
 * 2. Заповнити це поле карточками (гетами <li>) - done
 * 3. Зробити клік по карточці - done
 * 4. Зробити перевертання карточек - done
 *      4.1 Розмістити картинку для кожної карточки - done
 *      4.1 Показуємо картинки - done
 * 5. Якщо вибрано дві картинки то перевіряємо на схожість - done
 *      5.1 Якщо картинки сходяться то видаляємо карточки - done
 *      5.2 Якщо ні то перевернути всі вибрані карточки - done
 * 6. Якщо всі карточки видалені - вивести вікно з перезапуском гри - done
 * 7. При клікі на кнопку перезагрузити - оновлюємо сторінкуі - done
 */


let imagesType = random(1, 4);
let cardsField = document.querySelector('#cards');
let countCards = 16;
let countCards1 = 16;
let resetBlock = document.querySelector("#reset");
let resetBtn = document.querySelector("#reset-btn")
let activeLvl = 1;
let images = [];

function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

if(imagesType == 1) {
    images = [
        1,2,3,4,
        5,6,7,8,
        1,2,3,4,
        5,6,7,8
    ]
} else if(imagesType == 2) {
    images = [
        8,7,6,5,
        1,2,3,4,
        5,6,7,8,
        3,1,2,4
    ]
} else if(imagesType == 3) {
    images = [
        10,11,12,13,
        17,14,16,15,
        10,11,12,13,
        14,15,16,17
    ]
} else if(imagesType == 4) {
    14,15,16,17,
    13,11,12,10,
    16,15,14,17,
    10,11,12,13
}

let deletedCards = 0;
let deletedCards2 = 0;
let selected = [];
let pause = false;

for(let i = 0; i < countCards; i++) {
    let li = document.createElement("li");
    li.id = i;
    cardsField.appendChild(li);
}

/**
 * 1. При нажиманні на кнопку некст лвл:
 *      - Скривати модальне вікно. - done
 *      - Збільшувати кількість карточек по яким можна нажати. - done
 *      - Додати карточки - done
 *      - Збільшити розмір поля - done
 * 2. Зробити функціонал наступного рівню:
 *      - Зробити клік по карточці - done
 *      - Зробити перевертання карточек - done
 *      - Розмістити картинку для кожної карточки
 *      - Показуємо картинки - done
 *      - Якщо вибрано дві картинки то перевіряємо на схожість - done
 *      - Якщо картинки сходяться то видаляємо карточки - done
 *      - Якщо ні то перевернути всі вибрані карточки - done
 * 3. Якщо всі карточки видалені - вивести вікно з перезапуском гри - done
 * 4. При клікі на кнопку перезагрузити сторінку - done
 * 
 */

let nextLvlBtn = document.querySelector("#next-lvl");
let countCards2 = 24;

nextLvlBtn.onclick = function() {
    let c = 8;
    images = [
        14,12,5,14,1,6,
        16,12,9,10,11,13,
        1,10,13,18,19,6,
        18,16,9,5,11,19
    ];
    nextLvlBtn.style.display = "none";
    resetBtn.style.visibility = "visible";
    resetBtn.style.margin = "14px auto 0";
    countCards = countCards + c;
    cardsField.innerHTML = "";
    activeLvl = 2;
    resetBlock.style.display = "none";
    cardsField.style.width = '600px';
    cardsField.style.height = '400px';
    for(let i = 0; i < countCards; i++) {
        let li = document.createElement("li");
        li.id = i;
        cardsField.appendChild(li);
    }
}

cardsField.onclick = function(event) {
    if(pause == false) {
        let element = event.target;
        if(element.tagName == "LI" && element.className != 'active') {
            selected.push(element);
            element.className = 'active';
            let img = images[element.id];
            element.style.backgroundImage = "url(images/" + img + ".png)";
            if(selected.length == 2) {
                pause = true;
                if( images[selected[0].id] == images[selected[1].id] && activeLvl == 1 ) {
                    selected[0].style.visibility = 'hidden';
                    selected[1].style.visibility = 'hidden';
                    deletedCards = deletedCards + 2;
                } else {
                    if(images[selected[0].id] == images[selected[1].id] && activeLvl == 2) {
                    selected[0].style.visibility = 'hidden';
                    selected[1].style.visibility = 'hidden';
                    deletedCards2 = deletedCards2 + 2;
                    }
                }
                setTimeout(refreshCards, 600);
            }
        }
    }
}

function refreshCards() {
    for(let i = 0; i < countCards; i++) {
        cardsField.children[i].className = "";
        cardsField.children[i].style.backgroundImage = 'url("images/back.png")'
    }
    if(deletedCards == countCards1 && activeLvl == 1) {
        resetBlock.style.display = "block";

    } 
    if(deletedCards2 == countCards2 && activeLvl == 2) {
        resetBlock.style.display = "block";
        resetBtn.style.visibility = "vissible"
    }
    selected = [];
    pause = false;
}

resetBtn.onclick = function() {
    location.reload();
}

/**
 * 1. Зробити переміщування карточек
 *      - Для першого рівня
 *      - Для другого рівняі
 *          - За допомогою властивості switch
 */