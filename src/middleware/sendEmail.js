const UserJob = require('../models/UserJob');
const Job = require('../models/Job');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const express = require('express');
const router = express.Router();
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const env = require('dotenv').config();

router.use(express.json());
router.use(cors());
router.use(express.urlencoded({ extended: true }));
router.use(cookieParser());
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

router.use(express.static('mails'));

// const oauth2Client = new OAuth2(
//   "340627747022-d29ua2798cipk1geav2n46koubduccku.apps.googleusercontent.com",
//   "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",
//   "https://developers.google.com/oauthplayground" // Redirect URL
// );

const oauth2Client = new OAuth2(
    process.env.OAUTH_CLIENTID,
    process.env.OAUTH_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
});
const accessToken = oauth2Client.getAccessToken()

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: process.env.MAIL_USERNAME,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken
    }
});

exports.sendMail = async (req, res) => {
    const { jobId } = req.body;
    const loggedUserId = req.cookies.userId;

    const loggedUser = await User.findByPk(loggedUserId);

    if (!req.files || !req.files.file) {
        return res.status(400).send('Arquivo não encontrado');
    }
    console.log("req.files:", req.files);
    const fileName = req.files.file;

    // Diretório de destino para salvar o arquivo
    const uploadPath = 'src/mails/' + fileName.name;

    // Salvar o arquivo no diretório desejado
    fileName.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).send('Erro ao salvar o arquivo');
        }
    });

    try {
        const job = await Job.findByPk(jobId);
        if (!job) {
            return res.status(400).send('Vaga de emprego não encontrada');
        }

        const id_user = job.id_user;

        const user = await User.findByPk(id_user);
        if (!user) {
            return res.status(400).send('Destinatário não encontrado');
        }

        const recipientEmail = user.email;
        console.log(recipientEmail)
        const message = `
  <!DOCTYPE html>
  <html>
  <head>
      <title>Aplicação de Emprego</title>
  </head>
  <body>
      <p>Caro ${user.name},</p>
      
      <p>Me chamo ${loggedUser.name} e estou interessado na vaga ${job.title} que você publicou na plataforma Oportunidade Sorocaba.</p>
  
      <p>Anexei meu currículo para mais informações de contato, sobre a minhas experiências e qualificações.</p>
  
      <p>Aguardo ansiosamente a oportunidade de discutir mais sobre como posso contribuir para sua empresa.</p>
  
      <p>Atenciosamente,</p>

      <p> ${loggedUser.name}</p>
  </body>
  </html>
  `;


        const mailOptions = {
            from: process.env.MAIL,
            to: recipientEmail,
            subject: `Oportunidade Sorocaba - ${job.title}`,
            generateTextFromHTML: true,
            html: message,
            attachments: [
                {
                    filename: fileName.name,
                    path: `src/mails/${fileName.name}`,
                },
            ],
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                res.status(500).send('Falha no envio do e-mail.');
            } else {
                console.log('E-mail enviado: ' + info.response);
                UserJob.create({
                    id_user: loggedUserId,
                    id_job: jobId,
                });

                const successMessage = 'E-mail enviado com sucesso.';
                res.send(`<script>alert("${successMessage}"); window.location.href = '/dashboard_candidate.html';</script>`);
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar dados ou enviar e-mail');
    }
};
