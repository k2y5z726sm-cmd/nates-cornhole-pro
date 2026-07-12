import { useEffect, useState } from "react"
import "./App.css"
import {
  FaBullseye,
  FaTrophy,
  FaChartBar,
  FaCog,
  FaArrowLeft,
  FaUsers,
  FaUndo,
  FaRedo,
  FaClipboardList,
  FaCheckCircle,
  FaHome
} from "react-icons/fa";

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
    <div className="app home-screen">
      <div className="brand-logo">
        <span className="brand-small">NATE'S</span>
        <span className="brand-main">CORNHOLE</span>
        <span className="brand-pro">PRO</span>
      </div>

      <p className="home-tagline">SCORE. TRACK. COMPETE.</p>
      <p className="home-subtitle">PLAY LIKE A PRO.</p>

      <div className="home-menu">
        <button
          className="primary-menu-button"
          onClick={() => {
  setPlayer1("")
  setPlayer2("")
  setScreen("setup")
}}
        >
          <span className="menu-icon quick-icon">
  <FaBullseye />
</span>
          <div>
            <strong>QUICK GAME</strong>
            <small>Start a new cancellation scoring game</small>
          </div>
        </button>

        <button className="secondary-menu-button" disabled>
          <span className="menu-icon trophy-icon">
  <FaTrophy />
</span>
          <div>
            <strong>TOURNAMENT</strong>
            <small>Coming soon</small>
          </div>
        </button>

        <button className="secondary-menu-button" disabled>
          <span className="menu-icon chart-icon">
  <FaChartBar />
</span>
          <div>
            <strong>STATISTICS</strong>
            <small>Coming soon</small>
          </div>
        </button>

        <button className="secondary-menu-button" disabled>
          
          <div>
            <strong>SETTINGS</strong>
            <small>Coming soon</small>
          <span className="menu-icon gear-icon">
  <FaCog />
</span></div>
        </button>
      </div>

      <p className="version">NATE'S CORNHOLE PRO • VERSION 2.0</p>
    </div>
  )
}
if (screen === "gameOver") {
  return (
    <div className="app game-over-screen">
      <div className="winner-card">

    <div className="winner-trophy">
        <FaTrophy />
    </div>

    <p className="winner-label">GAME COMPLETE</p>

    <h1>VICTORY!</h1>

        <p className="winner-name">
          {winner?.name}
        </p>

        <div className="final-score-label">
          FINAL SCORE
        </div>

        <div className="final-score">
          <span>{winner?.winnerScore}</span>
          <strong>–</strong>
          <span>{winner?.loserScore}</span>
        </div>

        <button
          className="play-again-button"
          onClick={() => {
            setWinner(null)
            startGame()
          }}
        >
          
  <span>PLAY AGAIN</span>

        </button>

        <button
          className="winner-menu-button"
          onClick={() => {
            setWinner(null)
            setScreen("home")
          }}
        >
          <FaHome />
<span>MAIN MENU</span>
        </button>
      </div>

      <p className="winner-footer">
        NATE'S CORNHOLE PRO • GAME COMPLETE
      </p>
    </div>
  )
}
  if (screen === "setup") {
  return (
    <div className="app setup-screen">
      <button
        className="setup-back-button"
        onClick={() => setScreen("home")}
      >
        ←
      </button>

      <div className="setup-brand">
        <span>NATE'S</span>
        <strong>CORNHOLE PRO</strong>
      </div>

      <div className="setup-card">
        <div className="setup-icon">
  <FaUsers />
</div>

        <p className="setup-label">NEW GAME</p>
        <h1>QUICK GAME SETUP</h1>
        <p className="setup-description">
          Enter player or team names
        </p>

        <div className="name-input-group">
          <span>👤</span>
          <input
            type="text"
            value={player1}
            onChange={(event) => setPlayer1(event.target.value)}
            placeholder="Player/Team 1"
          />
        </div>

        <div className="name-input-group">
          <span>👤</span>
          <input
            type="text"
            value={player2}
            onChange={(event) => setPlayer2(event.target.value)}
            placeholder="Player/Team 2"
          />
        </div>

        <button
          className="setup-start-button"
          onClick={startGame}
        >
          START GAME
        </button>
      </div>

      <p className="setup-footer">
        CANCELLATION SCORING • RACE TO 21
      </p>
    </div>
  )
}

  return (
  <div className="app game-screen">
    <header className="game-header">
      <button
        className="game-home-button"
        onClick={() => setScreen("home")}
      >
        ←
      </button>

      <div className="game-brand">
        <span>NATE'S</span>
        <strong>CORNHOLE PRO</strong>
      </div>

      <div className="round-badge">
        ROUND {roundHistory.length + 1}
      </div>
    </header>

    <div className="game-mode-label">
      CANCELLATION SCORING • RACE TO 21
    </div>

      <div className="scoreboard">
        <div className="player-card player-one-card">
  <div className="player-label">PLAYER 1</div>
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

        <div className="player-card player-two-card">
  <div className="player-label">PLAYER 2</div>
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
        <>
  <FaCheckCircle />
  <span>Score Round</span>
</>
      </button>
<button
  className="secondary"
  onClick={undoLastRound}
  disabled={!previousScores}
>
  <>
  <FaUndo />
  <span>Undo Last Round</span>
</>
</button>
      <button className="secondary" onClick={resetGame}>
        <>
  <FaRedo />
  <span>Reset Game</span>
</>
      </button>

<div className="history">
  <FaClipboardList /><h2>📋 Round History</h2>

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