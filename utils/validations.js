const { check, validationResult } = require('express-validator');

exports.validateUser = [check('username', 'Enter a valid name').isLength({ min: 3 }), check('email', 'Enter a valid email').isEmail(), check('password').isLength({min: 6}), (req, res, next) => {

    const errors = validationResult(req);


    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    next();
},
];

exports.validateLogin = [check('email', 'Enter a valid email').isEmail(), check('password','Invalid password').isLength({min: 6}), (req, res, next) => {

    const errors = validationResult(req);


    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    next();
},
];