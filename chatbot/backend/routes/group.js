const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const auth = require('../middleware/auth.middleware');

router.post('/', auth, groupController.createGroup);
router.get('/', auth, groupController.getGroups);
router.post('/members', auth, groupController.addMembers);
router.post('/:groupId/leave', auth, groupController.leaveGroup);

module.exports = router; 