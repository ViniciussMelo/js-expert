// curl "localhost:3000?salary=3000&discount=15"

import http from 'http';

function netSalary({ discount, salary }) {
  const percent = (discount / 100);
  const cost = salary * percent;
  const result = salary - cost;
  
  return result;
}

const port = 3000;

http.createServer((req, res) => {
  const url = req.url.replace('/', '');
  const params = new URLSearchParams(url);
  const data = Object.fromEntries(params);
  const result = netSalary(data);

  res.end(`O seu salario final é: ${result}`);
}).listen(port, () => console.log('app running at: ', port))