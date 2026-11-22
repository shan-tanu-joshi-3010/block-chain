# Blockchain Technology — Practical Lab Submission

**Course:** Blockchain Technology — Practical Lab, Department of Computer Science, School of Technology, Doon University
**Student:** Shantanu Joshi
**Assignment:** Introduction to Ethereum, Smart Contracts and DApp Development

---

## Selected Network

| Item | Value |
| --- | --- |
| Network | Sepolia Ethereum Testnet |
| RPC URL | Infura / MetaMask Sepolia endpoint |
| Chain ID | `11155111` |
| Voting contract address (verified Sepolia deployment) | `0x932C2EA2DCD2203186dBeD43202B123fee8D8e9a` |
| Solidity version | 0.8.20 |
| Frontend library | ethers.js v6 (CDN) |

> **No real ETH required.** Use Sepolia test ETH from a public faucet (e.g. https://sepoliafaucet.com).

---

## Project Layout

```text
DApp shantanu/
├── shantanu.html           DApp page (main entry point)
├── app.js                  Wallet connection, voting, error handling (ethers.js v6)
├── styles.css              DApp styling
├── config.js               Contract address, ABI, and chain ID configuration
├── screenshots/            Execution evidence screenshots
├── README.md               This file
└── SUBMISSION-GUIDE.md     Step-by-step setup and submission checklist
```

---

## Prerequisites

- **Node.js 18+** and npm (optional — only needed if running a local dev server via Node)
- **MetaMask** browser extension
- **Sepolia test ETH** — import or create a wallet in MetaMask and fund it from a faucet
- A modern browser (Chrome / Firefox / Edge)

---

## Step 1 — Set Up MetaMask for Sepolia

1. Install the [MetaMask](https://metamask.io/) browser extension.
2. Create or import a wallet.
3. Switch to the **Sepolia Test Network** in MetaMask (enable test networks under *Settings → Advanced → Show test networks* if not visible).
4. Get free test ETH from a Sepolia faucet:
   - https://sepoliafaucet.com
   - https://faucet.sepolia.dev

---

## Step 2 — Launch the DApp

Start a local web server from the project folder and open the DApp in your browser.

**Using Python (recommended):**

```bash
cd "DApp shantanu"
python -m http.server 8000
```

Then open your browser and navigate to: http://localhost:8000/shantanu.html


> **Alternative:** Open `shantanu.html` directly in your browser — MetaMask will still inject and connect, but a local server is preferred for consistent behaviour.

---

## Step 3 — Connect MetaMask Wallet

1. Click **Connect MetaMask Wallet** on the DApp page.
2. MetaMask will prompt you to approve the connection — click **Connect**.
3. Once connected, the DApp displays your wallet address and confirms you are on the Sepolia network (Chain ID `11155111`).

> If MetaMask shows a *Wrong Network* warning, switch to **Sepolia** inside MetaMask.

---

## Step 4 — View Candidates and Cast a Vote

1. The DApp reads candidate names and current vote tallies directly from the deployed contract at `0x932C2EA2DCD2203186dBeD43202B123fee8D8e9a`.
2. Select a candidate from the list.
3. Click **Vote** — MetaMask will prompt you to confirm the transaction.
4. After the transaction is mined on Sepolia, the candidate totals refresh automatically and the vote button is disabled for your address (`hasVoted` returns `true`).

---

## Smart Contract Interface

The frontend communicates with the Voting contract through the following ABI functions:

| Function | Description |
| --- | --- |
| `getCandidateCount()` | Returns the total number of candidates |
| `candidates(uint index)` | Returns `(id, name, voteCount)` for a candidate |
| `vote(uint candidateId)` | Casts a vote for the given candidate ID |
| `hasVoted(address voter)` | Returns `true` if the address has already voted |

Contract rules enforced on-chain:
- **No double voting** — `require(!voted[msg.sender])` reverts duplicate vote attempts.
- **Valid candidate only** — `require(_candidateId < candidates.length)` rejects out-of-range IDs.

---

## Screenshots

| # | Description |
| --- | --- |
| 1 | DApp interface loaded in browser |
| 2 | MetaMask wallet connection prompt |
| 3 | DApp connected — wallet address and Sepolia network confirmed |
| 4 | Candidate list with vote totals loaded from chain |
| 5 | MetaMask transaction confirmation for voting |
| 6 | Confirmed vote — updated tally and voting disabled |

Screenshots are stored in the `screenshots/` folder.

---

## Alternative: Interacting via Remix IDE

1. Open [Remix IDE](https://remix.ethereum.org).
2. Create a new file `Voting.sol` and paste the contract source code.
3. In **Solidity Compiler**, select version **0.8.20** and compile.
4. In **Deploy & Run Transactions**, choose environment **Injected Provider - MetaMask** (connected to Sepolia).
5. Under **At Address**, enter `0x932C2EA2DCD2203186dBeD43202B123fee8D8e9a` to interact with the already-deployed contract without redeploying.
6. Test `getCandidateCount`, `candidates(index)`, `vote(candidateId)`, and `hasVoted(address)` directly through Remix's UI.

---

## Troubleshooting

| Issue | Fix |
| --- | --- |
| *MetaMask not detected* | Install the MetaMask extension and refresh the page |
| *Wrong network* | Switch MetaMask to **Sepolia** (Chain ID 11155111) |
| *Insufficient funds* | Get Sepolia test ETH from a faucet |
| *Transaction rejected* | You may have already voted — `hasVoted` will return `true` |
| *Candidates not loading* | Check your internet connection; the DApp needs to reach the Sepolia RPC |

---

## Important Notes

- The contract address and Chain ID are configured in `config.js`. If the contract is redeployed, update the address there before using the DApp.
- **Never share or submit your MetaMask seed phrase or private key.**
- This project uses only Sepolia **test ETH** — no real funds are involved.
