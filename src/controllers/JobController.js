const Job = require('../models/Job');

exports.createJob = async (req, res) => {
  try {
    const createdJob = await Job.create(req.body);
    return res.status(201).json({ job: createdJob });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.getJobById = async (req, res) => {
  const jobId = req.params.jobId;

  try {
    const job = await Job.findByPk(jobId);

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    return res.status(200).json({ job });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll();

    if (!jobs.length) {
      return res.status(404).json({ error: 'No jobs found' });
    }

    return res.status(200).json({ jobs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};



exports.getAllMostRecentJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll({
      order: [['created_at', 'DESC']], 
    });

    if (!jobs.length) {
      return res.status(404).json({ error: 'No jobs found' });
    }

    return res.status(200).json({ jobs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.getHighestValue = async (req, res) => {
  try {
    const jobs = await Job.findAll({
      order: [['budget', 'DESC']], 
    });

    if (!jobs.length) {
      return res.status(404).json({ error: 'No jobs found' });
    }

    return res.status(200).json({ jobs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.getLowestValue = async (req, res) => {
  try {
    const jobs = await Job.findAll({
      order: [['budget', 'ASC']], 
    });

    if (!jobs.length) {
      return res.status(404).json({ error: 'No jobs found' });
    }

    return res.status(200).json({ jobs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.getOlderJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll({
      order: [['created_at', 'ASC']], 
    });

    if (!jobs.length) {
      return res.status(404).json({ error: 'No jobs found' });
    }

    return res.status(200).json({ jobs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};


exports.getJobCount = async (req, res) => {
  try {
    const count = await Job.count();
    return res.status(200).json({ count });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.searchJobs = async (req, res) => {
  // Implemente a lógica para pesquisar trabalhos com base em filtros
};
