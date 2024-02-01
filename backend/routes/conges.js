const express = require('express')
//const Conges = require('../models/congesModel')
const router = express.Router()
const {
    getConges,getMyConges,
    getConge,
    createConge,
    deleteConge,
    updateConge,
    getCongesEncours,
    getCongesByResultat, refuseConge,
    accepteConge,    getCongeAccepter,getMyCongesEnCours,getMyCongesNotEnCours

} = require('../controllers/congesController')

const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)


//get all conges

//employee
router.get('/my', getMyConges)
router.get('/myencours', getMyCongesEnCours)
router.get('/mynotencours', getMyCongesNotEnCours)

router.get('/', getConges)
//get all conges en  cours
router.get('/encours', getCongesEncours)
router.get('/accepter', getCongeAccepter)

router.get('/historique', getCongesByResultat)
//get a single conge
router.get('/:id', getConge)

//post a new conge
router.post('/add', createConge)

//delete a conge
router.delete('/:id', deleteConge)



//update a conge
router.patch('/:id', updateConge)

// New routes for accepte and refuse
router.put('/accepte/:id', accepteConge);
router.put('/refuse/:id', refuseConge);
module.exports = router 