import { ICity } from 'backend/models/interfaces';
import { Role } from 'backend/models/types';
import nodemailer from 'nodemailer'
import {renderToString} from 'react-dom/server'
import NewUserPassword from 'frontend/components/Emails/NewUserPassword';
import NewPassword from 'frontend/components/Emails/NewPassword';
class Transporter /* extends nodemailer.Transporter */{
    private static instance: Transporter
    
    constructor(){
        return nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
              user: process.env.EMAIL_ACCOUNT, // generated ethereal user
              pass: process.env.EMAIL_PASSWORD, // generated ethereal password
            },
        });
    }

    static getInstance(){
        if(!Transporter.instance){
            Transporter.instance = new Transporter()
            
        } 
        return Transporter.instance
    }
}

export interface NewUser{
    firstName:string, 
    lastName:string, 
    fullName:string,
    city:ICity, 
    roles:Role[], 
    email:string, 
    password:string
}

const Mailer = {
    sendNewUserPassword: async(user:NewUser) =>{
        
        const info = await (Transporter.getInstance() as nodemailer.Transporter).sendMail({
            from: `"Administracion Tecnica Random" <${process.env.EMAIL_ACCOUNT}>`, // sender address
            to:user.email, // list of receivers
            subject: "Creacion de usuario en el Sistema de Administracion Tecnica", // Subject line
            html:renderToString(NewUserPassword({user}))
        });
        return info
    },
    sendNewPassword: async(user:NewUser)=>{
        const info = await (Transporter.getInstance() as nodemailer.Transporter).sendMail({
            from: `"Administracion Tecnica Random" <${process.env.EMAIL_ACCOUNT}>`, // sender address
            to:user.email, // list of receivers
            subject: "Creacion de nueva contraseña para tu usuario en el Sistema de Administracion Tecnica", // Subject line
            //text: "Hello world?", // plain text body
            html:renderToString(NewPassword({user}))
            
            
            
        });
        
        return info
    }
}


export default Mailer

