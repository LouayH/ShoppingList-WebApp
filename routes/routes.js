const express = require('express')
const router = express.Router()
const item = require('../models/shoppingItem')

router.get('/items', (req, res, next) => {
  item.find((err, items) => {
    if(err) {
      res.json(err)
    } else {
      res.json(items)
    }
  })
})

router.post('/item', (req, res, next) => {
  let newItem = new item({
    itemName: req.body.itemName,
    itemQuantity: req.body.itemQuantity,
    itemBought: req.body.itemBought
  })

  newItem.save((err, item) => {
    if(err) {
      res.json(err)
    } else {
      res.json(item)
    }
  })
})

router.put('/item/:id', (req, res, next) => {
  item.findOneAndUpdate({_id: req.params.id}, {
    $set: {
      itemName: req.body.itemName,
      itemQuantity: req.body.itemQuantity,
      itemBought: req.body.itemBought
    }
  }, (err, item) => {
    if(err) {
      res.json(err)
    } else {
      res.json(item)
    }
  })
})

router.delete('/item/:id', (req, res, next) => {
  item.remove({_id: req.params.id}, (err, result) => {
    if(err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
})

module.exports = router