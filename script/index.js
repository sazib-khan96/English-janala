const toggleBtn = document.getElementById("toggleBtn");
toggleBtn.addEventListener("click", () => {
  const toggleBtnItem = document.querySelector(".navigation_btn ul");
  toggleBtnItem.classList.toggle("active");
  document.querySelector("#toggleBtn").classList.toggle("active");
});

// level inport function
const getlevel = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((res) => res.json())
    .then((lesson) => {
      displaylessonData(lesson.data);
    });
};

const displaylessonData = (lessons) => {
  const container = document.querySelector(".level_container");
  container.innerHTML = "";
  lessons.forEach((ele) => {
    const lessonDiv = document.createElement("div");

    lessonDiv.innerHTML = `
    <button id="lesson-${ele.level_no}" onClick="getaData(${ele.level_no})"class="lessonBtn">Lesson-${ele.level_no}</button>
    
    `;

    container.appendChild(lessonDiv);
  });
};

const activeColor = () => {
  const allBtn = document.querySelectorAll(".lessonBtn");
  allBtn.forEach((btns) => {
    btns.classList.remove("active");
  });
};

const getaData = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((word) => {
      activeColor();
      const lessonsBtn = document.getElementById(`lesson-${id}`);
      lessonsBtn.classList.add("active");
      displayWord(word.data);
    });
};

const displayWord = (words) => {
      console.log(words)
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";


   if (words.length === 0) {
      cardContainer.innerHTML = `
        <div class="error_mas_card">
        <img src="./img/alert-error.png">
        <p>আপনি এখনো কোন Vocabulary খুঁজে পাননি</p>
        <h1>একটি Lesson Select করুন।</h1>
        </div>
       
       `;
       return;
    }

    

  words.forEach((w) => {
    const card = document.createElement("div");
    card.classList.add("card");
    
   

    card.innerHTML = `
     
     <h3 >${w.word ? w.word : "Not Found"}</h3>
     <p>Meaning /Pronounciation</p>
     <h3 class="meaning">${w.meaning ? w.meaning : "Not Found"}/${w.pronunciation ? w.pronunciation : "Not Found"}</h3>
     <div class="icon_card">
      <button class="card_icon"><i class="fa-solid fa-circle-info"></i></button>
      <button class="card_icon"><i class="fa-solid fa-headphones"></i></button>
    </div>
     
     `;

    cardContainer.appendChild(card);
  });
};

getlevel();
