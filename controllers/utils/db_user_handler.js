//This class provides a set of functions to the users table like updating, retreival and delete.

class DbUserHandler {
    constuctor() {
        this.userId = null;
        this.foundUser = false;
        //This function takes in a userId and returns
        this.check_user_presence = async (_user_id) => {
            db.database.collection('users').find({}).toArray((err, result) => {
                if (result.length > 0) {
                    for (let i = 0; i < result.length; i++) {
                        if (result[i]._id.toString() === _user_id) {
                            this.userId = result[i]._id;
                            this.foundUser = true;
                        }
                    }
                }
            });
            return this.foundUser;
        }
    }
}
export default new DbUserHandler();