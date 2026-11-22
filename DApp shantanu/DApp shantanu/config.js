// Deployment address and interface supplied from Remix. Set chainId to the
// decimal chain ID of the network where this address was deployed.
window.VOTING_CONFIG = {
  contractAddress: "0x932C2EA2DCD2203186dBeD43202B123fee8D8e9a",
  // Use the decimal chain ID shown in MetaMask (e.g. Sepolia: 11155111).
  chainId: "11155111",
  abi: [
    "function getCandidateCount() view returns (uint256)",
    "function candidates(uint256) view returns (uint256 id, string name, uint256 voteCount)",
    "function vote(uint256 candidateId)",
    "function hasVoted(address voter) view returns (bool)"
  ],
  methods: { candidateCount: "getCandidateCount", candidateAt: "candidates", vote: "vote", hasVoted: "hasVoted" }
};
