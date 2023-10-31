const Job = require('../models/Job');

exports.createJob = async (req, res) => {
  try {
    req.body.created_at = new Date();

    const createdJob = await Job.create(req.body);
    return res.status(201).json({ job: createdJob });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteJobById = async (req, res) => {
  const jobId = req.params.jobId;

  try {
    const job = await Job.findByPk(jobId);

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Realize a exclusão do trabalho pelo ID
    await job.destroy();

    return res.status(204).send(); // Resposta de sucesso sem conteúdo
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.updateJob = async (req, res) => {
  const jobId = req.params.jobId;
  const jobData = req.body; // Os novos dados do job a serem atualizados

  try {
    const [numUpdated, updatedJobs] = await Job.update(jobData, {
      where: { id: jobId },
      returning: true, // Retorna os registros atualizados
    });

    if (numUpdated === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Redirecionar para a página de dashboard após a atualização bem-sucedida
    res.redirect('/dashboard.html');
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

exports.getAllJobsByUserId = async (req, res) => {
  const userId = req.cookies.userId;
  try {
    if (!userId) {
      return res.status(400).json({ error: 'User ID not found in cookies' });
    }

    const jobs = await Job.findAll({ where: { id_user: userId }, order: [['created_at', 'DESC']] });

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

