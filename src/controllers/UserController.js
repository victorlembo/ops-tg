const User = require('../models/User');
const path = require('path');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


dotenv.config();


exports.logout = (req, res) => {

  res.clearCookie('token');
  res.clearCookie('isUserLoggedIn');
  res.clearCookie('userId');

  res.redirect('/index.html'); 
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verifique se o usuário existe no banco de dados
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }


    if (!password) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Crie um token de autenticação
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Adicione o token como cookie (opcional, se preferir usar cookies)
    res.cookie('token', token, { httpOnly: true }); // Isso é opcional, você pode ajustar conforme necessário
    res.cookie('isUserLoggedIn', 'true');
    res.cookie('userId', user.id);


    // Redirecione o usuário para a página "dashboard.html"
    res.redirect('/dashboard.html');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro no servidor' });
  }
};


exports.createUser = async (req, res) => {
  try {
    let profileImagePath = null;

    console.log(req.files);
    // Check if a profile image was uploaded
    if (req.files && req.files.profile_image) {
      const profileImage = req.files.profile_image;

      // Set the path where the profile image will be stored inside the "public/uploads" folder
      const profileImageName = `${profileImage.name}`;

      const profileImageUploadPath = path.join(__dirname, '..', '..', 'public', 'uploads', profileImageName);

      // Upload the profile image to the server
      await profileImage.mv(profileImageUploadPath);

      // Set the profile image path
      profileImagePath = `${profileImageName}`;
    }


    // Insert the new user into the database using Sequelize
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      profile_image: profileImagePath,
    });

    res.redirect('/login.html');
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });

    if (!users.length) {
      return res.status(404).json({ error: 'No users found' });
    }

    return res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findByPk(userId, { attributes: { exclude: ['password'] } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Atualize apenas os campos fornecidos no corpo da solicitação
    await user.update(req.body);

    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.destroy();

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};
