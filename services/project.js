import projects from 'data/projects'

const indexes = projects.reduce((indexes, project) => {
  indexes[project.id] = project

  return indexes
}, {})

export default {
  get: (id, account) => indexes[id].account === account.id ? indexes[id] : null,
  getAll: account => projects.filter(project => project.account === account.id)
}
