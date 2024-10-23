//This is an abstraction of the data.type==file requests. It also handles any errors in the fields and returns a valid object
const db = require('../utils/db');

class File_object {
    constructor(data) {
        this.type = this.file_type(data);
        this.filename = data.name ? data.name : v4().toString();
        this.decryptedData = new TextDecoder().decode(base.toByteArray(data.data));
        this.path = env.FOLDER_PATH ? env.FOLDER_PATH : '/tmp/files_manager';
        this.localPath = `${this.path}/${this.fileName}`;
        this.isPublic = data.isPublic ? true : false;
        this.parentExists = false;
        this.parentId = this.parent_availability(data);

    }
    //This function checks the database if the parentId in data exists as a folder in the database
    parent_availability(data) {
        let parentFileId = 0;
        db.database.collection('files').find({}).toArray((err, result) => {
            let foundParent = false;
            for (let i = 0; i < result.length; i++) {
                if (result[i]._id.toString() === data.parentId) {
                    foundParent = true;
                    if (result[i].type === 'folder') {
                        parentFileId = result[i]._id;
                    } else {
                        throw new Error("Parent is not a folder");
                    }
                }
            }
            if (!foundParent) {
                throw new Error("Parent does not exist");
            }
        })
        return parentFileId;
    }
    //Checks that the data has type as file
    file_type(data) {
        if (data.type === 'file') {
            return 'file';
        } else {
            throw new Error("Type is not file");
        }
    }
    write_file(data) {
        file.exists(path, (exists) => {
            if (exists) {
                file.writeFile(this.localPath, this.decryptedData, (err) => {
                    if (err) {
                        return err;
                    }
                })
            } else {
                throw new Error("The provided path does not exist");
            }
        })
    }
    //inserts the data object into the db
    db_insert(data) {
        db.database.collection('files').insertOne(data, (err, result) => {
            if (err === null) {
                console.log('File information successfully added to the database');
                const object = {};
                object.id = result.ops[0]._id;
                object.userId = result.ops[0].userId.toString();
                object.type = result.ops[0].type;
                object.name = result.ops[0].name;
                object.isPublic = result.ops[0].isPublic;
                object.parentId = result.ops[0].parentId;
                res.status(201).send(object);
            } else {
                res.status(201).send({ error: 'Error adding to the database' });
            }
        });
    }
    //This function is called when the path provided does not exist and needs to be created
    create_path() {
        file.mkdir(this.path, { recurssive: true }, (err) => {
            console.log('The provided folder does not exist');
            if (err === null) {
                console.log('The provided folder wascreated successfully');
                file.writeFile(`${path}/${fileName}`, decryptedData, (err) => {
                    // file.writeFileSync(`${path}/${fileName}`, decryptedData);
                    console.log('Creating the file and performing a write operation on it');
                    if (err === null) {
                        data.userId = userId;
                        data.parentId = parentFileId;
                        if (data.isPublic === undefined) {
                            data.isPublic = false;
                        }
                    }
                })
            }
        })
    }


}