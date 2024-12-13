// Получаем все контейнеры с ответами
const containers = document.querySelectorAll('.test__answer');

// Добавляем обработчик событий на каждую кнопку
containers.forEach((container) => {
  const button = container.querySelector('.button');
  const circle = container.querySelector('.num');
  const extraContent = button.querySelector('.text-content');
  const isCorrect = container.querySelector('.num').getAttribute('data-correct') === 'true'; // Проверка правильности ответа

  button.addEventListener('click', function () {
    // Если кнопка уже активна, ничего не делаем
    if (button.classList.contains('active')) return;

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
const btnNext = document.querySelectorAll('.test__button');

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