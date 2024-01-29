const nodemailer = require('nodemailer')
const ejs= require('ejs')
const {convert} = require('html-to-text')
const Email = class Email{
    constructor(user,url){
        this.to = user.email;
        this.firstname=user.name.split(' ')[0];
        this.url = url;
        this.from = process.env.senderEmail
    };
    newTransport(){
        if(process.env.NODE_ENV==="production"){
            return 1
        }
        return nodemailer.createTransport({
            host:process.env.Emailhost,
            post:process.env.Emailport,
            auth:{
                user:process.env.emailuser,
                pass:process.env.emailpass
            }
        })
    };
    async send(templete,subject){
        const html = await ejs.renderFile(`${__dirname}/../templete/${templete}.ejs`,{
            firstname:this.firstname,
            url:this.url,
            subject
        })
        const txt = convert(html,{
            wordwrap:180
        })
        const mailOptions={
            from:this.from,
            to:this.to,
            subject,
            html,
            text:this.url
        }
        await this.newTransport().sendMail(mailOptions)
    };
   async sendwelcome(){
    await this.send('welcome','welcome to the TASKMATE family')
   };
    async sendPasswordReset(){
        await this.send('email','your passwordword reset Token(valid for 60 minutes)')
    }
}

module.exports = Email