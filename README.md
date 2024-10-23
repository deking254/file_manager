This project looks at how to manage files
To test out the api follow the following instructions:
 1. setup 2 ubuntu-focal 20.X console windows
 2. On one console window type 'node server.js' to start up the express server
 3. Once the server is connected you will see a message letting you know.
 4. You can start by creating an account by passing the following command to the second window 'curl -d '{"email": "dekingsky@gmail.com", "password": "#Dekingdenno254"}' http://127.0.0.1:5000/users'
 5. The command above will return something like this {"id":"66f50c8f4603e94441357646","email":"dekingsy@gmail.com"} This shows that it was successful.
 6. You can then log in using the command like this one "curl -H "Authorization: Basic bmV3dXNlckBleGFtcGxlLmNvbTp5b3VyU2VjdXJlUGFzc3dvcmQ=" http://127.0.0.1:5000/connect"  where the code after basic is the btoa("email:password")
 7. If the credentials are verifiable, you will see this response {"token":"496b9ea0-73c9-4160-8954-fc0f8d7443b1"}. The token will be unique for each session.:q
 8. To get a list of files belonging to the user use the command curl -H "X-Token: 4c573e00-71e9-4528-b403-75f750257c86" http://127.0.0.1:5000/files. Note that the token used for the X-Token header is the one returned from the step 7 above.
 9.  8. To get a list of files belonging to the user use the command curl -H "X-Token: 4c573e00-71e9-4528-b403-75f750257c86" http://127.0.0.1:5000/files. Note that the token used for the X-Token header is the one returned from the step 7 above.
 9.  8. To get a list of files belonging to the user use the command curl -H "X-Token: 4c573e00-71e9-4528-b403-75f750257c86" http://127.0.0.1:5000/files. Note that the token used for the X-Token header is the one returned from the step 7 above.
 9.  8. To get a list of files belonging to the user use the command curl -H "X-Token: 4c573e00-71e9-4528-b403-75f750257c86" http://127.0.0.1:5000/files. Note that the token used for the X-Token header is the one returned from the step 7 above.
 9.  8. To get a list of files belonging to the user use the command curl -H "X-Token: 4c573e00-71e9-4528-b403-75f750257c86" http://127.0.0.1:5000/files. Note that the token used for the X-Token header is the one returned from the step 7 above.
 9.  8. To get a list of files belonging to the user use the command curl -H "X-Token: 4c573e00-71e9-4528-b403-75f750257c86" http://127.0.0.1:5000/files. Note that the token used for the X-Token header is the one returned from the step 7 above.
 9.  8. To get a list of files belonging to the user use the command curl -H "X-Token: 4c573e00-71e9-4528-b403-75f750257c86" http://127.0.0.1:5000/files. Note that the token used for the X-Token header is the one returned from the step 7 above.
 9.  8. To get a list of files belonging to the user use the command curl -H "X-Token: 4c573e00-71e9-4528-b403-75f750257c86" http://127.0.0.1:5000/files. Note that the token used for the X-Token header is the one returned from the step 7 above.
 9. To create a file or a folder, you need to use the /files endpoint. An example would be curl -H "Content-Type: application/json" -H "X-Token: 4c573e00-71e9-4528-b403-75f750257c86" -d '{"name":"resumes", "type":"folder"}' -X POST http://127.0.0.1:5000/files which is a post request that will tell the serve to create a folder in the /tmp/files_manager folder.
 10. To create a file you need to specify 'file' in the type variable in the data in the post request

 There are three types of data in this program. It could either be a file, a folder or an image. This list is ofcourse set to expand in the future and include other types of data.
 A user signs up using the browser interface where the email are the only fields required. Future versions of the program will include an email verification system as well as oauth using google.
 The program will also include a password match-making between the two password fields(if not already).
 The data can be set as either a public or private when creating the data.
 Once the registration is complete and the server returns success. The user will be required to login.
 The status notification of the login as far as it being successful is not currently implemented but we'll add a notification component in the user interface.
 What happens is that the server returns a token which is then saved in the browser session storage under the key 'authToken'
 This token will be used for all subsequent logins.
 If a user logs out, then token will be deleted in the server's cache rendering the token in the browser invalid.
 The user, on successful login, can access the files api where there will be a list of the files created by the user.
 The user can add more files to the already existing files.
 Each file will have the user's signature through the userId field in the added file data
 The user can also create folders and images.
 During the creating of a file the user can select the folder the file will belong to or leave it empty meaning the file will just be at the root of the program file structure.
 The folders listed on the folder selection element will only be those folders that were created by the user. Meaning those that have the userId field equal to the user's id. And those folders that belong to other users but have the property isPublic set to true.
 
 The user can also add in the data field to specify what the file will contain.


 Lets go through a different user scenarios
 1. Scenario 1
 A user creates an account.
 A user created
 
The browser interface of the api is also present where you can register a user, add files, login, logout and add folders:
The interface is pretty intuitive and should be pretty easy to understand. 
