const category_url = "https://tryvia.ptr.red/api_category.php"
var quiz_url = ''
const categories = []
function ShuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos
    }
    return array;
  }
  

async function fetch_trivia(url){
    try{
        const response = await fetch(url)
        if(!response.ok){
            throw new Error(`Erro HTTP: ${response.status}`)
        }
        return await response.json()
    } catch(error){
        console.error('Erro:', error);
    }
}
async function get_categories() {
    const category_data = await fetch_trivia(category_url);
    if (category_data && category_data.trivia_categories) {
      categories.push(...category_data.trivia_categories); 
      return categories
    } else {
      console.error(" Error");
    }
}
async function get_quizes(){
    const quiz_data = await fetch_trivia(quiz_url)
    if (quiz_data && quiz_data.results) {
       quizes.push(...quiz_data.results); 
        return quizes
      } else {
        console.error(" Error");
      }
}
async function show_quizes(quizes) {
    quizes = await get_quizes()
    console.log(quizes);
   
    quiz_element=document.getElementById('quiz')
    quizes.forEach( quiz =>{
        all_answers = []
        all_answers.push(quiz.correct_answer)
        all_answers.push(...quiz.incorrect_answers)
        all_answers = ShuffleArray(all_answers)
        difficulty = ''
        console.log(all_answers);
        if(quiz.difficulty == 'hard'){
            difficulty = 'Difícil'
        }else if(quiz.difficulty == 'easy'){
            difficulty = 'Fácil'
        }else if(quiz.difficulty == 'medium'){
            difficulty = 'Normal'
        }
        quiz_element.innerHTML += `
            <div class="quiz-single ${quiz.difficulty}">
            <div class="header">
                <div class="difficulty">${difficulty}</div>
                <div class="category">${quiz.category}</div>
            </div>
            <div class="question">${quiz.question}</div>
            <div class="answers">
                <div class="answer">${all_answers[0]}</div>
                <div class="answer">${all_answers[1]}</div>
                <div class="answer">${all_answers[2]}</div>
                <div class="answer">${all_answers[3]}</div>
            </div>
        </div>
        `
    })
}
async function complete_select(categories) {
    select = document.getElementById('category')
    categories = await get_categories()
    categories.forEach(category => {
        newOption = document.createElement('option')
        newOption.value = category.id
        newOption.textContent = category.name
        select.appendChild(newOption)
    });
}
complete_select()
get_categories()
var token ="eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IlZYakNUaTJXNUpMeDhyTUY2VjBPciIsImV4cCI6MTczNjg5NDkyNn0.ox3KuV3-_IedY3NcLLud-P_YqdHuCVrisghrQgPoEKU"
function generate_url(qnt,category_id,difficulty,type){
    return `https://tryvia.ptr.red/api.php?amount=${qnt}&category=${category_id || 0}&difficulty=${difficulty || 0}&type=${type || 0}`;
}

var url = ""
form.addEventListener('submit', function(e){
    quizes = []
    e.preventDefault()
    const form_data = new FormData(form)
    const quantity = form_data.get('quantity')
    const difficulty = form_data.get('difficulty')
    const category = form_data.get('category')
    quiz_url = generate_url(quantity,  category, difficulty, "multiple");
    show_quizes(quizes)
})
