import sqlite3 from 'sqlite3'

const db = new sqlite3.Database(':memory:')

const run = (sql, params = []) => new Promise((resolve, reject) => {
  db.run(sql, params, function (error) {
    if (error) {
      reject(error)
      return
    }

    resolve(this)
  })
})

const get = (sql, params = []) => new Promise((resolve, reject) => {
  db.get(sql, params, (error, row) => {
    if (error) {
      reject(error)
      return
    }

    resolve(row)
  })
})

const all = (sql, params = []) => new Promise((resolve, reject) => {
  db.all(sql, params, (error, rows) => {
    if (error) {
      reject(error)
      return
    }

    resolve(rows)
  })
})

const prepareDatabase = async () => {
  await run(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
    );
  `)

  const users = [
    {
      id: 1,
      name: 'bobdylan',
      email: 'boby1960@yahoo.com',
      password: '02fjw98rjn3lrkm',
    },
    {
      id: 2,
      name: 'Jopo_upa101',
      email: 'Jp-11lopo@gmail.com',
      password: '543',
    },
    {
      id: 3,
      name: 'Johny_Bodrum',
      email: 'JB_Chohen@hotmail.com',
      password: 'fgh56d454',
    },
  ]

  for (const user of users) {
    await run(
      'INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)',
      [user.id, user.name, user.email, user.password],
    )
  }
}

const findAll = async () => {
  return all('SELECT * FROM users ORDER BY id')
}

const findById = async (id) => {
  return get('SELECT * FROM users WHERE id = ?', [id])
}

const create = async ({ name, email, password }) => {
  const result = await run(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, password],
  )

  return findById(result.lastID)
}

const update = async (id, { name, email }) => {
  const user = await findById(id)

  if (!user) {
    return null
  }

  await run(
    'UPDATE users SET name = ?, email = ? WHERE id = ?',
    [name, email, id],
  )

  return findById(id)
}

const remove = async (id) => {
  const user = await findById(id)

  if (!user) {
    return null
  }

  await run('DELETE FROM users WHERE id = ?', [id])

  return user
}

const findByNameAndPassword = async (name, password) => {
  return get(
    'SELECT * FROM users WHERE name = ? AND password = ?',
    [name, password],
  )
}

const existsById = async (id) => {
  const user = await findById(id)
  return Boolean(user)
}

export {
  prepareDatabase,
  findAll,
  findById,
  create,
  update,
  remove,
  findByNameAndPassword,
  existsById,
}