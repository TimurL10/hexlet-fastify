import fastify from 'fastify'
import view from '@fastify/view'
import pug from 'pug'
import cars from './data_pug/cars.js'
import sanitize from 'sanitize-html'

const app = fastify()
const port = 3000

// Подключаем pug через плагин
await app.register(view, { engine: { pug } })

const state = {
  courses: [
    {
      id: 1,
      title: "JS: Массивы",
      description: 'Курс про массивы в JavaScript',
      level: 'beginner',
      category: 'backend'
    },
    {
      id: 2,
      title: "JS: Функции",
      description: 'Курс про функции в JavaScript',
      level: 'beginner',
      category: 'backend'
    },
    {
      id: 3,
      title: "PL/SQL",
      description: 'Курс PL/SQL',
      level: 'advanced',
      category: 'database'
    },
    {
      id: 4,
      title: "React JS",
      description: 'Курс про React JS',
      level: 'middle',
      category: 'frontend'
    },
    {
      id: 5,
      title: "Python",
      description: 'Курс про Python',
      level: 'advanced',
      category: 'backend'
    },
    {
      id: 6,
      title: "SQL",
      description: 'Курс про SQL',
      level: 'beginner',
      category: 'database'
    }
  ],
}


//%3Cscript%3Ealert('attack!')%3B%3C%2Fscript%3E
app.get('/user/:id', (req, res) => {
  let id  = req.params.id
   res.type('html');
   //id = sanitize(id);
   //res.send(`<html><head></head><body><h1>this id came from you: ${id}</h1></body></html>`);  
   res.view('/src/views/users.pug', `this id came from you: ${id}`)
})



app.get('/courses', (req, res) => {
  const data = {
    courses: state.courses,
    header: 'Курсы по программированию',
  }
    const course_name = req.query.term;
    const level = req.query.level;
    const category = req.query.category;
    console.log(course_name);
    console.log(level);
    console.log(category);

  if (course_name) {   

    let a =  data.courses.filter(item => item.title.toLowerCase().includes(course_name.toLowerCase()) &&
                                (item.level == level || item.level == item.level) &&
                                (item.category == category || item.category == item.category))

    data.courses = a;
    console.log(JSON.stringify(data));
    res.view('/src/views/index.pug', data)
  }
  else
    res.view('/src/views/index.pug', data)
  
})

app.get('/courses/:id', (req, res) => {
  const { id } = req.params;
  const course = state.courses.find(course => course.id === parseInt(id))
  if (!course) {
    res.code(404).send({ message: 'Course not found' })
  }
  else {
    res.view('/src/views/course.pug', { course })
  }  
})




app.listen({ port }, () => {
  console.log(`Example app listening on port ${port}`)
})