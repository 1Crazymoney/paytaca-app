const Watchtower = require('watchtower-cash-js')
const BCHJS = require('@psf/bch-js')
const sha256 = require('js-sha256')
const bchjs = new BCHJS()
import axios from 'axios'

export class SlpWallet {
  constructor (projectId, mnemonic, path) {
    this.mnemonic = mnemonic
    this.derivationPath = path
    this.watchtower = new Watchtower()
    this.projectId = projectId
    this.walletHash = this.getWalletHash()
  }

  getWalletHash () {
    const mnemonicHash = sha256(this.mnemonic)
    const derivationPath = sha256(this.derivationPath)
    const walletHash = sha256(mnemonicHash + derivationPath)
    return walletHash
  }

  async _getChildNode (index) {
    const seedBuffer = await bchjs.Mnemonic.toSeed(this.mnemonic)
    const masterHDNode = bchjs.HDNode.fromSeed(seedBuffer)
    const childNode = masterHDNode.derivePath(this.derivationPath + '/' + index)
    return childNode
  }

  async getXPubKey () {
    const seedBuffer = await bchjs.Mnemonic.toSeed(this.mnemonic)
    const masterHDNode = bchjs.HDNode.fromSeed(seedBuffer)
    const childNode = masterHDNode.derivePath(this.derivationPath)
    return bchjs.HDNode.toXPub(childNode)
  }

  async getAddress (index) {
    const childNode = await this._getChildNode(index)
    const address = bchjs.HDNode.toSLPAddress(childNode)
    const data = {
      address: address,
      projectId: this.projectId,
      walletHash: this.walletHash,
      walletIndex: index
    }
    const result = await this.watchtower.subscribe(data)
    if (result.success) {
      return address
    } else {
      return null
    }
  }

  async getPrivateKey (index) {
    const childNode = await this._getChildNode(index)
    return bchjs.HDNode.toWIF(childNode)
  }

  async getBalance (tokenId) {
    const walletHash = this.getWalletHash()
    const request = await this.watchtower.Wallet.getBalance({ walletHash, tokenId })
    return request
  }

  async getTransactions (tokenId) {
    const walletHash = this.getWalletHash()
    const request = await this.watchtower.Wallet.getHistory({ walletHash, tokenId })
    return request
  }

  async getCollectibles () {
    const walletHash = this.getWalletHash()
    const request = await this.watchtower.Wallet.getTokens({ walletHash, tokenType: 65 })
    return request
  }

  async getSlpTokenDetails (tokenId) {
    const url = `https://watchtower.cash/api/tokens/${tokenId}/`
    const request = await axios.get(url)
    return request.data
  }

  async sendSlp (amount, tokenId, recipient, feeFunder) {
    console.log(`Sending ${amount} of SLP token ${tokenId} to ${recipient}`)
    const data = {
      sender: {
        walletHash: this.walletHash,
        mnemonic: this.mnemonic,
        derivationPath: this.derivationPath
      },
      recipients: [
        {
          address: recipient,
          amount: amount
        }
      ],
      tokenId: tokenId,
      feeFunder: feeFunder,
      broadcast: true
    }
    const result = await this.watchtower.SLP.Type1.send(data)
    return result
  }
}

export default SlpWallet