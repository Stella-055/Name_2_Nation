let inputValue = document.getElementById("search");
let searchButton = document.getElementById("searchButton");
let resultDiv = document.querySelector(".result");

searchButton.addEventListener("click", async function (e) {
  e.preventDefault();
  let searchTerm = inputValue.value.trim();
  if (searchTerm) {
    resultDiv.innerHTML = `<p> <b>${searchTerm}</b>  is probably from....</p>`;  
} else {
    resultDiv.innerHTML = "<p>Please enter a name.</p>";
}
   try{
     let response = await fetch(`https://api.nationalize.io/?name=${searchTerm}`);
      if (!response.ok) {
          throw new Error("Network response was not ok");
      }
      let {country} = await response.json();
     
      if (country.length === 0) {
          resultDiv.innerHTML = `<p>Could not trace <b>${searchTerm}</b>.</p>`;
          return;
      }
      else{
        resultDiv.innerHTML ="";
      }
     country.forEach(element => {
        resultDiv.innerHTML += `<p>Country: <b>${element.country_id}</b> - Probability: <b>${(element.probability * 100).toFixed(2)}%</b></p>`;
     });


    
   }
   catch (error) {
      console.log("Error fetching data:", error);
   }
}
)