import fastify from 'fastify'
import view from '@fastify/view'
import pug from 'pug'
import formbody from '@fastify/formbody'
import middie from '@fastify/middie'
import users_routes from './modules/users/users_routes.js';
//import courses_routes from './modules/courses/courses_routes.js';


try {
    
  const app = fastify({
    routerOptions: {
      ignoreTrailingSlash: true,
    },
  });
  const port = 3000

  // Подключаем pug через плагин
  await app.register(view, { engine: { pug } })
  await app.register(formbody);
  await app.register(middie);  
  await app.register(users_routes);
  //await app.register(courses_routes,{prefix:'/courses'});



  app.get('/', (req, reply) => {
    return reply.view('src/views/test.pug')
  })


/*
  app.listen({ port }, () => {
    console.log(`Example app listening on port ${port}`)
  })*/
 
    await app.listen({ port });

}
catch (e) {
  throw e;
}
