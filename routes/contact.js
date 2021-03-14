const express = require('express');
const{
	getContacts, createContact, updateContact, deleteContact
} = require('../controller/contacts');

const { protect } = require('../middleware/auth');

const router = express.Router();

router
	.route('/')
	.get(protect,getContacts)

router
	.route('/')
	.post(protect,createContact)

router
	.route('/:id')
	.put(protect,updateContact)

router
	.route('/:id')
	.delete(protect,deleteContact)

module.exports = router;