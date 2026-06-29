import fastify from 'fastify'
import view from '@fastify/view'
import pug from 'pug'
import sanitize from 'sanitize-html'
import yup, { object } from 'yup';
//import * as controller from './users_controller.js';
import * as controller from './users_controller_db.js';

//Динамическая маршрутизация
class Routes {
 routes_obj = {
    usersPath: () => '/users',
    userPath: id => `/users/${id}`,
    newUserPath: () => '/users/new',
    editUserPath: id => `/users/${id}/edit`,
    deleteUserPath: id => `/users/${id}`,
    coursesPath: () => '/courses',
    coursePath: id => `/courses/${id}`,
    newCoursePath: () => '/courses/new'
  }
  get_rout = (rout_name,prop=null) => {
    if (this.routes_obj[rout_name])
      return this.routes_obj[rout_name](prop);       
    else
      return null;
  }
}


export default async function users_routes(app) {

    let rout = new Routes;
    
    const requireAuth = async (req,res) => {
        try {
            console.log(new Date().toISOString(), 'users_routes.js', 'requireAuth()');
            if (req.session?.user_id) {
                let user_id_cookie = req.session.user_id;            
                let exists_cookie = await controller.check_user_exists(user_id_cookie)
                if (!exists_cookie)               
                    return res.code(404).send('user not found');
            } 
            else
                return res.redirect('/login')
        }
        catch (e) {
            throw e;
        }            
    }
        
    app.get('/users/:id', async (req, res) => {
        console.log(new Date().toISOString(), 'users_routes.js', 'app.get(/users/:id)');
        let user = await controller.show_user(req.params);
        console.log(new Date().toISOString(), 'users_routes.js', 'app.get(/users/:id)', user);
        if (!user)
            return res.code(404).send('User not found') 
        else
             return res.view('/src/views/user.pug', user)
    })

    app.get('/users/new', (req, res) => {  
        console.log(new Date().toISOString(), 'users_routes.js', 'app.get(/users/new)');
        res.view('/src/views/new_users.pug')
    })

    app.get(rout.get_rout('usersPath'),{preHandler: requireAuth}, async (req, res) => {
        console.log(new Date().toISOString(), 'users_routes.js', 'app.get(/users)');
        const visited = Boolean(req.cookies.visited);
        res.cookie('visited', 'true', { path: '/' });

        const state_users = await controller.get_users(); 
        const messages = res.flash() || {}
        return res.view('/src/views/users.pug',{
            users: state_users.users,
            rout,
            visited,
            messages
        })
    })

    app.post('/users', {
    preHandler: requireAuth,
    attachValidation: true,
    schema: {
        body: yup.object({
        name: yup.string().min(2, 'Имя должно быть не меньше двух символов'),
        email: yup.string().email(),
        password: yup.string().min(5),
        passwordConfirmation: yup.string().min(5),
        }),
    },
    validatorCompiler: ({ schema, method, url, httpPart }) => (data) => {
        if (data.password !== data.passwordConfirmation) {
        return {
            error: Error('Password confirmation is not equal the password'),
        }
        }
        try {
        const result = schema.validateSync(data)
        return { value: result }
        }
        catch (e) {
        return { error: e }
        }
    },
    }, async (req, res) => {   
        console.log(new Date().toISOString(), 'users_routes.js', 'app.post(/users)');
        let {name, email, password,passwordConfirmation} = req.body;
        if (req.validationError) {
        const data = {
            name, email, password, passwordConfirmation,
            error: req.validationError,
        }      
        res.view('src/views/new_users.pug', data)
        return
        }
        let state_users = await controller.post_users(req.body);  
        if (typeof(state_users) != 'object')
            return  res.code(404).send('user not found'); 
        else {
            req.flash('success', 'A user was successfully added to your system');
            res.redirect('/users');
        }
            
    })

    app.get('/users/:id/edit', async (req, res) => {
        console.log(new Date().toISOString(), 'users_routes.js', 'app.get(/users/:id/edit)');
        let user = await controller.show_user(req.params);
        if (!user)
            return  res.code(404).send('user not found'); 
        else
            return res.view('/src/views/edit_user.pug', user)
    })

    app.post('/users/:id',{
    attachValidation: true,
    schema: {
        body: yup.object({
        name: yup.string().min(2, 'Имя должно быть не меньше двух символов'),
        email: yup.string().email()    
        }),
    },
    validatorCompiler: ({ schema, method, url, httpPart }) => (data) => {        
        try {
        const result = schema.validateSync(data)
        return { value: result }
        }
        catch (e) {
        return { error: e }
        }
    },
    },async (req,res) => {
        console.log(new Date().toISOString(), 'users_routes.js', 'app.post(/users/:id)');      
        let state_users;
        if (req.body._method === 'PATCH') 
            state_users = await controller.patch_user(req.body,req.params.id);
        else if (req.body._method === 'DELETE')
            state_users = await controller.delete_user(req.params.id);
        if (!state_users)
            return  res.code(404).send('user not found'); 
        else
            res.redirect('/users')
    }) 

    app.get('/login',(req,res) => {
        console.log(new Date().toISOString(), 'users_routes.js', 'app.get(/login)');  
        res.view('src/views/login.pug') 
    })

    app.post('/login',async (req,res) => {
        console.log(new Date().toISOString(), 'users_routes.js', 'app.post(/login)');  
        const {name,password} = req.body;
        if (!name || !password)
            return  res.code(404).send('user not found'); 
        let user = await controller.get_user_data(name, password);
        req.session.user_id = user.id;
        req.flash('success', 'A user was successfully loged in');
        res.redirect('/users') 
    })   

    /*
        app.addHook('preHandler', async (req, reply) => {
        const sessionUserId = req.session.user_id

        if (!sessionUserId) {
            return
        }

        const sessionUserExists = controller.check_user_exists(sessionUserId)

        if (!sessionUserExists) {
            return reply.code(404).send('user not found')
        }
        })
    */


}


