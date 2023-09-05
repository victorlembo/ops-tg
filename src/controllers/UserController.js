const User = require('../models/User');
const bcrypt = require('bcrypt'); 

const path = require('path');

exports.createUser = async (req, res) => {
  try {
    // Gere um sal aleatório para usar na criptografia
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Use o sal gerado e a senha do usuário para criar um hash seguro
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    let profileImagePath = null;

    // Verifique se uma imagem de perfil foi enviada
    if (req.files && req.files.profile_image) {
      const profileImage = req.files.profile_image;

      // Defina o caminho onde a imagem de perfil será armazenada
      const profileImageName = `${Date.now()}-${profileImage.name}`;
      const profileImageUploadPath = path.join(__dirname, 'uploads', profileImageName);

      // Faça o upload da imagem de perfil para o servidor
      await profileImage.mv(profileImageUploadPath);

      // Defina o caminho da imagem de perfil no banco de dados
      profileImagePath = `/uploads/${profileImageName}`;
    }

    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      profile_image: profileImagePath,
    });

    return res.redirect('/');
    
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
