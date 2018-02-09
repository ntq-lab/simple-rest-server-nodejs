import accounts from 'data/accounts'

const indexes = accounts.reduce((indexes, account) => {
  indexes[account.id] = account

  return indexes
}, {})

export default {
  get: id => indexes[id],
  getAll: () => accounts
}
