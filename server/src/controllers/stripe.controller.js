async function webhook(req, res) {
  res.json({ received: true });
}

module.exports = { webhook };
