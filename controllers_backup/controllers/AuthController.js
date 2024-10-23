const authCtrl = require('../controllers/AuthController');
const basicAuth = require('base64-js');
const database = require('../utils/db');
const cache = require('../utils/redis');
const sha = require('sha1');
const uuid = require('uuid');
class AuthController {
  constructor() {
    this.getConnect = async (req, res) => {
      if (req.header("Authorization")) {
        let authCode = req.header("Authorization").split(' ')[1];
        try {
          let byteCode = basicAuth.toByteArray(authCode);
          let emailAndPassword = new TextDecoder().decode(byteCode);
          if (!emailAndPassword.includes(':')) {
            res.status(401).send({ "error": "Unauthorized" });
          }
          emailAndPassword = emailAndPassword.split(':');
          let email = emailAndPassword[0];
          let hashedPassword = sha(emailAndPassword[1]);
          let user = database.database.collection('users').find({ 'email': email, 'password': hashedPassword }).toArray(async (err, result) => {
            if (!err) {
              if (result.length) {
                let userResult = result[0];
                let token = uuid.v4();
                if (cache.client.isReady) {
                  await cache.client.set("auth_" + token, userResult._id.toString(), 86400);
                } else {
                  await cache.client.connect();
                  if (cache.client.isReady) {
                    await cache.client.set("auth_" + token, userResult._id.toString(), 86400);
                  } else {
                    console.log("Despite efforts, the application still has a challenge to connecting the client. A possible solution for this is to restart the redis.service");
                  }
                }
                res.status(200).send({ 'token': token });
              } else {
                res.status(401).send({ "error": "Unauthorized" });
              }
            }
          })
        } catch (e) {
          console.log(e);
          res.status(401).send({ "error": "Unauthorized" });
        }
      } else {
        res.status(401).send({ "error": "Unauthorized" });
      }
    }


    this.getDisconnect = async (req, res) => {
      let tokenSupplied = req.header("X-Token");
      if (!tokenSupplied) {
        res.status(401).send({ "error": "Unauthorized" })
      }
      let userId = await cache.get('auth_' + tokenSupplied);
      if (userId) {
        let usr = database.database.collection('users').find({}).toArray((err, result) => {
          if (!err) {
            if (result.length) {
              let found = false;
              for (let i = 0; i < result.length; i++) {
                if (result[i]._id.toString() === userId) {
                  found = true;
                  cache.del("auth_" + tokenSupplied);
                  res.status(204).send()
                }
              }
              if (found === false) {
                res.status(401).send({ "error": "Unauthorized" });
              }
            } else {
              res.status(401).send({ "error": "Unauthorized" });
            }
          }
        })
      } else {
        res.status(401).send({ "error": "Unauthorized" });
      }
    }
  }
}
const authContrllr = new AuthController()
module.exports = authContrllr;
