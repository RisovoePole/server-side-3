const path = require('path');
const express = require('express');

const courseRoutes = require('./routes/courseRoutes');
const logger = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Настройка шаблонизатора EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Стандартное middleware Express
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Логирование всех запросов (подключено до маршрутов)
app.use(logger);

// Маршруты приложения вынесены в routes/
app.use('/', courseRoutes);

// Неизвестный маршрут — страница 404
app.use((req, res) => {
  res.status(404).render('404', {
    title: 'Страница не найдена',
    message: 'Такого маршрута не существует',
    requestedUrl: req.originalUrl
  });
});

// Общая обработка внутренних ошибок: технические детали пользователю не показываем
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.error('[ERROR]', err);
  res.status(500).render('error', {
    title: 'Внутренняя ошибка сервера',
    message: 'При обработке запроса произошла ошибка. Пожалуйста, попробуйте позже.'
  });
});

app.listen(PORT, () => {
  console.log(`Приложение запущено: http://localhost:${PORT}`);
});
