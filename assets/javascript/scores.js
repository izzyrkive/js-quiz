var highestScores = document.querySelector("#view-scores");

// Uses sort function to pull saved scores from local storage in descending order

function printHighScores() {
    var high_scores = JSON.parse(window.localStorage.getItem("high-scores")) || [];
    high_scores.sort(function(a, b) {
      return b.score - a.score;
    });

// Creates new list element in the HTML for scores that are being retrieved

    high_scores.forEach(function(score) {
      var liTag = document.createElement("li");

// Appends newly added scores to ordered list element found within the HTML

      liTag.textContent = score.name + " - " + score.score;
      var olEl = document.getElementById("high-scores");
      olEl.appendChild(liTag);
    });
}

// Clears all previously saved scores on user click

  function clear_scores() {
    window.localStorage.removeItem("high-scores");
    window.location.reload();
  } document.getElementById("clear-all").onclick = clear_scores;
  
printHighScores();
