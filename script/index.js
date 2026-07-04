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

// lesson Container show lesson btn
const url = "https://openapi.programming-hero.com/api/levels/all";
fetch(url) //Give me promice
  .then((res) => res.json()) //json data convert and promise
  .then((data) => showLesson(data.data));

// array function for show lesson btn
const showLesson = (lessons) => {
  const LessonContainer = document.getElementById("lesson_Container");
  LessonContainer.innerHTML = ""; //fast of all all data clean
  // forEach loop useing for every btn
  lessons.forEach((lesson) => {
    // create btn element

    const lessonDiv = document.createElement("div");
    lessonDiv.innerHTML = `
     <button  id="lesson-btn-${lesson.level_no}"  onClick ="showWords(${lesson.level_no})" class="border border-blue-300 py-3 px-5 rounded bg-blue-400 text-white flex items-center gap-3 cursor-pointer shadow-md"><i class="fa-solid fa-book-open"></i>lesson ${lesson.level_no}</button>
  
  `;

    // append chile

    LessonContainer.appendChild(lessonDiv);
  });
};
// Word details show container start here
const showWords = (id) => {
  const wordUrl = `https://openapi.programming-hero.com/api/level/${id}`;

  fetch(wordUrl)
    .then((res) => res.json())
    .then((words) => wordinfo(words.data));
};
// Word details show container function

const wordinfo = (allWord) => {
  const wordContainer = document.getElementById("word-Container");
  wordContainer.innerHTML = "";

  //  for of loop useing
  for (let word of allWord) {
    //  create card
    const card = document.createElement("div");
    card.innerHTML = `
    <div class="card p-8 text-center shadow-md space-y-4 bg-blue-100">
        <h1 class="font-bold">${word.word}</h1>
        <p>${word.meaning} / ${word.pronunciation} </p>
        <div class="flex justify-between items-center">
          <button class="btn btn-soft btn-accent"><i class="fa-solid fa-question"></i></button>
          <button class="btn btn-soft btn-accent"><i class="fa-solid fa-volume-high"></i></button>
        </div>
      </div>
  
  `;

    wordContainer.appendChild(card);
  }
};
