# Requirements Clarification Questions — Water Intake Tracker

Please answer each question by filling in the letter choice after the `[Answer]:` tag.
If none of the options match your needs, choose the last option (Other) and describe your preference.
Let me know when you're done.

---

## Question 1
Яку технологію для реалізації фронтенду ви надаєте перевагу?

A) React (з Vite або Create React App)
B) Vanilla JavaScript / HTML / CSS (без фреймворків)
C) Other (please describe after [Answer]: tag below)

[Answer]: A

---

## Question 2
Як повинен виглядати інтерфейс додатку?

A) Мінімалістичний — простий і функціональний, без зайвих деталей
B) Сучасний / красивий — з кольорами, анімаціями, градієнтами
C) Other (please describe after [Answer]: tag below)

[Answer]: B

---

## Question 3
Чи потрібна підтримка декількох днів (перегляд історії за минулі дні)?

A) Так — показувати статистику за попередні дні (тижень, місяць)
B) Ні — тільки поточний день (дані скидаються опівночі або вручну)
C) Other (please describe after [Answer]: tag below)

[Answer]: A

---

## Question 4
Які порції для додавання води потрібно підтримувати?

A) Тільки вказані: склянка (250 мл) і пляшка (500 мл)
B) Фіксовані + кастомна кількість (ввести довільну кількість мл вручну)
C) Повністю кастомні порції (користувач сам додає/видаляє варіанти)
D) Other (please describe after [Answer]: tag below)

[Answer]: B

---

## Question 5
Як повинна скидатись денна норма?

A) Автоматично о опівночі (новий день — лічильник обнуляється)
B) Тільки вручну (кнопка "Скинути день")
C) Обидва варіанти — і автоматично, і кнопка скидання
D) Other (please describe after [Answer]: tag below)

[Answer]: A

---

## Question 6
Чи потрібно відображати прогрес-бар або візуальну індикацію прогресу?

A) Так — прогрес-бар + відсоток виконання
B) Так — тільки числова інформація (поточне мл / ціль мл)
C) Обидва варіанти (і прогрес-бар, і числа)
D) Other (please describe after [Answer]: tag below)

[Answer]: A

---

## Question 7
Де зберігати дані між сесіями?

A) localStorage браузера (без серверу, все локально)
B) IndexedDB (локально, більша ємність)
C) Other (please describe after [Answer]: tag below)

[Answer]: A

---

## Question: Security Extensions
Чи потрібно застосовувати правила безпеки (Security Baseline) для цього проєкту?

A) Так — застосовувати всі правила БЕЗПЕКИ як обов'язкові (рекомендовано для production-додатків)
B) Ні — пропустити правила безпеки (підходить для PoC, прототипів та експериментальних проєктів)
X) Other (please describe after [Answer]: tag below)

[Answer]: A

---

## Question: Property-Based Testing Extension
Чи потрібно застосовувати правила тестування на основі властивостей (Property-Based Testing) для цього проєкту?

A) Так — застосовувати всі PBT-правила як обов'язкові (рекомендовано для проєктів з бізнес-логікою та перетвореннями даних)
B) Частково — застосовувати PBT тільки для чистих функцій та серіалізації
C) Ні — пропустити PBT правила (підходить для простих CRUD-додатків та UI-проєктів)
X) Other (please describe after [Answer]: tag below)

[Answer]: C
