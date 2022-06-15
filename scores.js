const highScoresList = document.getElementById('highScoresList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
// My issue is somehow here after I changed math.random to mostRecentScore
highScoresList.innerHTML = 
        highScores.map(score => {
            return `<li class="high-score">${score.name} - ${score.score}</li>`;
    })
    .join("");

