var matchPairs = {"animals":[{"eng":"Badger","ru":"Барсук"},
{"eng":"Mole","ru":"Крот"},
{"eng":"Bull","ru":"Бык"},
{"eng":"Donkey","ru":"Осел"},
{"eng":"Seal","ru":"Тюлень"},
{"eng":"Camel","ru":"Верблюд"},
{"eng":"Boar","ru":"Кабан"},
{"eng":"Elk","ru":"Лось"},
{"eng":"Deer","ru":"Олень"},
{"eng":"Racoon","ru":"Енот"},
{"eng":"Rhinoceros","ru":"Носорог"},
{"eng":"Lizard","ru":"Ящерица"},
{"eng":"Dragonfly","ru":"Стрекоза"},
{"eng":"Wasp","ru":"Оса"},
{"eng":"Hornet","ru":"Шершень"},
{"eng":"Ostrich","ru":"Страус"},
{"eng":"Elephant","ru":"Слон"}],
"psyhology":
[{"eng":"Passion","ru":"Страсть"},
{"eng":"Temptation","ru":"Искушение"},
{"eng":"Sorrow","ru":"Печаль"},
{"eng":"Envy","ru":"Зависть"},
{"eng":"Pride","ru":"Гордость"},
{"eng":"Anxiety","ru":"Тревожность"},
{"eng":"Addiction","ru":"Зависимость"},
{"eng":"Behavior","ru":"Поведение"},
{"eng":"Attention","ru":"Внимание"},
{"eng":"Obedience","ru":"Послушание"},
{"eng":"Embarrassment","ru":"Смущение"},
{"eng":"Fear","ru":"Страх"},
{"eng":"Conscience","ru":"Совесть"}]}

let orderSentences = ["Have you ever been in Paris?", "He seems to be confused by what just happened.","I had my hair cut yesterday.",
"I was doing my homework when you came.",
"Illusion is the first of all pleasures.","I have not done my coursework yet","What am I supposed to do now?"
];
var orderTasks = [];
for (const i of orderSentences) {
    orderTasks.push(i.split(' '))
}
window.localStorage.setItem('matchPairs', JSON.stringify(matchPairs))
window.localStorage.setItem('orderTasks', JSON.stringify(orderTasks))

