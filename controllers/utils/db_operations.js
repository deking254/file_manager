//This class provides a set of functions to the users table like updating, retreival and delete.
const db = require('../../utils/db');
const messages = require('./constants');
class Db_operations {
    constuctor() {

    }
    //This function takes in a userId and returns
    check_user_presence(_user_id) {
        db.database.collection(messages.DB_TABLES.USER_TABLE).find({}).toArray((err, result) => {
            if (!err) {
                if (result.length > 0) {
                    for (let i = 0; i < result.length; i++) {
                        if (result[i]._id.toString() === _user_id) {
                            return true;
                        }
                    }
                }
            } else {
                throw new Error(messages.ERROR_MESSAGES.DB_ERROR);
            }
        });
        return false;
    }

    //This function checks the database if the parentId in data exists as a folder in the database
    //please remeber to turn this to an async function and add the appropriate changes to the function call in the perform_operation function below
    get_parent_id(data) {
        const foundParent = false;
        db.database.collection(messages.DB_TABLES.FILE_TABLE).find({}).toArray((err, result) => {
            if (err === null) {
                for (let i = 0; i < result.length; i++) {
                    if (result[i]._id.toString() === data.parentId) {
                        if (result[i].type === messages.TYPES.FOLDER_TYPE) {
                            foundParent = true;
                            return result[i]._id;
                        } else {
                            throw new Error(messages.ERROR_MESSAGES.PARENT_NOT_FOLDER);
                        }
                    }
                }
                if (!foundParent && data.parentId) {
                    throw new Error(messages.ERROR_MESSAGES.PARENT_NON_EXISTENT);
                }
            }
            return null;
        })
    }

    //Inserts the data object into the db
    async db_insert(data) {
        await db.database.collection(messages.DB_TABLES.FILE_TABLE).insertOne(data, (err, result) => {
            if (err === null) {
                console.log('File information successfully added to the database', result.ops[0]);
                const { _id, userId, type, name, isPublic, parentId } = result.ops[0];
                // const object = {};
                // object.id = result.ops[0]._id;
                // object.userId = result.ops[0].userId.toString();
                // object.type = result.ops[0].type;
                // object.name = result.ops[0].name;
                // object.isPublic = result.ops[0].isPublic;
                // object.parentId = result.ops[0].parentId;
                const object = {
                    id: _id,
                    userId: userId.toString(),
                    type,
                    name,
                    isPublic,
                    parentId
                };
                return { status: 200, object: object };
            } else {
                throw new Error(messages.ERROR_MESSAGES.FILE_ADD_TO_DB_ERROR);
            }
        });
    }
    //get user files
    db_get_user_items(_user_id) {

    }
    // This function fetches all the public folders from the database
    // async db_get_public_folders() {
    //     db.database.collection(messages.DB_TABLES.FILE_TABLE).find({}).toArray((err, result) => {
    //         let _public_folder = [];
    //         for (let i = 0; i < result.length; i++) {
    //             if (result[i].isPublic === true) {
    //                 if (result[i].type === messages.TYPES.FOLDER_TYPE) {
    //                     _public_folder.push(result[i]);
    //                 }
    //             }
    //         }
    //         return { status: 200, folders: _public_folder };
    //     })
    // }

    async getPublicFolders() {
        try {
            const result = await db.database.collection(messages.DB_TABLES.FILE_TABLE).find({}).toArray();
            const _public_folder = result.filter(({ isPublic, type }) => isPublic && type === messages.TYPES.FOLDER_TYPE);

            return { status: 200, folders: _public_folder };
        } catch (err) {
            console.error('Error fetching folders:', err);
            return { status: 500, message: 'Internal Server Error' };
        }
    }


    // This function brings together all the functions above. This function gets called in the filecontroller.js file
    async perform_operation(data) {
        if (data.parentId === 'null') {
            console.log('The perform_operations function finds the data to have a parentId equal to string null');
            data.parentId = null;
            await this.db_insert(data);
        } else {
            console.log('The perform_operations function finds the data to have a parentId not equal to string null');
            let parentId = this.get_parent_id(data);
            data.parentId = parentId;
            await this.db_insert(data);
        }
    }


}
module.exports = new Db_operations();
