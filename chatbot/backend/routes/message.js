const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const Group = require('../models/Group');
const auth = require('../middleware/auth.middleware');

// Get messages for a specific group
router.get('/:groupId', auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    if (!group.members.includes(req.userId)) {
      return res.status(403).json({ message: 'Not a member of this group' });
    }

    const messages = await Message.find({ group: req.params.groupId })
      .populate('sender', 'username')
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Send message to a group
router.post('/:groupId', auth, async (req, res) => {
  try {
    const { content } = req.body;
    const group = await Group.findById(req.params.groupId);
    
    if (!group.members.includes(req.userId)) {
      return res.status(403).json({ message: 'Not a member of this group' });
    }

    const message = new Message({
      sender: req.userId,
      content,
      group: req.params.groupId
    });
    
    await message.save();
    const populatedMessage = await message.populate('sender', 'username');
    
    res.status(201).json(populatedMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
