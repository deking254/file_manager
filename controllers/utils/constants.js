// This is a collection of common data used across the project 
const ERROR_MESSAGES = {
    UNAUTHORIZED: '{"status": 401, "error":"Unauthorized"}',
    CACHE_ERROR: '{"status": 401, "error": "Cache error"}',
    PARENT_NOT_FOLDER: '{"status": 400, "error":"Parent is not a folder"}',
    PARENT_NON_EXISTENT: '{"status": 400, "error":"Parent does not exist"}',
    PATH_NON_EXISTENT: '{"status": 400, "error": "Path error"}',
    MISSING_NAME: '{"status": 400, "error": "Missing name"}',
    MISSING_TYPE: '{"status": 400, "error": "Missing type"}',
    MISSING_DATA: '{"status": 400, "error": "Missing data"}',
    INVALID_TYPE: '{"status": 400, "error": "Invalid data type"}',
    TEXT_DECRYPTION_ERROR: '{"status": 400, "error": "Text decryption error"}',
    FILE_WRITE_ERROR: '{"status": 400, "error": "Error writing to file"}',
    FOLDER_WRITE_ERROR: '{"status": 400, "error": "Folder could not be created"}',
    FOLDER_EXISTS: '{"status": 400, "error": "Folder already exists"}',
    FILE_ADD_TO_DB_ERROR: '{"status": 400, "error": "Error adding file to the database" }',
    DB_ERROR: '{"status": 400, "error": "Database Error" }'
};
const DB_TABLES = {
    USER_TABLE: 'users',
    FILE_TABLE: 'files',
};
const TYPES = {
    FILE_TYPE: 'file',
    FOLDER_TYPE: 'folder',
    IMAGE_TYPE: 'image'
}
const SUCCESS_MESSAGES = {
    USER_CREATED: "User created successfully.",
    FILE_CREATED: "File created successfully.",
    PATH_CREATED: "Path created successfully.",
    FOLDER_CREATED: "Folder created successfully.",
    AUTHORIZED: '{"status": 200, "success":"Access granted"}',
};

const PATH = '/tmp/files_manager';
const DATA_TYPES = ['file', 'folder', 'image'];

module.exports = { ERROR_MESSAGES, DB_TABLES, TYPES, SUCCESS_MESSAGES, PATH, DATA_TYPES };
