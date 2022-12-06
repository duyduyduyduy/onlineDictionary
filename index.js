const RenderData = async () => {
  document.getElementById("meaningContainer").innerHTML = "";
  document.getElementById("title").innerHTML = "";
  document.getElementById("pronouce").innerHTML = "";
  document.getElementById("audio").innerHTML = "";
  document.getElementById("loader").style.display = "block";
  document.getElementById("bannercontainer").style.display = "none";
  let searchvalue = document.getElementById("searchvalue").value;
  if (searchvalue == "") {
    window.location.reload();
    return;
  }
  let res = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${searchvalue}`
  );
  let data = await res.json();
  let audio;
  let pronouce;
  if (data) {
    document.getElementById("loader").style.display = "none";
  }
  data.map((item) => {
    item.phonetics.map((n) => {
      if (n.audio) {
        audio = n.audio;
      }
      if (n.text) {
        pronouce = n.text;
      }
    });
  });
  //---------------------- render data header----------------------
  document.getElementById("pronouce").innerHTML = pronouce ? pronouce : "";
  document.getElementById("title").innerHTML = searchvalue;
  document.getElementById("audio").innerHTML =
    audio != 1
      ? `<audio controls autoplay>
  <source
    src="${audio}"
    type="audio/mpeg"
  />
</audio>`
      : "";
  //-------------------- Render Data Meaning ---------------------------

  data.map((item, index) => {
    item.meanings.map((n, index) => {
      document.getElementById("meaningContainer").innerHTML += `
      <p style="margin-bottom: 5px;margin-top: 40px">
      <i class="fa-solid fa-star"></i>  <i><b>[${n.partOfSpeech}]</b></i>
      </p>
      <hr />
      <div class="meaning">
        ${n.definitions
          .map((t, index2) => {
            return `<p style="margin-top: 3px">${index2 + 1}. ${
              t.definition
            }</p>
            <p style="margin-left: 30px; margin-bottom: 20px;color: rgb(73, 73, 73)">
            
            <i> ${t.example ? t.example : ""}</i>
            </p>`;
          })
          .join("")}
        
        <span>Synonym: ${n.synonyms ? n.synonyms : ""}</span>
        <br />
        <span>Antonym: ${n.antonyms ? n.antonyms : ""}</span>
    </div>
      `;
    });
  });
};
const handleOnKeyUp = (event) => {
  if (event.key == "Enter") {
    RenderData();
  }
};
const handleOnClickHomePage = () => {
  document.getElementById("searchvalue").value = "analysis";
  RenderData();
};
