const Task = require("../model/Task");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({}); //get all the tasks
    res.status(200).json({ tasks });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(200).json({ task });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
//getting a single task
const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.find({ _id: taskID });
    if (task === null) {
      return res
        .status(404)
        .json({ message: `No task with ${taskID} is Found!` });
    } else {
      res.status(201).json({ task });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
//updating a task
const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });

    if (task === null) {
      res.status(404).json({
        message: `No task with the given id : ${taskID} was found!!!`,
      });
    } else {
      res.status(200).json({ updatedTask: task });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

//deleting task
const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });

    if (task === null) {
      return res
        .status(404)
        .json({ mesage: `No task with the given id ${taskID} exists!!` });
    } else {
      return res.status(200).json({ task });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
