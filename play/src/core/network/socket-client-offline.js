// =====================================================================
// DBO IDLE - SocketClient da build estatica.
//
// Mantem a mesma superficie publica do socket-client.js original, mas
// sem rede: nao abre WebSocket, nao tenta reconectar e nao envia nada.
// Os sistemas que dependem de outros jogadores (presenca, chat, party,
// PvP, trade, guild boss) ficam inertes; o restante do jogo, que roda
// no cliente, continua funcionando normalmente.
// =====================================================================
export class SocketClient {
  constructor(handlers = {}) {
    this.handlers = handlers || {};
    this.connected = false;
    this.offline = true;
  }

  connect() {
    // Lista de jogadores online sempre vazia, em vez de indefinida.
    this.handlers.onPresence?.([]);
    return this;
  }

  disconnect() {}
  send() {}
  sendPosition() {}
  sendAppearance() {}
  sendChat() {}
  dropGround() {}
  pickupGround() {}
  sendGameAction() {}
  sendPartyAction() {}
  sendTradeAction() {}
  sendPvpAction() {}
  sendGuildBossTaunt() {}
  sendClientLayout() {}
  sendClientPreferences() {}
  requestCharacterProfile() {}
  requestCharacterExit() { return Promise.resolve({ok: true, offline: true}); }
}
