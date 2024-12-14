// Получаем все контейнеры с ответами
const containers = document.querySelectorAll('.test__answer');
const btnNext = document.querySelectorAll('.test__button');


// Добавляем обработчик событий на каждую кнопку
containers.forEach((container) => {
  const button = container.querySelector('.button');
  const circle = container.querySelector('.num');
  const extraContent = button.querySelector('.text-content');
  const isCorrect = container.querySelector('.num').getAttribute('data-correct') === 'true'; // Проверка правильности ответа

  button.addEventListener('click', function () {
    
    // Если кнопка уже активна, ничего не делаем
    if (button.classList.contains('active') || button.classList.contains('disabled')) return;

    // Делаем текущую кнопку активной
    button.classList.add('active');
    circle.classList.add('active');
    
    // Показываем дополнительный текст
    extraContent.classList.remove('hidden');

    // Меняем цвета в зависимости от правильности ответа
    if (isCorrect) {
      button.classList.add('correct'); // Подсвечиваем правильный ответ
      circle.classList.add('correct'); // Подсвечиваем кружок
    } else {
      button.classList.add('incorrect'); // Подсвечиваем неправильный ответ
      circle.classList.add('incorrect'); // Подсвечиваем кружок
    }

    // Блокируем возможность клика на другие кнопки
    containers.forEach((otherContainer) => {
      const otherButton = otherContainer.querySelector('.button');
      const otherCircle = otherContainer.querySelector('.num');
      if (otherButton !== button) {
        otherButton.classList.add('disabled'); // Добавляем класс для блокировки
        otherCircle.classList.add('disabled'); // Блокируем кружки
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

            //блокирует нажатие повторно на один из вариатов в  тесте
            containers.forEach((otherContainer) => {
                const otherButton = otherContainer.querySelector('.button');
                otherButton.classList.remove('disabled');
            })
        }
    });
});


//Переход с главной на тест
const heroButton = document.querySelector('.hero__button');

heroButton.addEventListener('click', function () {
    const sectionTest = document.querySelector('.section__test')
    const sectionStart = document.querySelector('.section__start')

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
        console.log(results); // Выводим массив с результатами

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
    // Сбрасываем массив с результатами
    results = [];

    // Сбрасываем классы всех тестов
    tests.forEach((test, index) => {
        test.classList.remove('show'); // Убираем видимость всех тестов
        const testAnswers = test.querySelectorAll('.test__answer');

        // Сбрасываем состояние кнопок и кружков внутри каждого теста
        testAnswers.forEach(answer => {
            const button = answer.querySelector('.button');
            const circle = answer.querySelector('.num');
            const extraContent = button.querySelector('.text-content');

            button.classList.remove('active', 'correct', 'incorrect', 'disabled');
            circle.classList.remove('active', 'correct', 'incorrect', 'disabled');
            extraContent.classList.add('hidden');
        });
    });

    // Показываем первый тест
    tests[0].classList.add('show');
    const sectionStart = document.querySelector('.section__start')

    //
    resultOne.classList.remove('show')
    resultTwo.classList.remove('show')
    resultThree.classList.remove('show')

    // Скрываем секцию с результатами и показываем стартовую секцию
    sectionResult.classList.remove('show');
    sectionStart.classList.remove('show');
    sectionTest.classList.add('show');
}

// Добавляем обработчик сброса на кнопку возврата
buttonReturn.forEach(button => {
    button.addEventListener('click', resetApp);
});