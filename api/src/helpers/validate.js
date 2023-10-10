const validate = (req, res, next) => {
  const { name, image, life, attack, defense, speed, height, weight, types } = req.body;
  const URLRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
  
  const errors = [];
  if(!name) errors.push("Name is required");
  else if (name.length >= 25) errors.push("Not more than 25 characters are allowed.");

  if(!image) errors.push("Image is required");
  else if(!URLRegex.test(image)) errors.push("Image must  be an URL.");

  if(!life) errors.push("Life is required");
  if(!attack) errors.push("Attack is required");
  if(!defense) errors.push("Defense is required");
  if(!types.length) errors.push("Types are required");
  
  if(errors.length > 0) {
    return res.status(400).json({ error: errors });
  }
  next();
  };

  module.exports = validate;