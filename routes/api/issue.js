const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Issue = require('../../models/Issue');
const mongoose = require('mongoose');

//@route   POST api/issue
//@desc    Create an issue
//@access  Public

router.post(
  '/',
  [
    check('name', 'Project Name is required').not().isEmpty(),
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, title, description, priority } = req.body;

    try {
      const issue = new Issue({
        name,
        title,
        description,
        priority,
      });
      await issue.save();
      return res.json(issue);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

//@route   Get api/issue
//@desc    Get list of all issues
//@access  Public

router.get('/', async (req, res) => {
  try {
    const issues = await Issue.find({});
    return res.json(issues);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

//@route   Get api/issue/:id
//@desc    Find an issue by Id
//@access  Public

router.get('/:id', async (req, res) => {
  try {
    const valid = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!valid) return res.status(400).json({ msg: 'Issue not found' });

    const issue = await Issue.findById(req.params.id);
    if (!issue) {
      return res.status(404).json({ msg: 'Issue not found' });
    }
    return res.json(issue);
  } catch (error) {
    if (err.kind === 'ObjectId')
      return res.status(400).json({ msg: 'Issue not found' });
    return res.status(500).send('Server Error');
  }
});

//@route   Put api/issue/:id
//@desc    Update an issue
//@access  Public

router.put('/:id', async (req, res) => {
  const reqKeys = Object.keys(req.body);
  const issueKeys = ['name', 'description', 'title', 'priority'];
  const isValidOperation = reqKeys.every((key) => issueKeys.includes(key));
  if (!isValidOperation) {
    return res.status(400).send('Invalid update keys');
  }
  try {
    const valid = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!valid) return res.status(400).json({ msg: 'Issue not found' });

    //Validate the issue
    let issue = Issue.findById(req.params.id);
    if (!issue) {
      return res.status(404).json({ msg: 'Issue not found' });
    }
    //Build issueFields
    const issueFields = {};
    issueFields.lastUpdated = new Date();

    //Add issues form req.body
    issueKeys.forEach((field) => {
      if (req.body[field]) issueFields[field] = req.body[field];
    });

    issue = await Issue.findOneAndUpdate(
      { _id: req.params.id },
      { $set: issueFields },
      { new: true }
    );
    return res.json(issue);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId')
      return res.status(400).json({ msg: 'Issue not found' });
    return res.status(500).send('Server Error');
  }
});

//@route   DELETE api/issue/:id
//@desc    DELETE an issue
//@access  Public

router.delete('/:id', async (req, res) => {
  try {
    const valid = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!valid) return res.status(400).json({ msg: 'Issue not found' });

    const issue = await Issue.findById(req.params.id);
    if (!issue) {
      return res.status(404).json({ msg: 'Issue not found' });
    }

    await issue.remove();
    return res.json({ msg: 'Issue Removed!' });
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId')
      return res.status(400).json({ msg: 'Issue not found' });
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
