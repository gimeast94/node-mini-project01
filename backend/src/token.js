import coolsms from 'coolsms-node-sdk'
import "dotenv/config"

function getToken(count) {
    if(count === undefined) {
        console.log("error!!! 갯수를 제대로 입력하세요");
        return ;
    } else if(count <= 0) {
        console.log("error!!! 1 이상 10 이하만 가능합니다")
        return ;
    }  else if(count > 10) {
        console.log("error!!! 1 이상 10 이하만 가능합니다");
        return ;
    }

    const result = String(Math.floor(Math.random() * 10**count)).padStart(count, "0");
    
    return result;
}

function checkValidationPhone(phone) {
    let regPhone= /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

    if(regPhone.test(phone)) {
        return true;
    } else {
        console.log("Error!!! 핸드폰번호를 제대로 입력해 주세요!!!")
        return false;
    }
}

function sendTokenToSMS(phone, token) {
    // console.log(`[${phone}] 번호로 인증번호 (${token})을 전송함..`);
    
    // 핸드폰번호로 sms보내는 로직..
    const SMS_KEY = process.env.SMS_KEY
    const SMS_SECRET = process.env.SMS_SECRET
    const SMS_SENDER = process.env.SMS_SENDER
    const defaultSms = coolsms.default
    const messageService =new defaultSms(SMS_KEY, SMS_SECRET)

    messageService.sendOne({
        to: phone,
        from: SMS_SENDER,
        text: `[MY PORTFOLIO]\n안녕하세요!\n요청하신 인증번호입니다!\n[${token}]`
    }).then(res => console.log(res))
    .catch(err => console.error(err));

}

export { getToken, checkValidationPhone, sendTokenToSMS }