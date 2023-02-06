//GET /api/me
//get plans saved in db
const getPlans = (req, res) => {
  res.json({ message: 'authentication succesful' })
}

//POST /api/me
//save calculated plan in db
const savePlan = (req, res) => {
  res.json({ message: 'authentication succesful' })
}

module.exports = {
  getPlans,
  savePlan
}