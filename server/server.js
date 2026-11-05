import express from 'express'
import router from './api/api.js'

const app = express()
const PORT = process.env.PORT || 3001;

app.use('/api', router)

app.use((_req, res) => {
  res.status(404).json({error: 'Resource not found'})
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
