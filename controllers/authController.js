const jwt = require('jsonwebtoken')
const { User } = require('../models')

exports.Register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validasi data
    if (!username || !password) {
      res.status(400).json({ error: 'Semua field harus diisi' });
      return;
    }

    if (username.length < 5) {
      res.status(400).json({ error: 'Nama pengguna harus memiliki minimal 5 karakter' });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ error: 'Kata sandi harus memiliki minimal 6 karakter' });
      return;
    }

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      res.status(400).json({ error: 'Nama pengguna sudah digunakan' });
      return;
    }

    // Simpan data pengguna ke dalam database jika data valid
    await User.create(req.body);

    res.status(201).json({ message: 'Pendaftaran berhasil' });
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
};

exports.Login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validasi data
    if (!username || !password) {
      res.status(400).json({ error: 'Username dan password harus diisi' });
      return;
    }

    const user = await User.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      res.status(401).json({ error: 'Username salah' });
      return;
    }

    if (user.password !== password) {
      res.status(401).json({ error: 'Password salah' });
      return;
    }

    // Login sukses
    const payload = { uid: user.id };
    const secret = "secret";

    // Tambahkan waktu kedaluwarsa dalam detik (misalnya, 1 jam = 3600 detik)
    const expiresIn = 3600;

    const token = jwt.sign(payload, secret, { expiresIn });
    res.json({ accesstoken: token, uid: user.id });
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
};
