module.exports = (payload, token) => {
  return {
    username: payload.username,
    balance: payload.balance,
    transactions: payload.transactions,
    accessToken: token
  };
};
