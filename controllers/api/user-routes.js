const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// GET /api/users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({});
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET /api/users/1
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (user === null) {
      res.status(404).json({ err: 'No user found with id!' });
    } else {
      res.json(user);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST /api/users
router.post('/', async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// PUT /api/users/1
router.put('/:id', async (req, res) => {
  try {
    const user = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!user[0]) {
      res.status(404).json({ err: 'No user found with id!' });
    } else {
      res.json(user);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE /api/users/1
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.destroy({
          where: {
            id: req.params.id,
          },
        });
        if (user === null) {
          res.status(404).json({ err: 'No user found with id!' });
        } else {
          res.json(user);
        }
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});

module.exports = router;
