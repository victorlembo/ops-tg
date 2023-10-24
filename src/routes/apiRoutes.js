const express = require('express');
const router = express.Router();
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const UserController = require('../controllers/UserController');
const JobController = require('../controllers/JobController');
const UserJobController = require('../controllers/UserJobController');
const SendEmail = require('../middleware/sendEmail');

router.use(express.json());
router.use(cors());
router.use(express.urlencoded({ extended: true }));
router.use(fileUpload({
  createParentPath: true, // Cria diretórios pais, se não existirem
  useTempFiles: false,     // Não usar arquivos temporários
  safeFileNames: true,     // Evita nomes de arquivos inseguros
  preserveExtension: true, // Mantém a extensão do arquivo original
  limits: {                // Limites do upload (ajuste conforme necessário)
    fileSize: 10 * 1024 * 1024,  // Limite de tamanho (10 MB)
  },
  uploadDir: 'src/mails',   // Diretório de destino para os arquivos
}));

router.use(cookieParser());
router.use(express.static('mails'));

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

// Send Mail
router.post('/send-email', SendEmail.sendMail);

// Login route
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);

module.exports = router;
