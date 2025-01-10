// Получаем все контейнеры с ответами
const containers = document.querySelectorAll('.test__answer');
const btnNext = document.querySelectorAll('.test__button');



// Добавляем обработчик событий на каждую кнопку
// containers.forEach((container) => {
//   const button = container.querySelector('.button');
//   const circle = container.querySelector('.num');
//   const extraContent = button.querySelector('.text-content');
//   const isCorrect = container.querySelector('.num').getAttribute('data-correct') === 'true'; // Проверка правильности ответа

//   button.addEventListener('click', function () {
    
//     // Если кнопка уже активна, ничего не делаем
//     if (button.classList.contains('active') || button.classList.contains('disabled')) return;

//     // Делаем текущую кнопку активной
//     button.classList.add('active');
//     circle.classList.add('active');
    
//     // Показываем дополнительный текст
//     extraContent.classList.remove('hidden');

//     // Меняем цвета в зависимости от правильности ответа
//     if (isCorrect) {
//       button.classList.add('correct'); // Подсвечиваем правильный ответ
//       circle.classList.add('correct'); // Подсвечиваем кружок
//     } else {
//       button.classList.add('incorrect'); // Подсвечиваем неправильный ответ
//       circle.classList.add('incorrect'); // Подсвечиваем кружок
//     }

   
//     // Массив с данными для привязки ответов и элементов анимации
//     const answers = [
//         { answer: '1', img: '.test__img1', animation: '.test__img-animation1', confity: '.test__img-confity1' },
//         { answer: '2', img: '.test__img2', animation: '.test__img-animation2', confity: '.test__img-confity2' },
//         { answer: '3', img: '.test__img3', animation: '.test__img-animation3', confity: '.test__img-confity3' },
//         { answer: '4', img: '.test__img4', animation: '.test__img-animation4', confity: '.test__img-confity4' },
//         { answer: '5', img: '.test__img5', animation: '.test__img-animation5', confity: '.test__img-confity5' },
//     ];

//     // Привязываем обработчики событий через цикл
//     answers.forEach(({ answer, img, animation, confity }) => {
//         const answerElement = document.getElementById(answer);
//         const imgElement = document.querySelector(img);
//         const animationElement = document.querySelector(animation);
//         const confityElement = document.querySelector(confity);

//         answerElement.addEventListener('click', () => {
//             imgElement.classList.add('true__effect');
//             animationElement.classList.add('show');
//             confityElement.classList.add('show');
//         });
//     });

//     // Блокируем возможность клика на другие кнопки
//     containers.forEach((otherContainer) => {
//       const otherButton = otherContainer.querySelector('.button');
//       const otherCircle = otherContainer.querySelector('.num');
//       if (otherButton !== button) {
//         otherButton.classList.add('disabled'); // Добавляем класс для блокировки
//         otherCircle.classList.add('disabled'); // Блокируем кружки
//       }
//     });
//   });
// });

// Инициализация анимаций и эффектов
const answers = [
    { answer: '1', img: '.test__img1', animation: '.test__img-animation1', confity: '.test__img-confity1' },
    { answer: '2', img: '.test__img2', animation: '.test__img-animation2', confity: '.test__img-confity2' },
    { answer: '3', img: '.test__img3', animation: '.test__img-animation3', confity: '.test__img-confity3' },
    { answer: '4', img: '.test__img4', animation: '.test__img-animation4', confity: '.test__img-confity4' },
    { answer: '5', img: '.test__img5', animation: '.test__img-animation5', confity: '.test__img-confity5' },
];

// Функция добавления анимации
function triggerAnimation(answerId) {
    const { img, animation, confity } = answers.find(a => a.answer === answerId);
    document.querySelector(img).classList.add('true__effect');
    document.querySelector(animation).classList.add('show');
    document.querySelector(confity).classList.add('show');
}


// Функция сброса всех анимаций
function resetAnimations() {
    answers.forEach(({ img, animation, confity }) => {
        document.querySelector(img).classList.remove('true__effect');
        document.querySelector(animation).classList.remove('show');
        document.querySelector(confity).classList.remove('show');
    });
}

// Обработка клика на кнопку
containers.forEach((container) => {
    const button = container.querySelector('.button');
    const circle = container.querySelector('.num');
    const extraContent = button.querySelector('.text-content');
    const isCorrect = circle.getAttribute('data-correct') === 'true';
    const testBtnAction = document.querySelectorAll('.test__button-action')
    const answerTrue = container.querySelectorAll('.answer__true')
    button.addEventListener('click', function () {
        // Если кнопка уже активна, ничего не делаем
        if (button.classList.contains('active') || button.classList.contains('disabled')) return;

        // Делаем текущую кнопку активной
        button.classList.add('active');
        circle.classList.add('active');


        extraContent.classList.remove('hidden');

        // Меняем цвета в зависимости от правильности ответа
        if (isCorrect) {
            container.classList.add('answer__true')
            button.classList.add('correct');
         
            button.classList.add('magic');
            circle.classList.add('correct');
            
            containers.forEach(item => {
                item.classList.add('varfalse')
            })

            triggerAnimation(container.id); // Включаем анимацию
        } else {
            button.classList.add('incorrect');
            circle.classList.add('incorrect');
        }

        // Активируем кнопку перехода, если выбран вариант
        btnNext.forEach(button => {
            button.disabled = false;
            button.style.pointerEvents = 'auto';
        });

        // Блокируем возможность клика на другие кнопки
        containers.forEach((otherContainer) => {
            const otherButton = otherContainer.querySelector('.button');
            const otherCircle = otherContainer.querySelector('.num');
            if (otherButton !== button) {
                otherButton.classList.add('disabled');
                otherCircle.classList.add('disabled');
            }
        });
    });
});





