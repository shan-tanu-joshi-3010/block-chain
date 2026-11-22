# Voting DApp

This folder contains three frontend designs for the voting contract:

- `index.html` with `styles.css`, `app.js`, and `config.js` — original project split across files.
- `voting-version-2.html` — standalone Agora design.
- `voting-version-3.html` — standalone dark Vote / 01 design.

All versions use ethers.js v6 and MetaMask. The supplied ABI matches the interface you shared: `getCandidateCount()`, `candidates(index)` returning `(id, name, voteCount)`, `vote(candidateId)`, and `hasVoted(address)`. They are configured for your Sepolia deployment at `0x932C2EA2DCD2203186dBeD43202B123fee8D8e9a` (chain ID `11155111`).

See [SUBMISSION-GUIDE.md](SUBMISSION-GUIDE.md) for setup, deployment, and screenshot steps.
