const { once } = require('events');
const http = require('http');

const DEFAULT_USER = { 
  username: 'vini', 
  password: '123' 
};

const routes = {
  '/contact:get': (request, response) => {
    response.write('Contact us page');
    return response.end();
  },
  '/login:post': async (request, response) => {
    // response é um iterator!
    // for await (const data of request) {
    // }

      // pegar o data através do once
      const user = JSON.parse(await once(request, 'data'));
      console.log('user', user);
      if(
        user.username !== DEFAULT_USER.username ||
        user.password !== DEFAULT_USER.password
      ) {
        response.writeHead(401);
        return response.end('Logging failed!');
      }

      return response.end('Logging has succeeded!');
  },
  default: (request, response) => {
    response.writeHead(404);
    return response.end('Not found!');
  }
}

const handler = (request, response) => {
  const { url, method } = request;
  const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`;
  
  console.log('routeKey', routeKey);

  const chosen = routes[routeKey] || routes.default;
  
  response.writeHead(200, {
    'Content-Type': 'text/html'
  });

  return chosen(request, response);
}

const app = http.createServer(handler)
                .listen(3000, () => console.log('app is running at 3000!'));

module.exports = app;