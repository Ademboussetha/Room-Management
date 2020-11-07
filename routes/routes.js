const express = require('express');

const router = express.Router();
const routes= require('../controllers/controller');
//POST REQUESTS
router.post('/login/submit',routes.logi);
router.post('/signup/submit',routes.signuped);
router.post('/seance/submit',routes.submitseance);
router.post('/attente/submit',routes.submitattente);
router.post('/validerseance/submit',routes.validerseance);

//GET  REQUESTS
router.get('/signup',routes.signup);
router.get('/',routes.home);
router.get('/login',routes.log);
router.get('/profil',routes.profil);
router.get('/logout',routes.logout);
router.get('/waiting',routes.wait);
router.get('/workspace',routes.workspace)
router.get('/attente',routes.attente)

module.exports = router;