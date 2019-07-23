const { body, validationResult } = require('express-validator')

module.exports = {
  todoValidator: [
    body('name')
      .exists()
      .trim()
      .withMessage('Todo名稱為必填'),
  ],
  registerValidator: [
    body('name')
      .exists()
      .trim()
      .withMessage('名稱為必填'),
    body('email')
      .exists()
      .isEmail()
      .withMessage('email 為必填'),
    body('password')
      .exists()
      .isLength({ min: 4, max: 4 })
      .withMessage('password 為必填，長度為4碼'),
    body('password2')
      .exists()
      .withMessage('password2 為必填')
      .custom((value, { req }) => value === req.body.password)
      .withMessage('password 與 password2 必須相同')
  ]
}