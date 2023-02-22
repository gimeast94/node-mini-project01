// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  document.querySelector('#ValidationInputWrapper').style.display = 'flex'
  const phone1 = document.getElementById('PhoneNumber01').value
  const phone2 = document.getElementById('PhoneNumber02').value
  const phone3 = document.getElementById('PhoneNumber03').value
  const phone = phone1 + phone2 + phone3

  axios.post('http://127.0.0.1:3000/tokens/phone', {phone}).then((res) => {
    console.log(res.data)
    if(res.data.status) {
      console.log('인증 번호 전송')
    }
  }).catch((err) => {
    console.log(err)
  }).finally(() => {

  })
  
}

// 핸드폰 인증 완료 API 요청
const submitToken = async () => {
  const phone1 = document.getElementById('PhoneNumber01').value
  const phone2 = document.getElementById('PhoneNumber02').value
  const phone3 = document.getElementById('PhoneNumber03').value
  const phone = phone1 + phone2 + phone3
  const token = document.getElementById('TokenInput').value
  axios.patch('http://127.0.0.1:3000/tokens/phone', {phone, token}).then((res) => {
    console.log(res.data)
    if(res.data) {
      console.log('핸드폰 인증 완료')
    }
  }).catch((err) => {
    console.log(err)
  }).finally(() => {

  })
}

// 회원 가입 API 요청
const submitSignup = async () => {
  const name = document.getElementById('SignupName').value
  const prefer = document.getElementById('SignupPrefer').value
  const email = document.getElementById('SignupEmail').value
  const pwd = document.getElementById('SignupPwd').value
  
  const personal1 = document.getElementById('SignupPersonal1').value
  const personal2 = document.getElementById('SignupPersonal2').value
  const personal = personal1 + "-" + personal2

  const phone1 = document.getElementById('PhoneNumber01').value
  const phone2 = document.getElementById('PhoneNumber02').value
  const phone3 = document.getElementById('PhoneNumber03').value
  const phone = phone1 + phone2 + phone3

  axios.post('http://127.0.0.1:3000/user', {name, prefer, email, pwd, personal, phone}).then((res) => {
    console.log(res.data)
    if(res.data) {
      console.log('회원 가입 완료')
    }
  }).catch((err) => {
    console.log(err)
  }).finally(() => {

  })
  
}
