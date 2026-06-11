import fastify from 'fastify'
import view from '@fastify/view'
import pug from 'pug'
import cars from './data_pug/cars.js'
import sanitize from 'sanitize-html'
import formbody from '@fastify/formbody'



const app = fastify()
const port = 3000

// Подключаем pug через плагин
await app.register(view, { engine: { pug } })
await app.register(formbody);

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

const state_users = {
  users: [
    {
      id:1,
      name: "bobdylan",
      email: "boby1960@yahoo.com",
      password: '02fjw98rjn3lrkm'
    },
    {
       id:2,
      name: "Jopo_upa101",
      email: "Jp-11lopo@gmail.com",
      password: '543'
    },
    {
       id:3,
      name: "Johny_Bodrum",
      email: "JB_Chohen@hotmail.com",
      password: 'fgh56d454'
    }
  ]
}

/*
//%3Cscript%3Ealert('attack!')%3B%3C%2Fscript%3E
app.get('/users/:id', (req, res) => {
  let id  = req.params.id
   res.type('html');
   //id = sanitize(id);
   //res.send(`<html><head></head><body><h1>this id came from you: ${id}</h1></body></html>`);  
   res.view('/src/views/users.pug', `this id came from you: ${id}`)
})
*/


app.get('/users/:id', (req, res) => {
    let {id}  = req.params;
    let user = state_users.users.find(item => item.id ===  parseInt(id));
    if (!user) {
      return reply.code(404).send('User not found')
    }
    console.log(user)
    res.view('/src/views/user.pug', {user})
})

app.get('/users/new', (req, res) => {
   //id = sanitize(id);
   res.view('/src/views/new_users.pug')
})

app.get('/users', (req, res) => { 
    res.view('/src/views/users.pug',state_users);
})

app.post('/users', (req, res) => {  
    console.log(req.body)
    let {name, email, password} = req.body;
    state_users.users.sort((a,b)=> b.id - a.id);
    let max_id = state_users.users[0].id;
    let obj = {id: max_id+1,name: name, email:email, password: password}
    console.log(obj)
    state_users.users.push(obj);
    console.log(JSON.stringify(state_users.users))
    res.view('/src/views/users.pug',state_users)
})

app.get('/courses', (req, res) => {
  const data = {
    courses: state.courses,
    header: 'Курсы по программированию',
    formData: {}
  }
    const course_name = req.query.term;
    const level = req.query.level;
    const category = req.query.category;

    data.formData = {
      course_name,
      level,
      category
    }
    //console.log(course_name);
    //console.log(level);
    //console.log(category);

  if (course_name) {   

    let a =  data.courses.filter(item => item.title.toLowerCase().includes(course_name.toLowerCase()) &&
                                (item.level == level || item.level == item.level) &&
                                (item.category == category || item.category == item.category))

    data.courses = a;  

    //console.log(JSON.stringify(data));
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