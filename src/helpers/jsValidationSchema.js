import Joi from '@hapi/joi'

// validation schema for js objects
const jsValidationSchema = Joi.object({
    'capital': Joi.string()
})


// custom error messages
const customErrorMessages = {
    'string.empty': 'Please input a value'
}

export default {
    jsValidationSchema,
    customErrorMessages
}