export default [
  {
    "inputs": [
      { "internalType": "contract ISmartSwapRewarder", "name": "impl", "type": "address" },
      { "internalType": "address", "name": "referral", "type": "address" }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "newImpl", "type": "address" }
    ],
    "name": "ImplementationUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "newReferral", "type": "address" }
    ],
    "name": "ReferralUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "contract IERC20", "name": "fromToken", "type": "address" },
      { "indexed": true, "internalType": "contract IERC20", "name": "destToken", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "fromTokenAmount", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "destTokenAmount", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "minReturn", "type": "uint256" },
      { "indexed": false, "internalType": "uint256[]", "name": "distribution", "type": "uint256[]" },
      { "indexed": false, "internalType": "uint256[]", "name": "flags", "type": "uint256[]" },
      { "indexed": false, "internalType": "address", "name": "referral", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "feePercent", "type": "uint256" }
    ],
    "name": "Swapped",
    "type": "event"
  },
  {
    "payable": true,
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "constant": false,
    "inputs": [
      { "internalType": "contract IERC20", "name": "asset", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "claimAsset",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      { "internalType": "contract IERC20", "name": "fromToken", "type": "address" },
      { "internalType": "contract IERC20", "name": "destToken", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" },
      { "internalType": "uint256", "name": "parts", "type": "uint256" },
      { "internalType": "uint256", "name": "flags", "type": "uint256"}
    ],
    "name": "getExpectedReturn",
    "outputs": [
      { "internalType": "uint256", "name": "returnAmount", "type": "uint256"},
      { "internalType": "uint256[]", "name": "distribution", "type": "uint256[]" }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      { "internalType": "contract IERC20", "name": "fromToken", "type": "address" },
      { "internalType": "contract IERC20", "name": "destToken", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" },
      { "internalType": "uint256", "name": "parts", "type": "uint256" },
      { "internalType": "uint256", "name": "flags", "type": "uint256" },
      { "internalType": "uint256", "name": "destTokenEthPriceTimesGasPrice", "type": "uint256" }
    ],
    "name": "getExpectedReturnWithGas",
    "outputs": [
      { "internalType": "uint256", "name": "returnAmount", "type": "uint256" },
      { "internalType": "uint256", "name": "estimateGasAmount", "type": "uint256" },
      { "internalType": "uint256[]", "name": "distribution", "type": "uint256[]" }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      { "internalType": "contract IERC20[]", "name": "tokens", "type": "address[]" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" },
      { "internalType": "uint256[]", "name": "parts", "type": "uint256[]" },
      { "internalType": "uint256[]", "name": "flags", "type": "uint256[]" },
      { "internalType": "uint256[]", "name": "destTokenEthPriceTimesGasPrices", "type": "uint256[]" }
    ],
    "name": "getExpectedReturnWithGasMulti",
    "outputs": [
      { "internalType": "uint256[]", "name": "returnAmounts", "type": "uint256[]"
      },
      { "internalType": "uint256", "name": "estimateGasAmount", "type": "uint256" },
      { "internalType": "uint256[]", "name": "distribution", "type": "uint256[]" }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "isOwner",
    "outputs": [
      { "internalType": "bool", "name": "", "type": "bool" }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      { "internalType": "address", "name": "", "type": "address" }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      { "internalType": "contract ISmartSwapRewarder", "name": "impl", "type": "address" }
    ],
    "name": "setNewImpl",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      { "internalType": "address", "name": "referral", "type": "address" }
    ],
    "name": "setNewReferral",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "smartSwapReferral",
    "outputs": [
      { "internalType": "address", "name": "", "type": "address" }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "smartSwapRewarder",
    "outputs": [
      { "internalType": "contract ISmartSwapRewarder", "name": "", "type": "address" }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      { "internalType": "contract IERC20", "name": "fromToken", "type": "address" },
      { "internalType": "contract IERC20", "name": "destToken", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" },
      { "internalType": "uint256", "name": "minReturn", "type": "uint256" },
      { "internalType": "uint256[]", "name": "distribution", "type": "uint256[]" },
      { "internalType": "uint256", "name": "flags", "type": "uint256" },
      { "internalType": "uint256", "name": "deadline", "type": "uint256" },
      { "internalType": "uint256", "name": "feePercent", "type": "uint256" }
    ],
    "name": "swap",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      { "internalType": "contract IERC20[]", "name": "tokens", "type": "address[]" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" },
      { "internalType": "uint256", "name": "minReturn", "type": "uint256" },
      { "internalType": "uint256[]", "name": "distribution", "type": "uint256[]" },
      { "internalType": "uint256[]", "name": "flags", "type": "uint256[]" },
      { "internalType": "uint256", "name": "feePercent", "type": "uint256" },
      { "internalType": "uint256", "name": "deadline", "type": "uint256" }
    ],
    "name": "swapMulti",
    "outputs": [
      { "internalType": "uint256", "name": "returnAmount", "type": "uint256" }
    ],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      { "internalType": "address", "name": "newOwner", "type": "address" }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
]