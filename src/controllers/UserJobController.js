const UserJob = require('../models/UserJob');
const Job = require('../models/Job');

exports.getAllMostRecentJobsById = async (req, res) => {
  const userId = req.cookies.userId;
  try {
    // 1. Execute a primeira consulta para obter a lista de id_job
    const userJobs = await UserJob.findAll({
      where: {
        id_user: userId,
      },
      attributes: ['id_job'],
    });

    if (!userJobs.length) {
      return res.status(404).json({ error: 'No jobs found' });
    }

    // 2. Execute a segunda consulta para buscar detalhes das vagas de emprego com base em jobIds
    const jobIds = userJobs.map((userJob) => userJob.id_job);
    const jobs = await Job.findAll({
      where: {
        id: jobIds,
      },
    });

    return res.status(200).json({ jobs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

