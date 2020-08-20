const questionsCustomInputs = document.querySelectorAll('.questions_custom-input');

const anCheckedInput = () => {
  
}

questionsCustomInputs.forEach(item => {
  item.addEventListener('click', (evt)=>{

    const isCheckedInput = evt.target.classList.contains('questions_custom-input--checked');

    questionsCustomInputs.forEach(item => {
      item.classList.remove('questions_custom-input--checked');
    });

    if (isCheckedInput) {
      return;
    }
    
    item.classList.add('questions_custom-input--checked')
  })
})