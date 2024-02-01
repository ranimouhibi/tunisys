const Conges = require('../models/congesModel')
const mongoose = require('mongoose')
const User = require('../models/userModel')
//get all conges
const getConges = async (req, res) => {
    const conges = await Conges.find({}).sort({ createdAt: -1 })
    res.status(200).json(conges)
} 

//////////////////EMPLOYEE/////////////
 // get conges for every employee
const getMyConges = async (req, res) => {
    const userId = req.user._id
    const conges = await Conges.find({employee: userId}).sort({ createdAt: -1 })
    res.status(200).json(conges)
}
const getMyCongesEnCours = async (req, res) => {
    try {
        const userId = req.user._id;
        const conges = await Conges.find({ employee: userId, resultat: 'en cours' }).sort({ createdAt: -1 });

        if (conges.length === 0) {
            return res.status(404).json({ error: 'No conges in progress for the user' });
        }

        res.status(200).json(conges);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
//mynotencours
const getMyCongesNotEnCours = async (req, res) => {
    try {
        const userId = req.user._id;
        const conges = await Conges.find({ employee: userId, resultat: { $ne: 'en cours' } }).sort({ createdAt: -1 });

        // Send an empty list if no conges are found
        res.status(200).json(conges);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//get a single conges

const getConge = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such conge' });
    }

    try {
        const conge = await Conges.findById(id).populate('employee', 'firstname lastname'); // Add the fields you want to populate

        if (!conge) {
            return res.status(404).json({ error: 'No such conge' });
        }

        res.status(200).json(conge);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// get all conges where resultat is not en cours 
const getCongesByResultat = async (req, res) => {
    try {
        const { resultat } = req.params;

        // Validate that the provided resultat is not 'en cours'
        if (resultat && resultat.toLowerCase() === 'en cours') {
            return res.status(400).json({ error: 'Invalid resultat value' });
        }

        // Construct the query based on the provided resultat (if any)
        const query = resultat ? { resultat: { $ne: 'en cours' } } : { resultat: { $ne: 'en cours' } };

        // Find conges based on the query
        const conges = await Conges.find(query).populate('employee', 'firstname lastname');

        // Check if any conges are found
        if (conges.length === 0) {
            return res.status(404).json({ error: 'No matching conges found' });
        }

        // If conges are found, send them as a JSON response with a 200 status code
        res.status(200).json(conges);
    } catch (error) {
        // Handle any errors that occur during the database query or processing
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
/*
const getCongesByResultat = async (req, res) => {
    try {
        const { resultat } = req.params;

        // Validate that the provided resultat is not 'en cours'
        if (resultat && resultat.toLowerCase() === 'en cours') {
            return res.status(400).json({ error: 'Invalid resultat value' });
        }

        // Construct the query based on the provided resultat (if any)
        const query = resultat ? { resultat: { $ne: 'en cours' } } : { resultat: { $ne: 'en cours' } };

        // Find conges based on the query
        const conges = await Conges.find(query).populate('User', 'firstname lastname');

        // Check if any conges are found
        if (conges.length === 0) {
            return res.status(404).json({ error: 'No matching conges found' });
        }

        // If conges are found, send them as a JSON response with a 200 status code
        res.status(200).json(conges);
    } catch (error) {
        // Handle any errors that occur during the database query or processing
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
*/
const getCongesEncours = async (req, res) => {
    try {
        const conges = await Conges.find({ resultat: 'en cours' }).populate('employee', 'firstname lastname');

        // Check if any conges are found
        if (conges.length === 0) {
            return res.status(404).json({ error: 'No conges in progress' });
        }

        // If conges are found, send them as a JSON response with a 200 status code
        res.status(200).json(conges);
    } catch (error) {
        // Handle any errors that occur during the database query or processing
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const getCongeAccepter = async (req, res) => {
    try {
        const conges = await Conges.find({ resultat: 'accepte' }).populate('employee', 'firstname lastname');
        if (conges.length === 0) {
            return res.status(404).json({ error: 'No conges is accepted' });
        }
        res.status(200).json(conges);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


//create new conges
const createConge = async (req, res) => {
    // Assuming user information is available in req.user
    const employee = req.user._id;
    const { DateDebut, DateFin, Raison, Attachement, resultat } = req.body;

    try {
        const conges = await Conges.create({
            resultat,
            DateDebut,
            DateFin,
            Raison,
            Attachement,
            employee
        });

        res.status(200).json(conges);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



// delete a conge
const deleteConge = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {

        return res.status(404).json({ error: 'No such conge' })
    }
    const conge = await Conges.findOneAndDelete({ _id: id })
    if (!conge) {
        return res.status(404).json({ error: 'No such conge' })
    }
    res.status(200).json(conge)
}



//update a conges
const updateConge = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {

        return res.status(404).json({ error: 'No such conge' })
    }

    const conge = await Conges.findOneAndUpdate({ _id: id }, {
        ...req.body
    })
    if (!conge) {
        return res.status(404).json({ error: 'No such conge' })
    }
    res.status(200).json(conge)



}
const accepteConge = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such conge' });
    }

    try {
        const conge = await Conges.findByIdAndUpdate(id, { resultat: 'accepte' }, { new: true });

        if (!conge) {
            return res.status(404).json({ error: 'No such conge' });
        }

        res.status(200).json(conge);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const refuseConge = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such conge' });
    }

    try {
        const conge = await Conges.findByIdAndUpdate(id, { resultat: 'refuse' }, { new: true });

        if (!conge) {
            return res.status(404).json({ error: 'No such conge' });
        }

        res.status(200).json(conge);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getConges,
    getConge,
    createConge,
    deleteConge,
    updateConge,
    getCongesEncours,
    getCongesByResultat,
    refuseConge,
    accepteConge,
    getCongeAccepter,getMyConges,getMyCongesEnCours,getMyCongesNotEnCours
}