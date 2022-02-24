const { db } = require("../firebase");

const { Router } = require("express");
const router = Router();


// Obtnemos un contacto
router.get('/', async(req, res) => {

    const querySnapshot = await db.collection('contacts').get()
    const contacts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }))
   
    res.render('index', {contacts});
});

// Creamos un contacto
router.post('/new-contact', async(req, res) => {
    const { firstname, lastname, email, phone } = req.body;
    
    await db.collection('contacts').add({
        firstname, 
        lastname,
        email,
        phone,
    });
    res.redirect('/');
});

// Editamos un contacto
router.get('/edit-contact/:id', async(req, res) => {

    const doc = await db.collection('contacts').doc(req.params.id).get();

    res.render('index', {contact: {id: doc.id, ...doc.data() } } );
});

// Eliminamos un contacto
router.get('/delete-contact/:id', async(req, res) => {
    await db.collection('contacts').doc(req.params.id).delete()
    res.redirect('/');
});

// Actualizamos un contacto 
router.post('/update-contact/:id', async(req, res) => {
    const {id} = req.params;
    await db.collection('contacts').doc(id).update(req.body);

    res.redirect('/');
});

module.exports = router;