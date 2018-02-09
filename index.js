import express from 'express'
import accountService from 'services/account'
import projectService from 'services/project'

const app = express()

// register param middlewares
app.param('accountId', (req, res, next, id) => {
  const account = accountService.get(id)

  if (!account) return res.sendStatus(404)

  req._account = account

  next()
})

app.param('projectId', (req, res, next, id) => {
  const project = projectService.get(id, req._account)

  if (!project) return res.sendStatus(404)

  req._project = project

  next()
})

// authen
app.use((req, res, next) => {
  const authHeader = req.header('authorization')

  if (!authHeader) return res.sendStatus(401)

  next()
})

// register routes
app.route('/accounts')
  .get((req, res, next) => res.json(accountService.getAll()))
  .post((req, res, next) => res.sendStatus(501))

app.route('/accounts/:accountId')
  .get((req, res, next) => res.json(req._account))
  .put((req, res, next) => {
    res.json({
      ...req._account,
      name: req._account.name + ' updated'
    })
  })
  .delete((req, res, next) => res.sendStatus(501))

app.route('/accounts/:accountId/projects')
  .get((req, res, next) => res.json(projectService.getAll(req._account)))
  .post((req, res, next) => res.sendStatus(501))

app.route('/accounts/:accountId/projects/:projectId')
  .get((req, res, next) => res.json(req._project))
  .put((req, res, next) => res.sendStatus(501))
  .delete((req, res, next) => res.sendStatus(501))

// start application
app.listen(3000, () => console.log('Application started at :3000'))
