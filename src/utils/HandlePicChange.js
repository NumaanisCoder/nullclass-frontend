const { default: axios } = require("axios");

module.exports.HandlePicChange = (e) => {
    const file = e.target.file[0];
    console.log(file);
}
module.exports.uploadRegistrationForm = async (formData) => {
    await fetch('http://localhost:5500/api/v1/registration',{method: "POST", body:formData})
    .then(rawResponse=> rawResponse.json().then(data => console.log(data)));
}