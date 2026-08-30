const ACCOUNTS_KEY = 'dbo-idle-mock-accounts-v1';
const SESSION_KEY = 'dbo-idle-mock-session-v1';
const MAX_CHARACTERS = 10;
const NICKNAME_PATTERN = /^[A-Za-z ]+$/;

function readAccounts() {
  try {
    const value = JSON.parse(localStorage.getItem(ACCOUNTS_KEY));
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function writeAccounts(accounts) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

export function validateNickname(value, account = null) {
  const nickname = String(value || '').trim().replace(/\s+/g, ' ');
  if (nickname.length < 3 || nickname.length > 16) {
    return {ok:false, message:'O nickname deve ter entre 3 e 16 caracteres.'};
  }
  if (!NICKNAME_PATTERN.test(nickname)) {
    return {
      ok:false,
      message:'Use somente letras sem acentos e espaços.'
    };
  }
  if (
    account?.characters?.some(character =>
      character.profile.name.toLowerCase() === nickname.toLowerCase()
    )
  ) {
    return {ok:false, message:'Já existe um personagem com esse nickname.'};
  }
  return {ok:true, nickname};
}

export function createMockAccount(email, password) {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  const normalizedPassword = String(password || '');
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(normalizedEmail)) {
    return {ok:false, message:'Informe um e-mail válido.'};
  }
  if (normalizedPassword.length < 4) {
    return {ok:false, message:'A senha de demonstração deve ter ao menos 4 caracteres.'};
  }

  const accounts = readAccounts();
  if (accounts.some(account => account.email === normalizedEmail)) {
    return {ok:false, message:'Esta conta já existe.'};
  }

  const account = {
    id: crypto.randomUUID?.() || `account-${Date.now()}`,
    email: normalizedEmail,
    password: normalizedPassword,
    characters: [],
    activeCharacterId: null,
    createdAt: Date.now()
  };
  accounts.push(account);
  writeAccounts(accounts);
  localStorage.setItem(SESSION_KEY, account.id);
  return {ok:true, account};
}

export function loginMockAccount(email, password) {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  const account = readAccounts().find(entry =>
    entry.email === normalizedEmail &&
    entry.password === String(password || '')
  );
  if (!account) {
    return {ok:false, message:'E-mail ou senha inválidos.'};
  }
  localStorage.setItem(SESSION_KEY, account.id);
  return {ok:true, account};
}

export function logoutMockAccount() {
  localStorage.removeItem(SESSION_KEY);
}

export function currentMockAccount() {
  const id = localStorage.getItem(SESSION_KEY);
  if (!id) return null;
  return readAccounts().find(account => account.id === id) || null;
}

export function saveMockAccount(account) {
  const accounts = readAccounts();
  const index = accounts.findIndex(entry => entry.id === account.id);
  if (index < 0) accounts.push(account);
  else accounts[index] = account;
  writeAccounts(accounts);
}

export function addCharacterToAccount(account, characterState) {
  if (account.characters.length >= MAX_CHARACTERS) {
    return {ok:false, message:'A conta já possui 10 personagens.'};
  }
  const validation = validateNickname(characterState.profile.name, account);
  if (!validation.ok) return validation;

  characterState.profile.name = validation.nickname;
  account.characters.push(characterState);
  account.activeCharacterId = characterState.profile.id;
  saveMockAccount(account);
  return {ok:true, character:characterState};
}

export function removeCharacterFromAccount(account, characterId) {
  const before = account.characters.length;
  account.characters = account.characters.filter(character =>
    character.profile.id !== characterId
  );

  if (account.characters.length === before) {
    return {ok:false, message:'O personagem não foi encontrado.'};
  }

  if (account.activeCharacterId === characterId) {
    account.activeCharacterId =
      account.characters[0]?.profile.id || null;
  }

  saveMockAccount(account);
  return {ok:true};
}

export function selectAccountCharacter(account, characterId) {
  const character = account.characters.find(entry =>
    entry.profile.id === characterId
  );
  if (!character) return null;
  account.activeCharacterId = characterId;
  saveMockAccount(account);
  return character;
}

export function updateAccountCharacter(account, state) {
  const index = account.characters.findIndex(character =>
    character.profile.id === state.profile.id
  );
  if (index < 0) account.characters.push(state);
  else account.characters[index] = state;
  account.activeCharacterId = state.profile.id;
  saveMockAccount(account);
}

export const mockAccountLimits = {
  maxCharacters: MAX_CHARACTERS,
  nicknameMaxLength: 16
};
