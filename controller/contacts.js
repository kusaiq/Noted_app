const errorResponse = require('../utils/errorResponse');//I say what the error is
const asyncHandler = require('../middleware/async');
const Contact = require('../models/Contacts');


//shows all contacts
//roue get >>> /api/v1/contacts
//access private (most be logged in)
exports.getContacts = asyncHandler(async (req, res, next) => {
    req.body.user = req.user.id;
    const contact = await Contact.find({ user: req.user.id })
    res.status(200).json({ success: true, data: contact});
});

//create a contacts
//roue post >>> /api/v1/contacts
//access private (most be logged in)
exports.createContact = asyncHandler(async (req, res, next) => {
    req.body.user = req.user.id;

    const contact = await Contact.create(req.body);//it includes req.body.bootcamp
    res.status(201).json({ success: true, data: contact});
});

//update a contacts
//roue put >>> /api/v1/contacts/:id
//access private (most be logged in)
exports.updateContact = asyncHandler(async (req, res, next) => {
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
        return next(new errorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    }
    //make sure currently looged in user is the ownor
    if (contact.user.toString() !== req.user.id ) {
        return next(
            new errorResponse(
                `User ${req.params.id} is not authorized to update this contact`, 401)
        )
    };
   contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    res.status(200).json({ success: true, data: contact });
});

//delete a contacts
//roue delete >>> /api/v1/contacts/:id
//access private (most be logged in)
exports.deleteContact = asyncHandler(async (req, res, next) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        return next(new errorResponse(`contact not found with id of ${req.params.id}`, 404)
        );
    }
        // Make sure user is bootcamp owner
        if (contact.user.toString() !== req.user.id ) {
            return next(
                new errorResponse(
                    `User ${req.params.id} is not authorized to update this contact`, 401)
            )
        };
        await Contact.findByIdAndRemove(req.params.id);
        res.status(200).json({ success: true, data: contact });

});