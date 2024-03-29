const errs = require('restify-errors');
const restify = require('restify');


function getDetails(req, res, next, kind) {
  const obj = inventory[req.params.name];
  if(obj) {
    if(obj[kind]) {
      res.send(obj);
    } else {
      res.send(new errs.BadRequestError(req.params.name + ' is not a ' + kind));
    }
  } else {
    res.send(new errs.NotFoundError('can not find ' + req.params.name));
  }
  next();
}

function getList(req, res, next, kind) {
  let list = Object.keys(inventory).filter(name => inventory[name][kind]);
  res.send(list);
  next();
}

function addInventoryListener(server, kind) {
  server.get('/' + kind + 's', (req, res, next) => getList(req, res, next, kind));
  server.get('/' + kind + 's/', (req, res, next) => getList(req, res, next, kind));
  server.get('/' + kind + 's/:name', (req, res, next) => getDetails(req, res, next, kind));
}

const server = restify.createServer({name: 'my salad bar REST server',});
server.use(
  function crossOrigin(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  }
);
addInventoryListener(server, 'foundation');
addInventoryListener(server, 'protein');
addInventoryListener(server, 'extra');
addInventoryListener(server, 'dressing');
server.post('/orders/', (req, res, next) => res.send('thank you for your order'));

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});

const inventory = {
  Sallad: {price: 10, foundation: true, vegan: true},
  Pasta: {price: 10, foundation: true, gluten: true},
  'Salad + Pasta': {price: 10, foundation: true, gluten: true},
  'Salad + Matvete': {price: 10, foundation: true, vegan: true, gluten: true},
  'Salad + Glasnudlar': {price: 10, foundation: true, gluten: true},
  'Salad + Quinoa': {price: 10, foundation: true, vegan: true},

  'Kycklingfilé': {price: 10, protein: true},
  'Rökt kalkonfilé': {price: 10, protein: true},
  'Norsk fjordlax': {price: 30, protein: true},
  'Handskalade räkor från Smögen': {price: 40, protein: true},
  'Pulled beef från Sverige': {price: 15, protein: true},
  'Marinerad bönmix': {price: 10, protein: true, vegan: true},

  Avocado: {price: 10, extra: true, vegan: true},
  'Böngroddar': {price: 5, extra: true, vegan: true},
  'Cashewnötter': {price: 5, extra: true, vegan: true},
  'Chèvreost': {price: 15, extra: true, lactose: true},
  Fetaost: {price: 5, extra: true, lactose: true},
  'Färsk koriander': {price: 10, extra: true, vegan: true},
  Gurka: {price: 5, extra: true, vegan: true},
  'Inlagd lök': {price: 5, extra: true, vegan: true},
  Jalapeno: {price: 5, extra: true, vegan: true},
  'Krossade jordnötter': {price: 5, extra: true, vegan: true},
  Krutonger: {price: 5, extra: true, gluten: true},
  Lime: {price: 5, extra: true, vegan: true},
  Majs: {price: 5, extra: true, vegan: true},
  Oliver: {price: 5, extra: true, vegan: true},
  Paprika: {price: 5, extra: true, vegan: true},
  Parmesan: {price: 5, extra: true, lactose: true},
  'Rivna morötter': {price: 5, extra: true, vegan: true},
  'Rostade sesamfrön': {price: 5, extra: true, vegan: true},
  Ruccola: {price: 5, extra: true, vegan: true},
  'Rödlök': {price: 5, extra: true, vegan: true},
  'Sojabönor': {price: 5, extra: true, vegan: true},
  'Soltorkad tomat': {price: 5, extra: true, vegan: true},
  Tomat: {price: 5, extra: true, vegan: true},
  'Valnötter': {price: 5, extra: true, vegan: true},
  'Ägg': {price: 5, extra: true},

  Ceasardressing: {price: 5, dressing: true, lactose: true},
  Dillmayo: {price: 5, dressing: true},
  Honungsdijon: {price: 5, dressing: true, vegan: true},
  Kimchimayo: {price: 5, dressing: true},
  Pesto: {price: 5, dressing: true, lactose: true},
  Rhodeisland: {price: 5, dressing: true, lactose: true},
  'Rostad aioli': {price: 5, dressing: true},
  'Soyavinägrett': {price: 5, dressing: true, vegan: true},
  'Örtvinägrett': {price: 5, dressing: true, vegan: true},
};
