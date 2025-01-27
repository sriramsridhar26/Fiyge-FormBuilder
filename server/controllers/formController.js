const { Forms } = require('../models/Models');

// Save Form
const saveForm = async (req, res) => {
    try {
        const { form_name, form_data } = req.body;
        const userEmail = req.user.email; // User email from authenticated token
        const newForm = await Forms.create({ form_name, form_data, user_email: userEmail });
        res.status(201).json(newForm);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fetch Form
const fetchForm = async (req, res) => {
    try {
        const { id } = req.params;
        const userEmail = req.user.email;
        const form = await Forms.findOne({ where: { id, user_email: userEmail } });
        if (!form) return res.status(404).json({ message: 'Form not found' });
        res.json(form);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Form
const updateForm = async (req, res) => {
    try {
        const { id } = req.params;
        const { form_name, form_data } = req.body;
        const userEmail = req.user.email;
        const form = await Forms.findOne({ where: { id, user_email: userEmail } });
        if (!form) return res.status(404).json({ message: 'Form not found' });

        form.form_name = form_name || form.form_name;
        form.form_data = form_data || form.form_data;
        form.updated_at = new Date();
        await form.save();

        res.json(form);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// List Forms
const listForms = async (req, res) => {
    try {
        const userEmail = req.user.email;
        const forms = await Forms.findAll({ where: { user_email: userEmail } });
        res.json(forms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { saveForm, fetchForm, updateForm, listForms };
