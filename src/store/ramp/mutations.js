export function updateUser (state, user) {
  state.user = user
}

export function clearProfile (state) {
  state.user = null
}

export function saveTxid (state, data) {
  if (!state.txids[data.id]) {
    state.txids[data.id] = {}
  }
  state.txids[data.id][data.txidInfo.action] = data.txidInfo.txid
}

export function clearOrderTxids (state, id) {
  delete state.txids[id]
}

// ~ store mutations ~ //

export function updateStoreBuyListings (state, { overwrite = false, data }) {
  if (overwrite) state.storeBuyListings = []
  state.storeBuyListings.push(...data.ads)
  state.storeBuyTotalPages = data.total_pages
  state.storeBuyItemsCount = data.count
}

export function updateStoreSellListings (state, { overwrite = false, data }) {
  if (overwrite) state.storeSellListings = []
  state.storeSellListings.push(...data.ads)
  state.storeSellTotalPages = data.total_pages
  state.storeSellItemsCount = data.count
}

export function incStoreBuyPage (state) {
  state.storeBuyPageNumber++
}

export function incStoreSellPage (state) {
  state.storeSellPageNumber++
}

export function resetStorePagination (state) {
  state.storeBuyPageNumber = null
  state.storeBuyTotalPages = null
  state.storeBuyItemsCount = 0
  state.storeBuyListings = []

  state.storeSellPageNumber = null
  state.storeSellTotalPages = null
  state.storeSellItemsCount = 0
  state.storeSellListings = []
}

// ~ store mutations ~ //

// ~ ads mutations ~ //

export function updateAdsBuyListings (state, { overwrite = false, data }) {
  if (overwrite) state.adsBuyListings = []
  state.adsBuyListings.push(...data.ads)
  state.adsBuyTotalPages = data.total_pages
}

export function updateAdsSellListings (state, { overwrite = false, data }) {
  if (overwrite) state.adsSellListings = []
  state.adsSellListings.push(...data.ads)
  state.adsSellTotalPages = data.total_pages
}

export function incAdsBuyPage (state) {
  state.adsBuyPageNumber++
}

export function incAdsSellPage (state) {
  state.adsSellPageNumber++
}

export function resetAdsPagination (state) {
  state.adsBuyPageNumber = null
  state.adsBuyTotalPages = null
  state.adsBuyListings = []

  state.adsSellPageNumber = null
  state.adsSellTotalPages = null
  state.adsSellListings = []
}

// ~ ads mutations ~ //

// ~ orders mutations ~ //

export function updateOngoingOrders (state, { overwrite = false, data }) {
  if (overwrite) state.ongoingOrders = []
  state.ongoingOrders.push(...data.orders)
  // console.log('ongoingOrders:', state.ongoingOrders)
  state.ongoingOrdersTotalPages = data.total_pages
}

export function updateCompletedOrders (state, { overwrite = false, data }) {
  if (overwrite) state.completedOrders = []
  state.completedOrders.push(...data.orders)
  state.completedOrdersTotalPages = data.total_pages
}

export function incOngoingOrdersPage (state) {
  state.ongoingOrdersPageNumber++
}

export function incCompletedOrdersPage (state) {
  state.completedOrdersPageNumber++
}

export function resetOrdersPagination (state) {
  state.ongoingOrdersPageNumber = null
  state.ongoingOrdersTotalPages = null
  state.ongoingOrders = []

  state.completedOrdersPageNumber = null
  state.completedOrdersTotalPages = null
  state.completedOrders = []
}

// ~ orders mutations ~ //

export function resetPagination (state) {
  state.itemsPerPage = 20
  resetStorePagination(state)
  resetAdsPagination(state)
  resetOrdersPagination(state)
}
