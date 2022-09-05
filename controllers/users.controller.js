const users = require('./users.json');
const fs = require("fs");
const ShortUUID = require("shortuuid");


const su = new ShortUUID(
  "23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
);

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
  const data2 = fs.readFileSync(
    __dirname + "/users.json",
    function (err, data) {}
  );

  const users2 = JSON.parse(data2);

  const name = req.body.name;
  const gender = req.body.gender;
  const photoUrl = req.body.photoUrl;
  const address = req.body.address;
  const phone = req.body.phone;


  if (name.length === 0 || gender.length === 0  || photoUrl.length === 0 || address.length === 0  || phone.length === 0) {
    console.log("data is missing");
    return;
  }

  const newUser = {
    _id: su.random(24),
    name: name,
    gender: gender,
    photoUrl: photoUrl,
    address: address,
    phone: phone,
  };

  const newUsers = [...users2, newUser];

  let data = JSON.stringify(newUsers, null, 2);

  fs.writeFile(__dirname + "/users.json", data, (errors) => {
    if (errors) return console.error(errors);
  });
  res.status(200).json({ status: 200, message: "Success!" });
};

module.exports.deleteUser = (req, res, next) => {

  const id = req.params.id;
  const validate = users.filter(user => {
    if (user._id == id) {
      const afterDeleteUser = users.filter((user) => user._id != id);

      let data = JSON.stringify(afterDeleteUser, null, 2);

      fs.writeFile(__dirname + "/users.json", data, (errors) => {
        if (errors) return console.error(errors);
      });
      res.status(200).json({ status: 200, message: "Success! user deleted" });
    }
  })
  if (validate.length === 0) {
    res.json({message:'please provide a valid id'});
  }
};



module.exports.updateUser = (req, res, next) => {
  const id = req.params.id;

  const user = users.find(user => {
    if (user._id == id) {
      const updateUser = {
        name: req.body.name || user.name,
        address: req.body.address || user.address,
        phone: req.body.phone || user.phone,
        gender: req.body.gender || user.gender,
        photoUrl: req.body.photoUrl || user.photoUrl,
      }
      console.log(updateUser);
      res.setHeader("Content-Type", "application/json");
      res.json({ message: updateUser });
    } else {
      res.json({message: "user not Found to update data!"});
    }
  });
};



