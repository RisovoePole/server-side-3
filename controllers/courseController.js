const Course = require('../models/courseModel');

function renderNotFound(req, res, message) {
  return res.status(404).render('404', {
    title: 'Курс не найден',
    message,
    requestedUrl: req.originalUrl
  });
}

// GET /courses — список с поиском и фильтрацией по семестру
exports.index = (req, res) => {
  const search = typeof req.query.search === 'string' ? req.query.search.trim() : '';
  const semester = typeof req.query.semester === 'string' ? req.query.semester.trim() : '';
  const searchLower = search.toLowerCase();

  const courses = Course.findAll().filter((course) => {
    const matchesSearch = !searchLower
      || course.title.toLowerCase().includes(searchLower)
      || course.teacher.toLowerCase().includes(searchLower);
    const matchesSemester = !semester || course.semester === Number(semester);
    return matchesSearch && matchesSemester;
  });

  res.render('courses/index', {
    title: 'Список курсов',
    courses,
    total: Course.findAll().length,
    search,
    semester
  });
};

// GET /courses/:id — подробная информация о курсе
exports.details = (req, res) => {
  const course = Course.findById(req.params.id);
  if (!course) return renderNotFound(req, res, 'Курс с указанным ID не найден');

  res.render('courses/details', { title: course.title, course });
};

// GET /courses/new — форма добавления
exports.newForm = (req, res) => {
  res.render('courses/create', {
    title: 'Добавить курс',
    formData: {},
    errors: []
  });
};

// POST /courses — сохранение нового курса
exports.create = (req, res) => {
  if (req.errors.length) {
    return res.status(400).render('courses/create', {
      title: 'Добавить курс',
      formData: req.body,
      errors: req.errors
    });
  }

  Course.create(req.body);
  res.redirect('/courses');
};

// GET /courses/:id/edit — форма редактирования с текущими данными
exports.editForm = (req, res) => {
  const course = Course.findById(req.params.id);
  if (!course) return renderNotFound(req, res, 'Курс с указанным ID не найден');

  res.render('courses/edit', {
    title: `Редактирование: ${course.title}`,
    course,
    formData: course,
    errors: []
  });
};

// POST /courses/:id/edit — сохранение изменений
exports.update = (req, res) => {
  const course = Course.findById(req.params.id);
  if (!course) return renderNotFound(req, res, 'Курс с указанным ID не найден');

  if (req.errors.length) {
    return res.status(400).render('courses/edit', {
      title: `Редактирование: ${course.title}`,
      course,
      formData: { ...course, ...req.body },
      errors: req.errors
    });
  }

  Course.update(course.id, req.body);
  res.redirect(`/courses/${course.id}`);
};

// POST /courses/:id/delete — удаление курса
exports.remove = (req, res) => {
  if (!Course.remove(req.params.id)) {
    return renderNotFound(req, res, 'Курс с указанным ID не найден');
  }

  res.redirect('/courses');
};
