// Валидация данных формы добавления/редактирования курса.
// Ошибки складываются в req.errors, answered форму показывает контроллер.

function validateCourse(req, res, next) {
  const body = req.body || {};
  const errors = [];

  const asText = (value) => (typeof value === 'string' ? value.trim() : '');

  body.title = asText(body.title);
  body.teacher = asText(body.teacher);
  body.description = asText(body.description);
  if (typeof body.credits === 'string') body.credits = body.credits.trim();
  if (typeof body.semester === 'string') body.semester = body.semester.trim();

  if (!body.title) {
    errors.push('Название дисциплины обязательно');
  }

  if (!body.teacher) {
    errors.push('Преподаватель обязателен');
  }

  if (!body.credits) {
    errors.push('Количество кредитов обязательно');
  } else {
    const credits = Number(body.credits);
    if (!Number.isFinite(credits) || credits <= 0) {
      errors.push('Количество кредитов должно быть положительным числом');
    }
  }

  if (!body.semester) {
    errors.push('Семестр обязателен');
  } else {
    const semester = Number(body.semester);
    if (!Number.isInteger(semester)) {
      errors.push('Семестр должен быть целым числом');
    } else if (semester < 1 || semester > 8) {
      errors.push('Семестр должен находиться в диапазоне от 1 до 8');
    }
  }

  if (!body.description) {
    errors.push('Описание дисциплины обязательно');
  }

  req.errors = errors;
  next();
}

module.exports = validateCourse;
