//This file contains the error handler class to ensure that all fields for the data are filled out appropriately
const messages = require('./constants');

class Field_checker {
    constructor(data) {
        this.check_fields(data);
    }
    //checks that field name is set
    check_name(data) {
        if (!data.name) {
            throw new Error(messages.ERROR_MESSAGES.MISSING_NAME)
        } else {
            return true;
        }
    }


    //checks that type field is set appropriately
    check_type(data) {
        if (!data.type) {
            throw new Error(messages.ERROR_MESSAGES.MISSING_TYPE)
        } else {
            if (this.valid_type(data)) {
                return true;
            } else {
                throw new Error(messages.ERROR_MESSAGES.INVALID_TYPE);
            }
        }
    }


    //Checks that the data has type as the expected types
    valid_type(data) {
        return messages.DATA_TYPES.includes(data.type);
    }


    //checks that field name is set
    check_data(data) {
        try {
            this.check_name(data);
            if (data.type === messages.TYPES.FILE_TYPE || data.type === messages.TYPES.IMAGE_TYPE) {
                if (!data.data) {
                    throw new Error(messages.ERROR_MESSAGES.MISSING_DATA)
                } else {
                    return true;
                }
            }
        } catch (e) {
            throw new Error(`${e.message}`);
        }

    }

    //checks if all the fields are as they are required
    check_fields(data) {
        try {
            this.check_name(data);
            this.check_type(data);
            this.check_data(data);
        } catch (e) {
            throw new Error(`${e.message}`);
        }
    }
}
module.exports = Field_checker;
