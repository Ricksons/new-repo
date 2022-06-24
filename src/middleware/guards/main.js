// this file job is to check the requested route and see if it has guards to activate them

export const checkRouteGuards = (to, from, next, guards) => {
  let guardsResults = []
  let props = {}

  for (let g in guards) {
    guardsResults.push(import('./' + g +'Guard.js').then( (func) => {
      return func.default(to, from, guards, guards[g], props)
    }))
  }

  Promise.all(guardsResults).then((values) => {
    if (props.hasOwnProperty('redirect')) {
      next(props.redirect.name)
    } else if (values.reduce( (t, c) => {return t && c})) {
      next()
    } else {
      next(false)
    }
  })
}
