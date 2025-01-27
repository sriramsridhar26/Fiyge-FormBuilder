const express = require('express');
const { saveForm, fetchForm, updateForm, listForms } = require('../controllers/formController');
const {authenticate} = require("../middleware/authMiddleware");

const router = express.Router();

// API Endpoints
router.post('/save', authenticate, saveForm);
router.get('/:id', authenticate, fetchForm);
router.put('/update/:id', authenticate, updateForm);
router.get('/list', authenticate, listForms);


module.exports = router;
