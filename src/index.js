import fastify from 'fastify'
import view from '@fastify/view'
import pug from 'pug'
import cars from './data_pug/cars.js'

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
    },
    {
      id: 2,
      title: "JS: Функции",
      description: 'Курс про функции в JavaScript',
    },
  ],
}



app.get('/search', (req, res) => {
  const { id } = req.query
  const user = state.users.find(user => user.id === parseInt(id)) 
  if (!user) {
    res.code(404).send({ message: 'User not found' })
  }
  else {
    res.send(user)
  }
})

app.get('/courses', (req, res) => {
  const data = {
    courses: state.courses,
    header: 'Курсы по программированию',
  }
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