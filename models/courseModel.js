// Данные приложения и операции с ними (слой Model).
// По условию лабораторной работы данные хранятся в массиве.

const courses = [
  {
    id: 1,
    title: 'Server-side Programming',
    teacher: 'Ivan Ivanov',
    credits: 5,
    semester: 1,
    description: 'Development of server-side applications using Node.js and Express'
  },
  {
    id: 2,
    title: 'Web Technologies',
    teacher: 'Maria Petrova',
    credits: 4,
    semester: 1,
    description: 'HTML, CSS, JavaScript and modern frontend frameworks'
  },
  {
    id: 3,
    title: 'Databases',
    teacher: 'Ivan Ivanov',
    credits: 6,
    semester: 2,
    description: 'Relational databases, SQL queries and data modeling'
  },
  {
    id: 4,
    title: 'Software Engineering',
    teacher: 'Alexey Smirnov',
    credits: 3,
    semester: 3,
    description: 'Software development life cycle, testing and project management'
  },
  {
    id: 5,
    title: 'Computer Networks',
    teacher: 'Olga Kuznetsova',
    credits: 4,
    semester: 4,
    description: 'Network protocols, client-server interaction and HTTP fundamentals'
  },
  {
    id: 6,
    title: 'Node.js Practice',
    teacher: 'Maria Petrova',
    credits: 5,
    semester: 2,
    description: 'Practical work with Node.js, middleware and REST-style routing'
  }
];

// Экспортируем сам массив (как требуется в задании) и операции над ним.
courses.findAll = () => courses;

courses.findById = (id) => courses.find((course) => course.id === Number(id));

courses.create = (data) => {
  const maxId = courses.reduce((max, course) => Math.max(max, course.id), 0);
  const course = {
    id: maxId + 1,
    title: data.title.trim(),
    teacher: data.teacher.trim(),
    credits: Number(data.credits),
    semester: Number(data.semester),
    description: data.description.trim()
  };
  courses.push(course);
  return course;
};

courses.update = (id, data) => {
  const course = courses.findById(id);
  if (!course) return null;

  course.title = data.title.trim();
  course.teacher = data.teacher.trim();
  course.credits = Number(data.credits);
  course.semester = Number(data.semester);
  course.description = data.description.trim();
  return course;
};

courses.remove = (id) => {
  const index = courses.findIndex((course) => course.id === Number(id));
  if (index === -1) return false;
  courses.splice(index, 1);
  return true;
};

module.exports = courses;
