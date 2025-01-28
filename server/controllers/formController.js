const { Forms } = require('../models/Models');

// Save Form
const saveForm = async (req, res) => {
    try {
        const { form_name, form_data } = req.body;
        const userEmail = req.user.email; // User email from authenticated token
        const newForm = await Forms.create({ form_name, form_data, user_email: userEmail });
        res.status(201).json(newForm);
    } catch (error) {
        console.log(error.message);
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

        res.status(200).json(form);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// List Forms
const listForms = async (req, res) => {
    try {
        const userEmail = req.user.email;


        // Fetch only the form names for the authenticated user
        const forms = await Forms.findAll({
            where: { user_email: userEmail },
            attributes: ['id', 'form_name'], // Fetch both form_name and id
        });

        // Send an array of form objects containing form_name and id
        const formData = forms.map(form => ({
            id: form.id,
            form_name: form.form_name,
        }));

        res.json(formData); // Send the list of form data (id, form_name)

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
        console.log(form);
        if (!form) return res.status(404).json({ message: 'Form not found' });

        res.json(form);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { saveForm, updateForm, listForms, fetchForm};
