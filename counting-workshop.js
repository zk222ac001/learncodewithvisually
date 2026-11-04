const form = document.querySelector("#score-counter-form")
const scoresInput = document.querySelector("#score-list")
const passMarkInput = document.querySelector("#pass-mark")
const error = document.querySelector("#score-counter-error")
const result = document.querySelector("#score-counter-result")
const trace = document.querySelector("#score-counter-trace")

if (!(form instanceof HTMLFormElement)) throw new Error("Score counter form is missing.")
if (!(scoresInput instanceof HTMLInputElement)) throw new Error("Score list input is missing.")
if (!(passMarkInput instanceof HTMLInputElement)) throw new Error("Pass mark input is missing.")
if (!(error instanceof HTMLParagraphElement)) throw new Error("Score counter error message is missing.")
if (!(result instanceof HTMLParagraphElement)) throw new Error("Score counter result message is missing.")
if (!(trace instanceof HTMLDivElement)) throw new Error("Score counter trace container is missing.")

form.addEventListener("submit", (event) => {
  event.preventDefault()
  const parsed = parseScores(scoresInput.value)
  if (!parsed.ok) {
    showError(parsed.message)
    return
  }

  const passMark = passMarkInput.valueAsNumber
  if (!Number.isFinite(passMark)) {
    showError("Enter a numeric pass mark.")
    return
  }

  error.hidden = true
  error.textContent = ""
  let passed = 0
  const rows = parsed.scores.map((score) => {
    const qualifies = score >= passMark
    if (qualifies) passed += 1
    return { score, qualifies, passed }
  })

  result.textContent = rows.length
    ? `${rows.length} scores processed; ${passed} meet the pass mark of ${passMark}.`
    : "No scores to process. The count remains 0."
  trace.replaceChildren()
  if (rows.length === 0) return

  const table = document.createElement("table")
  table.className = "counter-trace"
  const caption = document.createElement("caption")
  caption.textContent = "The counter after each score is checked"
  table.append(caption)

  const head = document.createElement("thead")
  const headingRow = document.createElement("tr")
  for (const label of ["Score", "Score >= pass mark?", "Count after this score"]) {
    const cell = document.createElement("th")
    cell.scope = "col"
    cell.textContent = label
    headingRow.append(cell)
  }
  head.append(headingRow)
  table.append(head)

  const body = document.createElement("tbody")
  for (const row of rows) {
    const tableRow = document.createElement("tr")
    for (const value of [row.score, row.qualifies ? "Yes" : "No", row.passed]) {
      const cell = document.createElement("td")
      cell.textContent = String(value)
      tableRow.append(cell)
    }
    body.append(tableRow)
  }
  table.append(body)
  trace.append(table)
})

result.textContent = "Enter the example values and select Trace scores."
result.hidden = false
form.hidden = false

function parseScores(raw) {
  if (raw.trim() === "") return { ok: true, scores: [] }
  const tokens = raw.split(",").map((token) => token.trim())
  if (tokens.some((token) => token === "")) {
    return { ok: false, message: "Separate scores with commas and do not leave an item empty." }
  }
  const scores = tokens.map(Number)
  if (scores.some((score) => !Number.isFinite(score))) {
    return { ok: false, message: "Enter only finite numbers, separated by commas." }
  }
  return { ok: true, scores }
}

function showError(message) {
  error.textContent = message
  error.hidden = false
  result.textContent = ""
  trace.replaceChildren()
}
