import * as usersRepository from './users_repository.js'

async function show_user(req_params) {
  console.log(new Date().toISOString(), 'users_controller.js', 'show_user()')

  const { id } = req_params
  const user = await usersRepository.findById(id)

  if (!user) {
    return null
  }  
  return { user }
}

async function get_users() {
  console.log(new Date().toISOString(), 'users_controller.js', 'get_users()')

  const users = await usersRepository.findAll()

  return { users }
}

async function post_users(req_body) {
  try {
    console.log(new Date().toISOString(), 'users_controller.js', 'post_users()')

    const { name, email, password } = req_body

    await usersRepository.create({
      name: name.trim(),
      email: email.trim().toLowerCase(), 
      password,
    })

    return get_users()
  }
  catch (e) {
    console.error(e)
    throw e
  }
}

async function patch_user(req_body, req_params_id) {
  try {
    console.log(new Date().toISOString(), 'users_controller.js', 'patch_user()')

    const { name, email } = req_body

    const updatedUser = await usersRepository.update(req_params_id, {
      name: name.trim(),
      email: email.trim().toLowerCase(),
    })

    if (!updatedUser) {
      return null
    }

    return get_users()
  }
  catch (e) {
    console.error(e)
    throw e
  }
}

async function delete_user(req_params_id) {
  try {
    console.log(new Date().toISOString(), 'users_controller.js', 'delete_user()')

    const deletedUser = await usersRepository.remove(req_params_id)

    if (!deletedUser) {
      return null
    }

    return get_users()
  }
  catch (e) {
    console.error(e)
    throw e
  }
}

async function get_user_data(name, password) {
  try {
    console.log(new Date().toISOString(), 'users_controller.js', 'get_user_data()')

    const user = await usersRepository.findByNameAndPassword(name, password)

    if (!user) {
      return null
    }

    return user
  }
  catch (e) {
    throw e
  }
}

async function check_user_exists(id) {
  try {
    console.log(new Date().toISOString(), 'users_controller.js', 'check_user_exists()')

    const exists = await usersRepository.existsById(id)

    if (!exists) {
      return null
    }

    return true
  }
  catch (e) {
    throw e
  }
}

export {
  show_user,
  post_users,
  patch_user,
  get_users,
  delete_user,
  get_user_data,
  check_user_exists,
}