let inputValue = document.getElementById("search");
let searchButton = document.getElementById("searchButton");
let resultDiv = document.querySelector(".result");

searchButton.addEventListener("click", function() {
  let searchTerm = inputValue.value.trim();
    if (searchTerm) {
        resultDiv.innerHTML = `<p>Searching for: <strong>${searchTerm}....</strong></p>`;
        let res = callApi(searchTerm)
        console.log(res);
        
    } else {
        resultDiv.innerHTML = "<p>Please enter a search term.</p>";
    }
});

async function callApi (param) {
   try{
     let response = await fetch(`https://api.nationalize.io/?name=${param}`);
      if (!response.ok) {
          throw new Error("Network response was not ok");
      }
      let data = await response.json();
      return data;
   }
   catch (error) {
      console.log("Error fetching data:", error);
   }
}