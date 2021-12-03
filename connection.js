const submitButton = document.getElementById('submit');
const saveButton = document.getElementById('save');
const clearButton = document.getElementById('clear');
const maleRadioButton = document.getElementById('male-gender');
const femaleRadioButton = document.getElementById('female-gender');
const nameInput = document.getElementById('name-input');
const alertBox = document.getElementById('alert-box');

const resultGender = document.getElementById('result-gender');
const resultProbability = document.getElementById('result-probability');
const savedAnswer = document.getElementById('saved-result');
const saveAnswerDiv = document.getElementById('save-answer');
const guessGenderBaseUrl = 'https://api.genderize.io/?name=';
alertBox.style.visibility='hidden';
function showAllert(){
    alertBox.style.visibility='visible';
    setTimeout(()=>{
        alertBox.style.visibility='hidden';
    },2000)
}


function submitName() {
    const name = nameInput.value;
    fetch(guessGenderBaseUrl + name)
    .then(result => result.json())
    .then(result => {
        const gender = result.gender;
        const probability = result.probability;
        resultGender.innerHTML = gender;
        resultProbability.innerHTML = probability;
        if (!localStorage.getItem(name)) {
            saveAnswerDiv.style.visibility = 'hidden';
        } else {
            savedAnswer.innerHTML = `${name} has saved as ${gender}`;
            saveAnswerDiv.style.visibility = 'visible';
        }
        if (probability===0){
            showAllert()
        }

    });
    event.preventDefault();
}

function saveData(name) {
    if (!maleRadioButton.checked && !femaleRadioButton.checked) {
        showAllert()
        return;
    }
    submitName();
    const gender = maleRadioButton.checked ? 'male' : 'female';
    localStorage.setItem(name, gender);
    savedAnswer.innerHTML = `${name} has saved as ${gender}`;
    saveAnswerDiv.style.visibility = 'visible';
    event.preventDefault();

}

function clearFromLocalStorage(name) {
    localStorage.removeItem(name);
    saveAnswerDiv.style.visibility = 'hidden';
    event.preventDefault();
}




