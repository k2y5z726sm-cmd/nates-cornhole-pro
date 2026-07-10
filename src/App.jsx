import { useEffect, useState } from "react"
import "./App.css"

function App() {
  const [screen, setScreen] = useState("home")
  const [player1, setPlayer1] = useState("")
  const [player2, setPlayer2] = useState("")

  const [score1, setScore1] = useState(0)
  const [score2, setScore2] = useState(0)

  const [round1, setRound1] = useState(0)
  const [round2, setRound2] = useState(0)

  const [holeBags1, setHoleBags1] = useState(0)
const [boardBags1, setBoardBags1] = useState(0)

const [holeBags2, setHoleBags2] = useState(0)
const [boardBags2, setBoardBags2] = useState(0)

useEffect(() => {
  setRound1(holeBags1 * 3 + boardBags1)
}, [holeBags1, boardBags1])

useEffect(() => {
  setRound2(holeBags2 * 3 + boardBags2)
}, [holeBags2, boardBags2])

const [winner, setWinner] = useState(null)
const [previousScores, setPreviousScores] = useState(null)
useEffect(() => {
  const savedGame = localStorage.getItem("natesCornholePro")

  if (savedGame) {
    const game = JSON.parse(savedGame)

    setScreen(game.screen ?? "home")
    setPlayer1(game.player1 ?? "Nate")
    setPlayer2(game.player2 ?? "Danielle")
    setScore1(game.score1 ?? 0)
    setScore2(game.score2 ?? 0)
    setRound1(game.round1 ?? 0)
    setRound2(game.round2 ?? 0)
    setHoleBags1(game.holeBags1 ?? 0)
    setBoardBags1(game.boardBags1 ?? 0)
    setHoleBags2(game.holeBags2 ?? 0)
    setBoardBags2(game.boardBags2 ?? 0)
    setWinner(game.winner ?? null)
    setPreviousScores(game.previousScores ?? null)
    setRoundHistory(game.roundHistory ?? [])
  }
  setHasLoaded(true)
}, [])
const [roundHistory, setRoundHistory] = useState([])
const [hasLoaded, setHasLoaded] = useState(false)
useEffect(() => {
  if (!hasLoaded) return
  const savedGame = {
    screen,
    player1,
    player2,
    score1,
    score2,
    round1,
    round2,
    holeBags1,
    boardBags1,
    holeBags2,
    boardBags2,
    winner,
    previousScores,
    roundHistory,
    
  }

  localStorage.setItem(
    "natesCornholePro",
    JSON.stringify(savedGame)
  )
}, [
  screen,
  player1,
  player2,
  score1,
  score2,
  round1,
  round2,
  holeBags1,
  boardBags1,
  holeBags2,
  boardBags2,
  winner,
  previousScores,
  roundHistory,
])
 function startGame() {
  if (!player1.trim() || !player2.trim()) {
    alert("Please enter a name for both players or teams.")
    return
  }

  setPlayer1(player1.trim())
  setPlayer2(player2.trim())

  setScore1(0)
  setScore2(0)
  setRound1(0)
  setRound2(0)

  setHoleBags1(0)
  setBoardBags1(0)
  setHoleBags2(0)
  setBoardBags2(0)

  setRoundHistory([])
  setPreviousScores(null)
  setWinner(null)

  setScreen("game")
}

function scoreRound() {
  setPreviousScores({
  score1: score1,
  score2: score2,
})
  const difference = round1 - round2
  let roundResult = ""

if (difference > 0) {
  roundResult = `${player1} +${difference}`
} else if (difference < 0) {
  roundResult = `${player2} +${Math.abs(difference)}`
} else {
  roundResult = "Wash — No Points"
}

setRoundHistory((history) => [
  ...history,
  {
    round: history.length + 1,
    result: roundResult,
    rawScore: `${round1} - ${round2}`,
  },
])

  if (difference > 0) {
    const newScore = score1 + difference
    setScore1(newScore)

    if (newScore >= 21) {
  setWinner({
    name: player1,
    winnerScore: newScore,
    loserScore: score2,
  })
  setScreen("gameOver")
}
  } else if (difference < 0) {
    const newScore = score2 + Math.abs(difference)
    setScore2(newScore)

    if (newScore >= 21) {
  setWinner({
    name: player2,
    winnerScore: newScore,
    loserScore: score1,
  })
  setScreen("gameOver")
}
  }

  setRound1(0)
  setRound2(0)

  setHoleBags1(0)
setBoardBags1(0)
setHoleBags2(0)
setBoardBags2(0)
}

   
function undoLastRound() {
  if (previousScores) {
    setScore1(previousScores.score1)
    setScore2(previousScores.score2)

    setRoundHistory((history) => history.slice(0, -1))

    setPreviousScores(null)
  }
}
  function resetGame() {
  const confirmed = window.confirm(
    "Start a new game? This will erase the current scores and round history."
  )

  if (!confirmed) return

  setScore1(0)
  setScore2(0)
  setRound1(0)
  setRound2(0)

  setHoleBags1(0)
  setBoardBags1(0)
  setHoleBags2(0)
  setBoardBags2(0)

  setRoundHistory([])
  setPreviousScores(null)
  setWinner(null)
}

  if (screen === "home") {
    return (
      <div className="app">
        <h1>🏆 Nate's Cornhole Pro</h1>
        <h2>Professional Cornhole Scorekeeper</h2>

        <button onClick={() => setScreen("setup")}>
          🎯 Quick Game
        </button>

        <button>🏆 Tournament (Coming Soon)</button>
        <button>📊 Statistics</button>
        <button>⚙️ Settings</button>

        <p className="version">Alpha Version 0.2</p>
      </div>
    )
  }
if (screen === "gameOver") {
  return (
    <div className="app">
      <h1>🏆 Game Over!</h1>

      <h2>{winner?.name} Wins!</h2>

      <div className="game-score">
        {winner?.winnerScore} - {winner?.loserScore}
      </div>

      <button
        onClick={() => {
          setWinner(null)
          startGame()
        }}
      >
        🎯 Play Again
      </button>

      <button
        className="secondary"
        onClick={() => {
          setWinner(null)
          setScreen("home")
        }}
      >
        ← Main Menu
      </button>
    </div>
  )
}
  if (screen === "setup") {
    return (
      <div className="app">
        <h1>🏆 Nate's Cornhole Pro</h1>
        <h2>Quick Game Setup</h2>

        <input
          value={player1}
          onChange={(event) => setPlayer1(event.target.value)}
          placeholder="Enter Player/Team 1"
        />

        <input
          value={player2}
          onChange={(event) => setPlayer2(event.target.value)}
          placeholder="Enter Player/Team 2"
        />

        <button onClick={startGame}>🎯 Start Game</button>

        <button className="secondary" onClick={() => setScreen("home")}>
          ← Back
        </button>
      </div>
    )
  }

  return (
    <div className="app">
      <h1>🏆 Nate's Cornhole Pro</h1>
      <h2>Cancellation Scoring</h2>

      <div className="scoreboard">
        <div className="player-card">
          <h3>{player1}</h3>

          <div className="game-score">{score1}</div>

          <p>Current Round</p>

          <div className="round-score">{round1}</div>

          <p>🕳️ Bags in Hole (3 points)</p>

<div className="bag-row">
  {[1, 2, 3, 4].map((bag) => (
    <button
      key={bag}
      className={bag <= holeBags1 ? "bag selected-hole" : "bag"}
      onClick={() => {
        const newHoleCount = bag === holeBags1 ? bag - 1 : bag

        if (newHoleCount + boardBags1 <= 4) {
          setHoleBags1(newHoleCount)
        }
      }}
    >
      {bag <= holeBags1 ? "●" : "○"}
    </button>
  ))}
</div>

<p>🟨 Bags on Board (1 point)</p>

<div className="bag-row">
  {[1, 2, 3, 4].map((bag) => (
    <button
      key={bag}
      className={bag <= boardBags1 ? "bag selected-board" : "bag"}
      onClick={() => {
        const newBoardCount = bag === boardBags1 ? bag - 1 : bag

        if (holeBags1 + newBoardCount <= 4) {
          setBoardBags1(newBoardCount)
        }
      }}
    >
      {bag <= boardBags1 ? "●" : "○"}
    </button>
  ))}
</div>
        </div>

        <div className="player-card">
          <h3>{player2}</h3>

          <div className="game-score">{score2}</div>

          <p>Current Round</p>

          <div className="round-score">{round2}</div>

          <p>🕳️ Bags in Hole (3 points)</p>

<div className="bag-row">
  {[1, 2, 3, 4].map((bag) => (
    <button
      key={bag}
      className={bag <= holeBags2 ? "bag selected-hole" : "bag"}
      onClick={() => {
        const newHoleCount = bag === holeBags2 ? bag - 1 : bag

        if (newHoleCount + boardBags2 <= 4) {
          setHoleBags2(newHoleCount)
        }
      }}
    >
      {bag <= holeBags2 ? "●" : "○"}
    </button>
  ))}
</div>

<p>🟨 Bags on Board (1 point)</p>

<div className="bag-row">
  {[1, 2, 3, 4].map((bag) => (
    <button
      key={bag}
      className={bag <= boardBags2 ? "bag selected-board" : "bag"}
      onClick={() => {
        const newBoardCount = bag === boardBags2 ? bag - 1 : bag

        if (holeBags2 + newBoardCount <= 4) {
          setBoardBags2(newBoardCount)
        }
      }}
    >
      {bag <= boardBags2 ? "●" : "○"}
    </button>
  ))}
</div>

        </div>
      </div>

      <button className="score-round" onClick={scoreRound}>
        ✅ Score Round
      </button>
<button
  className="secondary"
  onClick={undoLastRound}
  disabled={!previousScores}
>
  ↶ Undo Last Round
</button>
      <button className="secondary" onClick={resetGame}>
        ↻ Reset Game
      </button>

<div className="history">
  <h2>📋 Round History</h2>

  {roundHistory.length === 0 ? (
    <p>No rounds scored yet.</p>
  ) : (
    roundHistory.map((item) => (
      <div className="history-item" key={item.round}>
        <strong>Round {item.round}</strong>
        <span>{item.rawScore}</span>
        <span>{item.result}</span>
      </div>
    ))
  )}
</div>
      <button className="secondary" onClick={() => setScreen("home")}>
        ← Main Menu
      </button>
    </div>
  )
}

export default App