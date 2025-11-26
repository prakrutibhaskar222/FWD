import Worker from "../models/Worker.js";

/* CREATE WORKER */
export const createWorker = async (req, res) => {
  try {
    const worker = await Worker.create(req.body);
    res.json({ success: true, data: worker });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};

/* GET ALL WORKERS */
export const getWorkers = async (req, res) => {
  try {
    const workers = await Worker.find().sort({ createdAt: -1 });
    res.json({ success: true, data: workers });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};

/* GET ONE WORKER */
export const getWorker = async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id);
    res.json({ success: true, data: worker });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};

/* UPDATE WORKER */
export const updateWorker = async (req, res) => {
  try {
    const updated = await Worker.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ success: true, data: updated });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};

/* DELETE WORKER */
export const deleteWorker = async (req, res) => {
  try {
    await Worker.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Worker deleted" });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};
