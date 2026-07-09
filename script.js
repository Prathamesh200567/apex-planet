const quiz = [
{
    question: "Which language is used for web page styling?",
    options: ["HTML","CSS","JavaScript","Python"],
    answer: "CSS"
},
{
    question: "Which language makes web pages interactive?",
    options: ["HTML","CSS","JavaScript","SQL"],
    answer: "JavaScript"
},
{
    question: "HTML stands for?",
    options: [
        "Hyper Text Markup Language",
        "Home Tool Markup Language",
        "High Text Machine Language",
        "Hyper Transfer Markup Language"
    ],
    answer: "Hyper Text Markup Language"
}
];

let current = 0;

const question = document.getElementById("question");
const options = document.getElementsByClassName("option");
const result = document.getElementById("result");
const nextBtn = document.getElementById("nextBtn");

function loadQuestion(){
    question.innerText = quiz[current].question;

    for(let i=0;i<4;i++){
        options[i].innerText = quiz[current].options[i];
    }

    result.innerText = "";
}

function checkAnswer(btn){
    if(btn.innerText === quiz[current].answer){
        result.innerText = "Correct!";
    }
    else{
        result.innerText = "Wrong!";
    }
}

nextBtn.addEventListener("click",()=>{
    current++;

    if(current < quiz.length){
        loadQuestion();
    }
    else{
        question.innerText = "Quiz Finished";
        result.innerText = "Thank You";
        for(let i=0;i<4;i++){
            options[i].style.display = "none";
        }
        nextBtn.style.display = "none";
    }
});

loadQuestion();

async function getJoke(){
    const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
    );

    const data = await response.json();

    document.getElementById("joke").innerHTML =
        data.setup + "<br><br>" + data.punchline;
} 



