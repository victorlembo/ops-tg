const express = require('express');
const router = express.Router();
const cors = require('cors'); 
const fileUpload = require('express-fileupload');

router.use(cors());
router.use(express.urlencoded({ extended: true }));
router.use(fileUpload());

// Import necessary controller functions
const UserController = require('../controllers/UserController');
const JobController = require('../controllers/JobController');
const CategoryController = require('../controllers/CategoryController');

// User Routes
router.post('/register', UserController.createUser);
router.get('/user/:userId', UserController.getUserById);
router.get('/users', UserController.getAllUsers);

// Job routes
router.post('/job', JobController.createJob);
router.get('/job/:jobId', JobController.getJobById);
router.get('/jobs', JobController.getAllJobs);
router.get('/jobs/recent', JobController.getAllMostRecentJobs);
router.get('/jobs/older', JobController.getOlderJobs);
router.get('/jobs/highestValue', JobController.getHighestValue);
router.get('/jobs/lowestValue', JobController.getLowestValue);

// Category routes
router.get('/category/:categoryId', CategoryController.getCategoryById);
router.get('/categories', CategoryController.getAllCategories);



module.exports = router;
