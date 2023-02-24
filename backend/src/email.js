import {getToday} from "./utils.js"
import nodemailer from "nodemailer"
import "dotenv/config"

/**
 * 이메일 정규표현식 체크 함수
 * @param {string} email 
 * @returns boolean
 */
function checkValidationEmail(email) {
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    if(regex.test(email)) {
        console.log("정상적인 이메일 입니다.")
        return true;
    }else {
        console.log("이메일을 확인하세요")
        return false;
    }
}

/**
 * 
 * @param {*} object 
 * @returns 가입 축하 템플릿
 */
function getWelcomeTemplate({email, name, prefer, phone}) {

    const result = `
    <html>
        <body style="width:500px;">
            <div style="display: flex; flex-direction: column; align-items: center;">
                <h1 style="color: red">${name}님 가입을 환영합니다!!!</h1>
                <hr />
                <div>이메일: ${email}</div>
                <div>좋아하는 사이트: ${prefer}</div>
                <div>핸드폰번호: ${phone}</div>
                <div>가입일: ${getToday()}</div>
            </div>
        </body>
    </html>
    `;

    console.log("템플릿 생성...")
    return result;
}

/**
 * nodemailer를 이용하여 메일을 전송하는 함수
 * @param {string} email 
 * @param {string} template 
 */
async function sendWelcomeTemplateToEmail(email, template) {
    const EMAIL_USER = process.env.EMAIL_USER
    console.log(EMAIL_USER)
    const EMAIL_PASS = process.env.EMAIL_PASS
    const EMAIL_SENDER = process.env.EMAIL_SENDER
    
    // console.log("가입환영 템플릿 전송...")
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS
        }
      })
    
      let info = await transporter.sendMail({
        from: EMAIL_SENDER, // sender address
        to: email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: template, // html body
      })

      console.log("Message sent: %s", info);

}

export {checkValidationEmail, getWelcomeTemplate, sendWelcomeTemplateToEmail}