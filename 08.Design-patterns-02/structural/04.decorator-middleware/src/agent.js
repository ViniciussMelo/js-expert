import http from 'http';

// Decorator = interceptor = middleware
async function InjectHttpInterceptor() {
  const oldEmit = http.Server.prototype.emit;
  http.Server.prototype.emit = function (...args) {
    const [type, req, response] = args;

    if (type === "request") {
      response.setHeader('X-Instrumented-By', 'ViniciusMelo')
    }

    return oldEmit.apply(this, args);
  }
}

export { InjectHttpInterceptor }