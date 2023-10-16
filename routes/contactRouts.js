const express = require("express");
const router = express.Router();

const {
    getContact , 
    createContact , 
    getContacts , 
    updateContact,
    deleteContact
} = require("../controllers/contactController.js");
const validateToken = require("../middleware/validateTokenHandler.js");

router.use(validateToken)

router.route("/").get(getContacts);

router.route("/").post(createContact);

router.route("/:id").put(updateContact);

router.route("/:id").delete(deleteContact);

router.route("/:id").get(getContact); 


module.exports = router ;
 