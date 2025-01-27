const express = require('express');
const { saveForm, updateForm, listForms, fetchForm} = require('../controllers/formController');
const {authenticate} = require("../middleware/authMiddleware");

const router = express.Router();

// API Endpoints
router.post('/save', authenticate, saveForm);
router.put('/update/:id', authenticate, updateForm);
router.get('/list', authenticate, listForms);
router.get('/:id', authenticate, fetchForm);

module.exports = router;
