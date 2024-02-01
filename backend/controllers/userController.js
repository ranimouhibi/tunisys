const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')


const createToken = (_id) => {
  return jwt.sign({ _id: _id ,role : User.role}, process.env.SECRET, { expiresIn: '3d' })
}


const loginUser = async (req, res) => {
  const { email, password } = req.body
    
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    const { role, solde } = user; // Make sure solde is included in the user object
    res.status(200).json({ email, token, role, id: user._id, solde });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}





const getUserByRole = async (req, res) => {
  try {
    const userRole = req.params.role;
    const userCount = await User.countDocuments({ role: userRole });
    res.json({ count: userCount });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
}

// signup user
const signupUser = async (req, res) => {
  const { firstname, lastname, email, password,role } = req.body   
  try {
    const user = await User.signup(firstname, lastname, email, password,role)
    const token = createToken(user._id)
    res.status(200).json({ firstname, email, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
// get users
const getUsers = async (req, res) => {
  const users = await User.find({})
  res.status(200).json(users)
}
// get users by email
const getUsersByEmail = async (req, res) => {
  const email = req.params.email;
  try {
    const user = await User.findOne({ email: email })
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};
// update user by email
const updateUserByemail = async (req, res) => {
  const userId = req.params.id; // Assuming you're passing the user ID in the URL
  const updatedUserData = req.body; // Assuming you're sending updated data in the request body

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });

    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params._id;
    const profile = await User.findOne({ userId });
    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).send('not found');
  }
}

// delete user
const deleteUser = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such user'})
  }

  const user = await User.findOneAndDelete({_id: id})

  if(!user) {
    return res.status(400).json({error: 'No such user'})
  }

  res.status(200).json(user)
}
// update an user
const updateUser = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such user'})
  }
  const user = await User.findById(id)
  if (!user) {
    return res.status(400).json({error: 'No such user'})
  }
  const { firstname, lastname,email,password, role, solde } = req.body
  if (!lastname && !firstname && !email && !password && !role && !solde ) {
    return res.status(400).json({ error: 'Vous devez au moins modifier un champs' })
  }
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { firstname, lastname,email,password, role,solde},
    { new: true }
  )
  res.status(200).json(updatedUser)
};

//update profile 
const updateProfil = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such user'})
  }
  const user = await User.findById(id)
  if (!user) {
    return res.status(400).json({error: 'No such user'})
  }
  const { firstname, lastname,email,password } = req.body
  if (!lastname && !firstname && !email && !password ) {
    return res.status(400).json({ error: 'Vous devez au moins modifier un champs' })
  }
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { firstname, lastname,email,password},
    { new: true }
  )
  res.status(200).json(updatedUser)
};
const createUser = async (req, res) => {
  const { firstname, lastname, email, password, role,solde } = req.body;
  let emptyFields = [];

  if (!firstname) {
    emptyFields.push('firstname');
  }
  if (!lastname) {
    emptyFields.push('lastname');
  }
  if (!email) {
    emptyFields.push('email');
  }
  if (!password) {
    emptyFields.push('password');
  }
  if (!role) {
    emptyFields.push('role');
  }
  if (!solde) {
    emptyFields.push('solde');
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Veuillez remplir tous les champs.', emptyFields });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      const errorMessage = `L'adresse e-mail ${email} est déjà utilisée.`;
      return res.status(400).json({ error: errorMessage });
    }
    const user = await User.create({ firstname, lastname, email, password, role,solde });
    res.status(200).json(user);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      const errorMessage = `L'adresse e-mail ${email} est déjà utilisée.`;
      return res.status(400).json({ error: errorMessage });
    }
    res.status(400).json({ error: error.message });
  }
};

module.exports = {updateUserByemail, updateProfil,getUserByRole,loginUser, createUser,signupUser ,deleteUser,updateUser, getUsers , getUsersByEmail,getUserById}