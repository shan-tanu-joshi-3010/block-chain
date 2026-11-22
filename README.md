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

Then open your browser and navigate to:
