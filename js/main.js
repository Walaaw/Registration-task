let userNAme=document.getElementById("userInputName");
let userEmail=document.getElementById("userInputEmail");
let userPassword=document.getElementById("userInputPassword");
let userConfirm= document.getElementById('userInputConfirmPasord')
let AllUsersData=[];
let username=localStorage.getItem("username")
if(localStorage.getItem("allusersdata")!=null){
    AllUsersData=JSON.parse( localStorage.getItem("allusersdata"));
}
// ==================sign up=======================================
async function signUp(){
    validuserinputs();
if( validuserinputs ){
     let  userData;
     userData={
       username: userNAme.value,
        email: userEmail.value,
        password: userPassword.value,
        password_confirmation: userConfirm.value,
    }
    AllUsersData.push(userData);
    localStorage.setItem("allusersdata",JSON.stringify(AllUsersData));
    postData('https://goldblv.com/api/hiring/tasks/register',userData)  
}

}
const validUserName=()=>{
    let userNameinput=userNAme.value;
    console.log(userNameinput);
    let userNamealert=document.getElementById("usernameAlert")
    let userNameregex=/^[a-z][0-9a-z]*$/i;
    if( userNameregex.test(userNameinput)==true&& userNameinput!=""){
        userNAme.classList.add("is-valid");
        userNAme.classList.remove("is-invalid");
        userNamealert.classList.replace("d-block","d-none");
        return true;
    }
    else{
        userNAme.classList.add("is-invalid");
        userNAme.classList.remove("is-valid");
        userNamealert.classList.replace("d-none","d-block");
        return false;
    }
}
const validEmail=()=>{
    var emailAlert=document.getElementById("emailAlert");
    var regEmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
    if(regEmail.test(userEmail.value) && userEmail.value!=""){
        userEmail.classList.add("is-valid");
        userEmail.classList.remove("is-invalid");
        emailAlert.classList.replace("d-block","d-none");
        return true;
    }
    else{
       userEmail.classList.add("is-invalid");
       userEmail.classList.remove("is-valid");
       emailAlert.classList.replace("d-none","d-block");
       return false;
    }
}
const validPassword=()=>{
    letpasswordlAlert=document.getElementById("passwordlAlert");
    let passwordRegex = /^.{8,15}$/;
    if(passwordRegex.test(userPassword.value) && userPassword.value!=""){
      userPassword.classList.add("is-valid");
      userPassword.classList.remove("is-invalid");
      passwordlAlert.classList.replace("d-block","d-none");
        return true;
    }
    else{
     userPassword.classList.add("is-invalid");
     userPassword.classList.remove("is-valid");
    passwordlAlert.classList.replace("d-none","d-block");
       return false;
    }
}
const validConfirmPassword=()=>{
    if(userPassword.value==userConfirm.value){
       userConfirm.classList.add("is-valid");
       userConfirm.classList.remove("is-invalid");
       passwordConfirmlAlert.classList.replace("d-block","d-none");
          return true;
      }
      else{
      userConfirm.classList.add("is-invalid");
      userConfirm.classList.remove("is-valid");
      passwordConfirmlAlert.classList.replace("d-none","d-block");
         return false;
      }
}
const  validuserinputs=()=>{
    validPassword();
    validEmail();
    validUserName();
    validConfirmPassword()
    if( validPassword() && validEmail () && validUserName()&& validConfirmPassword()){
        return true;
    }
    else{
        return false;
    }
}
async function postData(url , data) {
    const response = await fetch(url, {
      method: 'POST', 
      mode: 'cors',
      cache: 'no-cache', 
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    });
    let final = await response.json()
    console.log(final);
    if(final.errors){
        if(final.errors.username){
            let userNamealert=document.getElementById("usernameAlert");
            userNamealert.innerHTML=final.errors.username;
        }
        if(final.errors.email){
            let emailAlert=document.getElementById("emailAlert");
            emailAlert.innerHTML=final.errors.email;
        }
        if(final.errors.password){
            let passwordlAlert=document.getElementById("passwordlAlert");
            passwordlAlert.innerHTML=final.errors.password;
        }
        return false
    }
    else{
        localStorage.setItem("email",final.email);
        getEmail();
        location.href="login.html";
       return true
    }
  } 
const getEmail=() =>{
let userEmail=localStorage.getItem("email");
 document.getElementById('email').innerHTML=userEmail;
}


  