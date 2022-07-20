let firstName=document.getElementById("firstName");
let lastName=document.getElementById("lastName");
let exprDiv=document.getElementById("exprDiv");
let exprAdd=document.getElementById("exprAdd");
let eduDiv=document.getElementById("eduDiv");
let eduAdd=document.getElementById("eduAdd");
let skillDiv=document.getElementById("skillDiv");
let skillAdd=document.getElementById("skillAdd");
let submitBtn=document.getElementById("submit");


exprAdd.addEventListener('click',addExperience);
eduAdd.addEventListener('click',addEducation);
skillAdd.addEventListener('click',addSkill);


function addExperience(){
  let exprTextDiv=document.createElement('div');
  exprTextDiv.classList="row";
  exprTextDiv.innerHTML="<input type=\"text\" class=\"textBox\" name=\"expr\">"
  exprDiv.appendChild(exprTextDiv);
}

function addEducation(){
  let eduTextDiv=document.createElement('div');
  eduTextDiv.classList="row";
  eduTextDiv.innerHTML="<input type=\"text\" class=\"textBox\" name=\"edu\">"
  eduDiv.appendChild(eduTextDiv);
}

function addSkill(){
  let skillTextDiv=document.createElement('div');
  skillTextDiv.classList="row";
  skillTextDiv.innerHTML="<input type=\"text\" class=\"textBox\" name=\"skill\">"
  skillDiv.appendChild(skillTextDiv);
}








// submitBtn.addEventListener('click',()=>{
//     $.get({
//         url: "http://localhost:5500/formView",
//         data: {fName: firstName.value, lName:lastName.value},
//         success: function (data) {
//           console.log("Success");
//         },
//         dataType: "json"
//     });
// });



