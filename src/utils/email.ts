
import * as nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import path from 'path';
import fs from 'fs';

const sendEmail = async(
  to: string,
  subject: string,
  html: string
): Promise<void> => {

  const msg = {
    from: process.env.SMTP_FROM,
    to,
    subject,
    html,
  };
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 456),
    // secure: process.env.SMTP_SECURE,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    }
  })
  try {
    await transporter.sendMail(msg)
    console.log(`Email sent successfully to ${to}`);
  } catch (error) {
    console.error(`Failed to send email to ${to}`);
    throw error;
  }
}

const getTemplate = (templateName: string): string => {
  const templatePath = path.join(
    process.cwd() + '/src/',
    'templates',
    `${templateName}.hbs`
  );
  return fs.readFileSync(templatePath, 'utf8');
}

const emailSender = async(
  to: string,
  token: string,
  name: string,
  templateName: string,
  title: string
): Promise<void> => {
  const template = getTemplate(templateName);
  const compiledTemplate = handlebars.compile(template);
  const html = compiledTemplate({
    name,
    token,
    url: process.env.FRONTEND_URL,
  });

  await sendEmail(to, title, html);
}

export default emailSender