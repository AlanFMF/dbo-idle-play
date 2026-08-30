# =====================================================================
# DBO IDLE - aplica o modo offline na copia estatica.
# Rode a partir da pasta que contem play\  (o web root).
# Cada arquivo alterado ganha um backup *.online-bak na primeira vez.
# Pode ser executado mais de uma vez sem duplicar alteracoes.
# =====================================================================
$ErrorActionPreference = 'Stop'
$raiz = Split-Path -Parent $MyInvocation.MyCommand.Path
$src  = Join-Path $raiz 'play\src'
$main = Join-Path $src  'main.js'
$app  = Join-Path $src  'app\app.js'
$utf8 = New-Object System.Text.UTF8Encoding $false

foreach ($f in @($main, $app)) {
  if (-not (Test-Path $f)) { throw "Nao encontrei: $f" }
  $bak = "$f.online-bak"
  if (-not (Test-Path $bak)) { Copy-Item $f $bak }
}

# ---------------------------------------------------------------- main.js
$t = [System.IO.File]::ReadAllText($main)

# 1) contas: servidor -> localStorage
$t = $t -replace 'core/accounts/server-accounts\.js', 'core/accounts/local-accounts.js'

# 2) sem checagem de versao contra /api/version
if ($t -notmatch 'build estatica: nao existe servidor') {
  $t = $t -replace 'async function checkForServerUpdate\(\)\{',
                   "async function checkForServerUpdate(){`r`n  return; // build estatica: nao existe servidor"
}
[System.IO.File]::WriteAllText($main, $t, $utf8)

# ----------------------------------------------------------------- app.js
$t = [System.IO.File]::ReadAllText($app)

# 3) multiplayer: socket real -> stub inerte
$t = $t -replace 'core/network/socket-client\.js', 'core/network/socket-client-offline.js'

# 4) religa a simulacao de Hunt no navegador.
#    O loop local foi desativado quando a autoridade passou para o servidor,
#    porque os dois rodando juntos causavam rollback e jitter nos monstros.
#    Sem servidor, nao ha segundo loop: o do navegador volta a ser o unico.
$t = $t -replace 'shouldTick:\s*\(\)\s*=>\s*false',
                 'shouldTick: () => true /* build estatica: simulacao no navegador */'

[System.IO.File]::WriteAllText($app, $t, $utf8)

# ---------------------------------------------------------------- resumo
$m = [System.IO.File]::ReadAllText($main)
$a = [System.IO.File]::ReadAllText($app)
Write-Host ""
Write-Host "Estado apos aplicar:" -ForegroundColor Cyan
Write-Host ("  contas locais .......... " + $(if ($m -match 'local-accounts\.js')            {'OK'} else {'FALHOU'}))
Write-Host ("  sem /api/version ....... " + $(if ($m -match 'nao existe servidor')            {'OK'} else {'FALHOU'}))
Write-Host ("  socket inerte .......... " + $(if ($a -match 'socket-client-offline\.js')      {'OK'} else {'FALHOU'}))
Write-Host ("  simulacao religada ..... " + $(if ($a -match 'shouldTick:\s*\(\)\s*=>\s*true') {'OK'} else {'FALHOU'}))
Write-Host ""
Write-Host "Backups: *.online-bak" -ForegroundColor DarkGray
Write-Host "Teste:   npx --yes serve -l 8080   ->   http://localhost:8080/play/"
