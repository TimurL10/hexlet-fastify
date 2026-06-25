
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

function show_user (req_params) {
    console.log(new Date().toISOString(), 'users_controller.js', 'show_user()');
    let {id}  = req_params;
    let user = state_users.users.find(item => item.id ===  parseInt(id));
    if (!user) {
      return null;
    }
    return {user};
}


function get_users () {    
    console.log(new Date().toISOString(), 'users_controller.js', 'get_users()');
    return state_users;
}

function post_users(req_body) { 
  try {
    console.log(new Date().toISOString(), 'users_controller.js', 'post_users()');
    let {name, email, password,passwordConfirmation} = req_body;       
    state_users.users.sort((a,b)=> b.id - a.id); // sort desc by id 
    let max_id = state_users?.users[0]?.id ?? 0; 
    let obj = {id: max_id+1,name: name, email:email.trim().toLowerCase(), password: password}
    state_users.users.push(obj);
    return state_users;
  } 
  catch (e) {
    console.error(e)
    throw e
  }
   
}

function patch_user (req_body,req_params_id) {
  try {
    console.log(new Date().toISOString(), 'users_controller.js', 'patch_user()');
    let user_id = req_params_id;
    let {name, email} = req_body;

    let user_index = state_users.users.findIndex(item => item.id === parseInt(user_id));
    if (user_index === -1)
      return null;
    else
      state_users.users[user_index] = {...state_users.users[user_index],name,email};
    return state_users;

  }
  catch (e) {
    console.error(e)
    throw e
  }
}

function delete_user (req_params_id) {
  try {
    console.log(new Date().toISOString(), 'users_controller.js', 'delete_user()');
    let user_id = req_params_id;
    let user_index = state_users.users.findIndex(item => item.id === parseInt(user_id));
    if (user_index === -1)
      return null;
    else
      state_users.users.splice(user_index, 1);
    return state_users;
  }
  catch (e) {
    console.error(e)
    throw e
  }
}

function get_user_data (name, password) {
  try {   
      console.log(new Date().toISOString(), 'users_controller.js', 'get_user_data()');
      let user = state_users.users.find(item => item.name == name && item.password == password);
      if (user.id)
        return user;
      else
        return null;
    }
    catch (e) {
      throw e;
    }  
}

function check_user_exists(id) {
  try {   
      console.log(new Date().toISOString(), 'users_controller.js', 'check_user_exists()');
      let user = state_users.users.find(item => item.id === parseInt(id) );
      if (user.id)
        return true;
      else
        return null;
    }
    catch (e) {
      throw e;
    }  
}




export { show_user, post_users, patch_user, get_users, delete_user, get_user_data, check_user_exists }