
const foo = require('./dist/func-get-user').default

const context = {
  log: str => console.log(str)
}

const request = {
  params: {
    memorableId: 'jjp'
  }
}

foo(context, request)