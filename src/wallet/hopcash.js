import BCHJS from '@psf/bch-js'
import { ethers, utils, BigNumber } from 'ethers'
import { getProvider } from './sbch/utils'

const bchjs = new BCHJS()
const provider = getProvider(false)

const bchBridge = 'bitcoincash:qqa0dj5rwaw2s4tz88m3xmcpjyzry356gglq7zvu80'
const sbchBridge = '0x3207d65b4D45CF617253467625AF6C1b687F720b'

// address of sender in main chain for s2c outgoing txs, from examples
const bchSender = 'bitcoincash:qzteyuny2hdvvcd4tu6dktwx9f04jarzkyt57qel0y'

// address of sender in smart chain for c2s outgoing txs, from examples
const sbchSender = '0xBAe8Af26E08D3332C7163462538B82F0CBe45f2a'

const bridgeContract = new ethers.Contract(
  sbchSender,
  [
    'event Bridged(bytes32 indexed sourceTransaction, address indexed liquidityProviderAddress, address indexed outputAddress, uint256 outputAmount);',
  ],
  provider,
)

function toBigNumber(value) {
  return BigNumber.from('0x' + BigInt(value).toString(16)) 
}

/**
 * To reverse value set feeInfo:
 * nf = -f/(1-p), np = 1 - 1/(1-p), Where:
 *  nf: new fixed, f = prev fixed, np = new pctg, p = prev pctg     
 *  
 * @param {number} amount
 * @param {Object} feeInfo ex: { pctg: 0.001, fixed: 1 }
 * @returns {Number}
 */
export function deductFromFee(amount, feeInfo={pctg: 0.0, fixed: 0}) {
  return amount * (1-feeInfo.pctg) - feeInfo.fixed
}

export async function bchBridgeBalance() {
  const response = await bchjs.Electrumx.balance(bchBridge);
  if (response.success) {
    return {
      success: true,
      balance: toBigNumber(response.balance.confirmed),
    }
  }
  return {
    success: false,
    error: response,
  }
}

export async function sbchBridgeBalance() {
  const balance = await provider.getBalance(sbchBridge)
  return {
    success: true,
    balance: balance,
  }
}

/**
 * Sends a c2s,incoming type transaction
 * @param {number} amount in BCH 
 * @param {string} recipientAddress address of sbch wallet
 * @param {string} changeAddress bch address 
 * @returns 
 */
export async function c2s(wallet, amount, recipientAddress, changeAddress) {
  if (wallet && wallet._testnet) {
    return {
      success: false,
      error: 'Wallet used is in testnet.',
    }
  }
  if (!utils.isAddress(recipientAddress)) {
    return {
      success: false,
      error: 'Recipient address must be a valid SmartBCH address',
    }
  }

  const OP_RETURN = '6a', PUSH = '4c'
  const data = Buffer.from(recipientAddress, 'utf8').toString('hex');
  const dataLength = data.length.toString(16)
  const opReturnBuffer = Buffer.from(
    OP_RETURN + PUSH + dataLength + data,
    'hex',
  )

  const recipients = [
    { address: opReturnBuffer, amount: 0 },
    { address: bchBridge, amount: amount },
  ]

  return wallet.BCH.sendBchMultiple(recipients, changeAddress)
}

/**
 * Sends a c2s,incoming type transaction
 * @param {Wallet} amount in sBCH 
 * @param {number} amount in sBCH 
 * @param {string} recipientAddress address of bch wallet
 * @returns 
 */
export async function s2c(wallet, amount, recipientAddress) {
  if (wallet && wallet._testnet) {
    return {
      success: false,
      error: 'Wallet used is in testnet.',
    }
  }

  if (!bchjs.Address.isCashAddress(recipientAddress) && !bchjs.Address.isLegacyAddress(recipientAddress)) {
    return {
      success: false,
      error: 'Recipient address must be a valid cash/legacy address',
    }
  }

  return wallet.sBCH.sendBchWithData(
    amount,
    sbchBridge,
    '0x' + Buffer.from(bchjs.Address.toLegacyAddress(recipientAddress), 'utf8').toString('hex')
  )
}

