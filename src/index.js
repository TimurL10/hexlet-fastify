import fastify from 'fastify'

const app = fastify()
const port = 3000

const state = {
  users: [
    {
      id: 1,
      name: 'user',
    },
  ],
}

app.get('/users', (req, res) => {
  res.send('GET /users')
})

app.get('/', (req, res) => {
  res.send('GET /home')
})

app.post('/users', (req, res) => {
  res.send('POST /users')
})

app.get('/hello',(req,res) => {
  const {name} = req.query;
  if (name)
    res.send(`Hello, ${name}!`)
  else
    res.send('Hello, World!')
  
})

app.get('/search', (req, res) => {
  const { id } = req.query
  const user = state.users.find(user => user.id === parseInt(id)) // Приведение к одному типу и сравнение
  if (!user) {
    res.code(404).send({ message: 'User not found' })
  }
  else {
    res.send(user)
  }
})

app.listen({ port }, () => {
  console.log(`Example app listening on port ${port}`)
})