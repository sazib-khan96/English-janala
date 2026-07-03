const toggleBtn = document.getElementById("toggle-btn");
const toggleItem = document.getElementById("toggle_item");
toggleBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  document.getElementById("toggle_item").classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (!toggleItem.contains(e.target)) {
    toggleItem.classList.remove("active");
  }
});
const showWords = (id)=> {
  
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
  .then(res => res.json())
  .then(words => displayWord(words.data))
}

const displayWord = (words)=>{
  const wordContainer = document.getElementById('word-Container')
  wordContainer.innerHTML = '';

  words.forEach(word => {
    const card = document.createElement('div')
    card.innerHTML=`
       <div class=" py-5 px-10 bg-slate-100 rounded text-center shadow-sm">
           <h1 class="font-semibold">${word.word}</h1>
           <p>${word.pronunciation}</p>
           <h2>${word.meaning}</h2>
           <div class="flex justify-between mt-5 ">
            <i class="fa-regular fa-circle-question /i>
            <i class="fa-solid fa-volume-high"></i>
           </div>
       </div>
    `

   wordContainer.appendChild(card)
  })
}

// lesson part
// lesson btn
fetch("https://openapi.programming-hero.com/api/levels/all")
  .then((res) => res.json())
  .then((datas) => showLessonData(datas.data));


const showLessonData =(data)=>{

  const lessonContainer = document.getElementById('show_lesson_Container');
  lessonContainer.innerHTML = '';

  data.forEach(lesson => {
    console.log(lesson)
    const btnDiv = document.createElement('div');
    btnDiv.innerHTML=`
      <button onclick="showWords(${lesson.level_no})" class="p-2 border border-blue-400"> Lesson ${lesson.level_no
}</button>
    `
  lessonContainer.appendChild(btnDiv)
   
  });
}
// // function active color change 

