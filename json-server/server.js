const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./json-server/db.json');
const middlewares = jsonServer.defaults();

const PORT = 3004;
const AUTH_HEADER = 'x-auth-token';
const AUTH_TOKEN = 'bad18eba1ff45jk7858b8ae88a77fa30';
const UNAUTHORIZED = 401;

server.use(middlewares);
server.use((req, res, next) => {
  if (isAuthorized(req)) {
    next();
  } else {
    res.sendStatus(UNAUTHORIZED);
  }
});
server.use(router);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

function isAuthorized(req) {
  const token = req.get(AUTH_HEADER);
  return token && token === AUTH_TOKEN;
}
