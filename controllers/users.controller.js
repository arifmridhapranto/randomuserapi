const users = require('../users.json');
const fs = require("fs");

module.exports.getAllUsers = (req, res, next) => {

    const limit = req.query.limit;
    const results = users.slice(0, limit);
    res.json(results);
};


module.exports.getRandomUser = (req, res, next) => {
    const values = Object.values(users);
    const randomValue = values[parseInt(Math.random() * values.length)];
    res.json(randomValue);
}

module.exports.saveUser = (req, res, next) => {

    const name = req.body.name;
    const gender = req.body.gender;
    const photoUrl = req.body.photoUrl;
    const address = req.body.address;
    const phone = req.body.phone;


    const newUser = {
      '_id': "id",
      'name': name,
      'gender': gender,
      'photoUrl': photoUrl,
      'address': address,
      'phone': phone,
    };

    let data = JSON.stringify(newUser,null,2);
    fs.writeFile('../users.json', data, (error) => {
      if (error) {
        console.log("An error has occurred ", error);
        return;
      }
      console.log("Data written successfully to disk");
    });


};
