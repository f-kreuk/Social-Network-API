const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

// route to get all users and post new user /api/users
router.route('/')
.get(getUsers)
.post(createUser);

// route to get, update, and delete single user /api/users/:userId
router.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

// route to post aand delete user's friend list /api/users/:userId/friends/:friendsId
router.route('/:userId/friends/:friendsId')
.post(addFriend)
.delete(deleteFriend);

module.exports = router;