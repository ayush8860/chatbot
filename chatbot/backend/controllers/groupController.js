const Group = require('../models/Group');
const User = require('../models/User');

const createGroup = async (req, res) => {
  try {
    const { name, description, memberEmails } = req.body;
    
    // Find users by email
    const members = await User.find({ email: { $in: memberEmails } });
    const memberIds = members.map(member => member._id);
    
    // Add creator to members if not already included
    if (!memberIds.includes(req.userId)) {
      memberIds.push(req.userId);
    }

    const group = new Group({
      name,
      description,
      creator: req.userId,
      members: memberIds
    });

    await group.save();

    res.status(201).json({
      message: 'Group created successfully',
      group: await group.populate('members', 'username email')
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getGroups = async (req, res) => {
  try {
    const groups = await Group.find({ members: req.userId })
      .populate('members', 'username email')
      .populate('creator', 'username email');
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addMembers = async (req, res) => {
  try {
    const { groupId, memberEmails } = req.body;
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    if (group.creator.toString() !== req.userId) {
      return res.status(403).json({ message: 'Only group creator can add members' });
    }

    const newMembers = await User.find({ email: { $in: memberEmails } });
    const newMemberIds = newMembers.map(member => member._id);

    group.members = [...new Set([...group.members, ...newMemberIds])];
    await group.save();

    res.json({
      message: 'Members added successfully',
      group: await group.populate('members', 'username email')
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const leaveGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    // Check if user is in the group
    if (!group.members.includes(req.userId)) {
      return res.status(403).json({ message: 'You are not a member of this group' });
    }

    // Cannot leave if you're the creator and there are other members
    if (group.creator.toString() === req.userId && group.members.length > 1) {
      return res.status(403).json({ 
        message: 'Creator cannot leave group while other members exist. Transfer ownership first.' 
      });
    }

    // Remove user from members
    group.members = group.members.filter(
      memberId => memberId.toString() !== req.userId
    );

    // If no members left, delete the group
    if (group.members.length === 0) {
      await Group.findByIdAndDelete(groupId);
      return res.json({ message: 'Group deleted as last member left' });
    }

    // If creator is leaving, transfer ownership to first remaining member
    if (group.creator.toString() === req.userId) {
      group.creator = group.members[0];
    }

    await group.save();
    res.json({ message: 'Successfully left the group' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createGroup,
  getGroups,
  addMembers,
  leaveGroup
}; 