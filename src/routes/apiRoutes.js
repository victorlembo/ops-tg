const express = require('express');
const router = express.Router();
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');

router.use(cors());
router.use(express.urlencoded({ extended: true }));
router.use(fileUpload());
router.use(cookieParser());

// Import necessary controller functions
const UserController = require('../controllers/UserController');
const JobController = require('../controllers/JobController');
const UserJobController = require('../controllers/UserJobController');


router.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// User Routes
router.post('/register', UserController.createUser);
router.get('/user/:userId', UserController.getUserById);
router.get('/users', UserController.getAllUsers);

// Job routes
router.post('/job', JobController.createJob);
router.get('/job/:jobId', JobController.getJobById);
router.post('/job/update/:jobId', JobController.updateJob);
router.get('/jobs', JobController.getAllJobs);
router.get('/jobs/byUser/:userId', JobController.getAllJobsByUserId);
router.delete('/jobs/delete/:jobId', JobController.deleteJobById);
router.get('/jobs/recent', JobController.getAllMostRecentJobs);
router.get('/jobs/older', JobController.getOlderJobs);
router.get('/jobs/highestValue', JobController.getHighestValue);
router.get('/jobs/lowestValue', JobController.getLowestValue);

// UserJob routes
router.get('/userjobs/recent/:userId', UserJobController.getAllMostRecentJobsById);


// Login route
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);

module.exports = router;
