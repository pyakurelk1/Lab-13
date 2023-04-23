const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

let resources = [
  { id: 1, Name: 'Resource 1' },
  { id: 2, Phone_Number: 'Resource 2' },
  { id: 3, Email: 'Resource 3' },
]

app.use(bodyParser.json())

// GET method for getting a resource by ID
app.get('/resources/:id', (req, res) => {
  const resourceId = parseInt(req.params.id)
  const resource = resources.find(r => r.id === resourceId)
  if (!resource) {
    return res.status(404).send('Resource not found')
  }
  res.send(resource)
})

// POST method for creating a new resource
app.post('/resources', (req, res) => {
  const resource = {
    id: resources.length + 1,
    name: req.body.name
  }
  resources.push(resource)
  console.log('Database updated with new resource:', resource)
  res.send(resource)
})

// PUT method for updating a resource by ID
app.put('/resources/:id', (req, res) => {
  const resourceId = parseInt(req.params.id)
  const resourceIndex = resources.findIndex(r => r.id === resourceId)
  if (resourceIndex === -1) {
    return res.status(404).send('Resource not found')
  }
  resources[resourceIndex].name = req.body.name
  console.log('Database updated with updated resource:', resources[resourceIndex])
  res.send(resources[resourceIndex])
})

// DELETE method for deleting a resource by ID
app.delete('/resources/:id', (req, res) => {
  const resourceId = parseInt(req.params.id)
  const resourceIndex = resources.findIndex(r => r.id === resourceId)
  if (resourceIndex === -1) {
    return res.status(404).send('Resource not found')
  }
  resources.splice(resourceIndex, 1)
  console.log('Database updated with deleted resource:', resourceId)
  res.sendStatus(204)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
