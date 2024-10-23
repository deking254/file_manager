//This is an abstraction of the data.type==file requests. It also handles any errors in the fields and returns a valid object
const messages = require('./constants');
const file = require('fs');
const { env } = require('process');
const fs = require('fs').promises;
const base = require('base64-js');

class File_operations {
    constructor() {
        //this.filename = data.name ? data.name : v4().toString();
        this.path = env.FOLDER_PATH ? env.FOLDER_PATH : messages.PATH;
    }

    //decrypts the text in the file
    decrypt_text_data(data) {
        try {
            return new TextDecoder().decode(base.toByteArray(data.data));
        } catch (e) {
            throw new Error(messages.ERROR_MESSAGES.TEXT_DECRYPTION_ERROR);
        }
    }



    //This method sets the localPath field
    set_localPath(data) {
        data.localPath = `${this.path}/${data.name}`;
    }

    //This method writes the decrypted data to the file
    write_file(data) {
        file.exists(this.path, (exists) => {
            if (exists) {
                this.set_localPath(data);
                file.writeFile(data.localPath, this.decrypt_text_data(data), (err) => {
                    if (err) {
                        throw new Error(messages.ERROR_MESSAGES.FILE_WRITE_ERROR);
                    }
                })
            } else {
                throw new Error(messages.ERROR_MESSAGES.PATH_NON_EXISTENT);
            }
        })
    }

    //checks if the path provided is already set up
    async check_path_availability(path) {
        try {
            await fs.access(path);
            return true; // Path exists
        } catch (err) {
            return false; // Path does not exist
        }
    }

    //creates folder
    async create_folder(data) {
        if (!await this.check_path_availability(`${this.path}/${data.name}`)) {
            file.mkdir(`${this.path}/${data.name}`, { recursive: true }, (err) => {
                if (err === null) {
                    console.log(messages.SUCCESS_MESSAGES.FOLDER_CREATED);
                } else {
                    throw new Error(messages.ERROR_MESSAGES.FOLDER_WRITE_ERROR);
                }
            });
        } else {
            throw new Error(messages.ERROR_MESSAGES.FOLDER_EXISTS);
        }
    }

    //This function is called when the path provided does not exist and needs to be created
    async create_path(path) {
        let path_availability = await this.check_path_availability(path);
        console.log(path_availability);
        if (!path_availability) {
            file.mkdir(path, { recursive: true }, (err) => {
                if (err === null) {
                    console.log(messages.SUCCESS_MESSAGES.PATH_CREATED);

                } else {
                    throw new Error(messages.ERROR_MESSAGES.FOLDER_WRITE_ERROR);
                }
            })
        }
    }

    //Perform appropriate file operations on the data
    async perform_operation(data) {
        await this.create_path(this.path);
        if (data.type === messages.TYPES.FILE_TYPE) {
            this.write_file(data);
        }
        if (data.type === messages.TYPES.FOLDER_TYPE) {
            await this.create_folder(data);
        }
    }


}

module.exports = new File_operations();
