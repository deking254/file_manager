//This class provides a set of functions to the files table like updating, retreival and delete.

class DbFileHandler {
    constuctor() {
        this.parentId = null;
        this.foundParent = false;
        this.isParentAFolder = false;
        //This function takes in a userId and returns
        this.check_parent_presence = async (_user_id, data) => {
            db.database.collection('files').find({}).toArray((err, result) => {
                for (let i = 0; i < result.length; i++) {
                    if (result[i]._id.toString() === data.parentId) {
                        foundParent = true;
                        if (result[i].type === 'folder') {
                            parentFileId = result[i]._id;
                            isparentAFolder = true;
                        }
                    }
                }
            });
            return this.foundParent;
        }
    }
}
export default new DbUserHandler();