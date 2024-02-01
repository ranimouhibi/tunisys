const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['EMPLOYEE','ADMIN']
    },
    solde:
    { type: Number
    }
   
});

userSchema.statics.signup = async function (firstname, lastname, email, password, role,solde) {
    if (!email || !password || !firstname || !lastname || !role || !solde) {
        throw Error('All fields must be filled');
    }
    if (!validator.isEmail(email)) {
        throw Error('Adresse email est invalide');
    }
    const exists = await this.findOne({ email });
    if (exists) {
        throw Error('Adresse email est déja utilisée');
    }

    const user = await this.create({ firstname, lastname, email, password, role,solde });
    return user;
}

userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('Veuillez remplir tous les champs.');
    }

    const user = await this.findOne({ email });

    if (!user) {
        throw Error('Adresse email est incorrecte');
    }

    if (user.password !== password) {
        throw Error('Mot de passe incorrecte');
    }

    return user;
}

userSchema.statics.findById = async function (id) {
    try {
        const user = await this.findOne({ _id: id });
        if (!user) {
            throw new Error('Utilisateur non trouvé');
        }
        return user;
    } catch (error) {
        throw error;
    }
};

module.exports = mongoose.model('User', userSchema);