export async function findC2SOutgoingTx(txId='') {
  if (!txId.startsWith('0x')) txId = '0x' + txId

  const eventFilter = bridgeContract.filters.Bridged(txId)
  const logs = await bridgeContract.provider.send(
    'sbch_queryLogs',
    [
      bridgeContract.address,
      eventFilter.topics,
      'latest', // before block
      '0x0', // after block
      '0x1', // limit
    ]
  )

  if (!Array.isArray(logs)) return {
    success: false,
    error: 'Unable to find logs'
  }

  if (!logs.length) return {
    success: false,
    error: 'Not found'
  }

  const log = logs[0]
  const parsedLog = bridgeContract.interface.parseLog(log)
  return {
    success: true,
    tx: {
      hash: log.transactionHash,
      block: BigNumber.from(log.blockNumber).toNumber(),

      sourceTransaction: parsedLog.args.sourceTransaction,
      liquidityProviderAddress: parsedLog.args.liquidityProviderAddress,
      outputAddress: parsedLog.args.outputAddress,
      outputAmount: utils.formatEther(parsedLog.args.outputAmount),

      _raw: parsedLog
    },
  }
}

export async function findS2COutgoingTx(txId='') {
  return {
    success: false,
    error: 'Not implemented'
  }
}

/**
 * 
 * @param {String} txId transaction id from the BCH chain
 * @param {function} callback callback function when bridge transfer for the source tx is made
 * @returns {function} function to call to stop the listener
 */
 export function c2sOutgoingListener(txId='', callback=() =>{}) {
  if (!txId.startsWith('0x')) txId = '0x' + txId

  const contract = bridgeContract
  const filter = contract.filters.Bridged(txId)
  const eventCallback = (...args) => {
    const tx = args[args.length-1]
    callback({
      hash: tx.transactionHash,

      sourceTransaction: tx.args.sourceTransaction,
      liquidityProviderAddress: tx.args.liquidityProviderAddress,
      outputAddress: tx.args.outputAddress,
      outputAmount: utils.formatEther(tx.args.outputAmount),

      _raw: tx,
    })
  }

  contract.on(filter, eventCallback)
  return () => {
    contract.removeListener(eventFilter, eventCallback) 
  }
}


function matchOpReturn(txId, txData) {
  const asmRegex = /^OP_RETURN ([0-9a-f]{64})$/
  const outputs = txData?.vout
  if (!Array.isArray(outputs)) return false

  for(var i = 0; i < outputs.length; i++) {
    const match = String(out?.scriptPubKey?.asm).match(asmRegex)
    if (!match) continue
    if (String(txId).substring(2) === match[1]) {
      return true
    }
  }
  return false
}

async function matchOpReturnFromHash(txId, txHash) {
  try {
    const { details: txData } = await bchjs.Electrumx.txData(txHash)
    return {
      success: true,
      match: matchOpReturn(txId, txData),
      tx: txData,
    }
  } catch(err) {
    return {
      success: false,
      error: err,
    }
  }
}


/**
 * 
 * @param {String} txId transaction id from the Smart BCH chain
 * @param {function} callback callback function when bridge transfer for the source tx is made
 * @returns {function} function to call to stop the listener
 */
export function s2cOutgoingListener(txId='', callback=() => {}) {
  const txHashRegex = /[0-9a-f]{64}/
  const websocket = new WebSocket(`wss://watchtower.cash/ws/watch/bch/${bchSender}/`)
  websocket.onmessage = async (message) => {
    const data = JSON.parse(message)
    const txid = data?.txid
    if (!txHashRegex.test(txid)) return

    const response = await matchOpReturnFromHash(txId, txid)
    if (!response.success) return
    callback(response.tx)
  }
  
  return () => {
    websocket.close()
  }
}


export function waitC2SOutgoing(txId) {
  const promise = new Promise(resolve => {
    const stopListener = c2sOutgoingListener(txId, (tx) => {
      stopListener()
      resolve(tx)
    })
    setTimeout(() => {
      promise.cancelWatch = stopListener
    }, 100)
  })

  return promise
}


export function waitS2COutgoing(txId) {
  const promise = new Promise(resolve => {
    const stopListener = s2cOutgoingListener(txId, (tx) => {
      stopListener()
      resolve(tx)
    })

    setTimeout(() => {
      promise.cancelWatch = stopListener
    }, 100)
  })

  return promise
}
