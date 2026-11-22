(() => {
  const cfg = window.VOTING_CONFIG;
  const $ = (id) => document.getElementById(id);
  let provider, signer, contract, account;
  const status = (message, kind = "info") => { const el = $("status"); el.textContent = message; el.className = `notice ${kind}`; };
  const short = (value) => `${value.slice(0, 6)}…${value.slice(-4)}`;
  const configured = () => {
    if (!cfg?.contractAddress || !cfg.chainId) { status("Add your deployed contract address and chain ID in config.js to begin.", "warn"); return false; }
    if (!ethers.isAddress(cfg.contractAddress)) { status("The contract address in config.js is not a valid Ethereum address.", "error"); return false; }
    return true;
  };
  async function connect() {
    if (!window.ethereum) { status("MetaMask was not found. Install or enable the MetaMask browser extension, then reload this page.", "error"); return; }
    if (!configured()) return;
    try {
      provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      signer = await provider.getSigner(); account = await signer.getAddress();
      const network = await provider.getNetwork();
      const expected = BigInt(cfg.chainId);
      $("account-box").hidden = false; $("account-address").textContent = short(account);
      if (network.chainId !== expected) {
        $("network-label").textContent = `Wrong network · expected chain ${cfg.chainId}`;
        $("network-label").parentElement.classList.add("offline");
        contract = null; $("vote-state").textContent = "Switch network in MetaMask";
        $("candidate-list").replaceChildren(); status(`Your wallet is on chain ${network.chainId}. Switch MetaMask to chain ${cfg.chainId}, then reconnect.`, "error"); return;
      }
      $("network-label").textContent = `Connected · chain ${network.chainId}`;
      $("network-label").parentElement.classList.remove("offline");
      contract = new ethers.Contract(cfg.contractAddress, cfg.abi, signer);
      await loadCandidates();
    } catch (error) {
      if (error.code === 4001) status("Connection was rejected in MetaMask.", "error");
      else status(error.shortMessage || error.message || "Could not connect to the voting contract.", "error");
    }
  }
  async function loadCandidates() {
    if (!contract) return;
    try {
      const voted = await contract[cfg.methods.hasVoted](account);
      $("vote-state").textContent = voted ? "You have voted" : "Not voted";
      const count = Number(await contract[cfg.methods.candidateCount]());
      if (!Number.isSafeInteger(count) || count < 0 || count > 500) throw new Error("The contract returned an unsupported candidate count.");
      const items = await Promise.all(Array.from({ length: count }, (_, i) => contract[cfg.methods.candidateAt](i)));
      const list = $("candidate-list"); list.replaceChildren();
      if (!items.length) { status("No candidates have been added to this election yet.", "warn"); return; }
      items.forEach((candidate, index) => {
        const id = candidate.id ?? candidate[0] ?? BigInt(index);
        const name = candidate.name ?? candidate[1] ?? `Candidate ${index + 1}`;
        const votes = candidate.voteCount ?? candidate[2] ?? 0n;
        const card = document.createElement("article"); card.className = "candidate";
        const avatar = document.createElement("div"); avatar.className = "avatar"; avatar.textContent = String(name).trim().charAt(0).toUpperCase() || "?";
        const detail = document.createElement("div"); detail.className = "candidate-detail";
        const title = document.createElement("h3"); title.textContent = name;
        const tally = document.createElement("p"); tally.textContent = `${ethers.formatUnits(votes, 0)} ${BigInt(votes) === 1n ? "vote" : "votes"}`;
        detail.append(title, tally);
        const button = document.createElement("button"); button.className = "vote-button"; button.textContent = voted ? "Voted" : "Vote"; button.disabled = voted;
        button.addEventListener("click", () => castVote(id, button));
        card.append(avatar, detail, button); list.append(card);
      });
      status("Candidate list and vote totals are up to date.", "success");
    } catch (error) { status(`Could not read contract data. Check the ABI and method names in config.js. ${error.shortMessage || error.message || ""}`, "error"); }
  }
  async function castVote(id, button) {
    if (!contract) return;
    button.disabled = true; button.textContent = "Confirm in wallet…"; status("Confirm the voting transaction in MetaMask.");
    try {
      const tx = await contract[cfg.methods.vote](id);
      button.textContent = "Pending…"; status(`Transaction submitted (${short(tx.hash)}). Waiting for confirmation…`);
      await tx.wait(); status("Your vote was confirmed on the blockchain.", "success"); await loadCandidates();
    } catch (error) {
      if (error.code === 4001 || error.code === "ACTION_REJECTED") status("You rejected the transaction in MetaMask.", "error");
      else status(`Voting failed. ${error.shortMessage || error.reason || error.message || "Check the contract rules and wallet network."}`, "error");
      button.disabled = false; button.textContent = "Vote";
    }
  }
  $("connect-button").addEventListener("click", connect);
  $("refresh-button").addEventListener("click", loadCandidates);
  if (window.ethereum) {
    window.ethereum.on?.("accountsChanged", () => { contract = null; connect(); });
    window.ethereum.on?.("chainChanged", () => window.location.reload());
  }
  if (!cfg?.contractAddress || !cfg?.chainId) status("Setup needed: enter your contract address and network in config.js.", "warn");
})();
