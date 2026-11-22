# Finish and submit the voting DApp

## What is already implemented

- MetaMask connection and connected account display.
- Expected chain ID check and wrong-network message.
- Candidate names and vote totals read from the contract.
- Vote transaction submitted through MetaMask and confirmation status shown.
- Results refreshed after confirmation; voting disabled when `hasVoted` returns true.
- Messages for missing MetaMask, rejected connection/transaction, contract read failure, and failed vote.

The function interface from your ABI has been entered: `getCandidateCount()`, `candidates(index)`, `vote(candidateId)`, and `hasVoted(address)`. The app is configured with your Sepolia deployment address `0x932C2EA2DCD2203186dBeD43202B123fee8D8e9a` and chain ID `11155111`.

## Your remaining steps

1. In MetaMask, select Sepolia and make sure the wallet has test ETH for gas.
2. Confirm the frontend is connected to the same MetaMask account and Sepolia network. The contract address and chain ID are already configured in all versions.
3. The configured interface expects:
   - a count getter returning the number of candidates;
   - an indexed candidate getter returning candidate ID, name, and vote count;
   - a vote function accepting the candidate ID;
   - a voting-status function accepting the connected address.
4. Run the app from a local web server in a browser where MetaMask is enabled. From this folder, run `python -m http.server 8000`, then visit `http://localhost:8000/` for the split-file version. For the standalone version, open `http://localhost:8000/voting-version-2.html` or `http://localhost:8000/voting-version-3.html`.
5. Connect MetaMask, confirm the expected network and account are displayed, check candidate names and vote totals, then cast one vote using an account that has not voted. Wait for the transaction to be confirmed and verify the updated on-chain total and the disabled vote control.
6. Capture the required screenshots: the connected wallet and candidate list; the MetaMask transaction prompt or submitted transaction status; and the confirmed vote with refreshed total. Never capture or submit a seed phrase or private key.

## Important

The Sepolia address and chain ID are set in all three app versions. If you redeploy the contract, update the address in the configuration before using the app.
