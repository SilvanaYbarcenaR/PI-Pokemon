const validation = ({ name, image, life, attack, defense, speed, height, weight, types }) => {
  let errors = {};
  const URLRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

  const requiredMessage = (nameProp) => {
    errors[nameProp] = `${nameProp.toUpperCase()} is a required field.`;
  };
  const numberMessage = (nameProp) => {
    errors[nameProp] = `${nameProp.toUpperCase()} must be a number.`;
  };

  if(!name) requiredMessage("name");
  else if (name.length >= 25) errors.name = "Not more than 25 characters are allowed.";

  if(!image) requiredMessage("image");
  else if(!URLRegex.test(image)) errors.image = "IMAGE must  be an URL.";

  if(!life) requiredMessage("life");
  else if(isNaN(life)) numberMessage("life");

  if(!attack) requiredMessage("attack");
  else if(isNaN(attack)) numberMessage("attack");
  
  if(!defense) requiredMessage("defense");
  if(isNaN(defense)) numberMessage("defense");

  if(isNaN(speed)) numberMessage("speed");
  if(isNaN(height)) numberMessage("height");
  if(isNaN(weight)) numberMessage("weight");

  if(!types.length) requiredMessage("types");

  return errors;
}

export default validation;