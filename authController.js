const User = require('./models/User.js');
const Role = require('./models/Role.js');
const bcrypt = require('bcryptjs');
const { use } = require('express/lib/application');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { secret } = require('./config.js');

const generateAcessToken = (id, roles) => {
    const payload = {
        id, 
        roles
    }

    return jwt.sign(payload, secret, { expiresIn: '24h' });
}

class authController {
    async registration(req, res){
        try {
            const errors = validationResult(req);

            if(!errors.isEmpty()){
                return res.status(400).json({ message: 'Ошибка при регистрации' })
            }

            const { username, password } = req.body;

            const candidate = await User.findOne({username});

            if(candidate) {
                return res.status(400).json({message: 'Пользватель с таким именем уже существует'});
            }

            const hashPassword = bcrypt.hashSync(password, 7);

            const userRole = new Role({value: 'USER'});

            const user = new User({username, password: hashPassword, roles: userRole.value});

            await user.save();
            
            res.json({maessage: 'Пользователь успешно зарегистрирован'})

        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Registartion error'})
        }
    }

    async login(req, res){
        try {
            const { username, password } = req.body;

            const user = await User.findOne({ username });

            if(!user){
                return res.status(400).json({ message: `Пользователь ${ username } не найден` });
            }

            const validPassword = bcrypt.compareSync(password, user.password);

            if(!validPassword){
                return res.status(400).json({ message: 'Неправильный пароль' });
            }

            const token = generateAcessToken(user._id, user.roles);
            return res.json({token});

        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Login error'})
        }
    }

    async getUsers(req, res){
        try {
            const users = await User.find();
            res.json(users)
        } catch (e) {
            console.log(e);
        }
    }

    async getUser(req, res){
        try {
            const { username } = req.body;
            const user = await User.findOne({username});
            res.json(user)
        } catch (e) {
            console.log(e);
        }
    }

    async delete(req, res){
        try {
            
        } catch (e) {
            console.log('Error');
        }
    }
}

module.exports = new authController();