// Получаем все контейнеры с тестами
const tests = document.querySelectorAll('.test');
btnNext.forEach((button, index) => {
    button.addEventListener('click', function () {
        
        // Скрываем текущий тест
        tests[index].classList.remove('show');

        // Показываем следующий тест, если он есть
        if (index + 1 < tests.length) {
            tests[index + 1].classList.add('show');
            btnNext.forEach(button => {
                button.classList.add('disabled')
                button.disabled = true;
                button.style.pointerEvents = 'none';
            });
            //блокирует нажатие повторно на один из вариатов в тесте
            containers.forEach((otherContainer) => {
                const otherButton = otherContainer.querySelector('.button');
                otherButton.classList.remove('disabled');
            })
        }

    });

});


//Переход с главной на тест
const heroButton = document.querySelector('.hero__button');
const sectionStart = document.querySelector('.section__start')
heroButton.addEventListener('click', function () {
    const sectionTest = document.querySelector('.section__test')

    sectionStart.classList.add('hidden')
    sectionTest.classList.add('show')

})


//подсчитывать правильные ответы
let resultQuestion = document.querySelectorAll('.test__answer');
let results = [];
resultQuestion.forEach(inner => {
    inner.addEventListener('click', function handleClick() {
        // Если кнопка уже выбрана, ничего не делаем
        if (inner.classList.contains('selected')) return;

        // Добавляем текущий выбор в массив
        results.push(inner.dataset.result);
        // console.log(results); // Выводим массив с результатами


        // Отмечаем выбранный элемент
        inner.classList.add('selected');

        // Блокируем остальные кнопки
        resultQuestion.forEach(other => {
            if (other !== inner) {
                other.classList.add('disabled'); // Визуально отключаем
                other.style.pointerEvents = 'none'; // Отключаем клики
            }
        });
    });
});




// Обработчик для кнопки, который сбрасывает все действия
btnNext.forEach(button => {
    button.addEventListener('click', function () {
        // Убираем все выбранные классы
        resultQuestion.forEach(inner => {
            inner.classList.remove('selected');
            inner.classList.remove('disabled');
            inner.style.pointerEvents = 'auto'; // Восстанавливаем возможность клика
        });        
        containers.forEach(item => {
            item.classList.remove('varfalse')
        })
    });

});

const btnResult = document.querySelector('.btn__result');
const sectionResult = document.querySelector('.section__result');
const resultOne = document.querySelector('.result1')
const resultTwo = document.querySelector('.result2')
const resultThree = document.querySelector('.result3')
const sectionTest = document.querySelector('.section__test')

btnResult.addEventListener('click', function() {
    let sum = 0;

    results.forEach(item => {
        if(item === 'true') {
            sum++
        }
    })

    switch (sum){
        case 0:
        case 1:
        case 2:
            sectionTest.classList.remove('show')
            sectionResult.classList.add('show')
            resultThree.classList.add('show')
            break;
        case 3:
        case 4:
            sectionTest.classList.remove('show')
            sectionResult.classList.add('show')
            resultTwo.classList.add('show')
            break;
        case 5: 
            sectionTest.classList.remove('show')
            sectionResult.classList.add('show')
            resultOne.classList.add('show')
            break;
    }
})




//пройти тест заново
const buttonReturn = document.querySelectorAll('.button__return')


// Функция сброса приложения
function resetApp() {
    results = []; // Очищаем массив результатов

    // Сбрасываем состояние кнопок, кружков и текста
    containers.forEach((container) => {
        const button = container.querySelector('.button');
        const circle = container.querySelector('.num');
        const extraContent = button.querySelector('.text-content');
        
        button.classList.remove('active', 'correct', 'incorrect', 'disabled', 'magic');
        circle.classList.remove('active', 'correct', 'incorrect', 'disabled');

        extraContent.classList.add('hidden');
        container.classList.remove('answer__true')
    });

    // Сбрасываем анимации
    resetAnimations();

    // Переключаем видимость секций
    tests.forEach((test) => test.classList.remove('show'));
    tests[0].classList.add('show'); // Показываем первый тест

    sectionResult.classList.remove('show');
    sectionStart.classList.remove('show');
    sectionTest.classList.add('show');

    // Сбрасываем отображение результатов
    resultOne.classList.remove('show');
    resultTwo.classList.remove('show');
    resultThree.classList.remove('show');

    btnNext.forEach(button => {
        button.disabled = true;
        button.style.pointerEvents = 'none';
    });
}

// Добавляем обработчик сброса на кнопку возврата
buttonReturn.forEach(button => {
    button.addEventListener('click', resetApp);
});

const infoBtn = document.querySelector('.info-btn');
const infoBlock = document.querySelector('.info-block');

infoBtn.addEventListener('click', () => {
  infoBlock.classList.toggle('show');
});


AOS.init();