# DBO IDLE — versão jogável

Versão estática do DBO IDLE, um RPG idle de navegador inspirado em Dragon Ball Online. Roda inteira no cliente, sem backend.

**[▶ Jogar](https://alanfmf.github.io/dbo-idle-play/play/)** · [Wiki](https://alanfmf.github.io/dbo-idle-play/wiki/) · [Estudo de caso técnico](https://github.com/AlanFMF/dbo-idle-showcase)

## O que é isto

O jogo funcionou por 15 dias como piloto fechado em uma VPS, com Node.js, PostgreSQL e WebSocket. Encerrado o piloto, o cliente foi convertido para rodar sozinho no navegador e publicado aqui, para que o projeto continue jogável sem custo de servidor.

O que muda sem backend:

| Sistema | Nesta versão |
|---|---|
| Conta e personagem | Criados normalmente, guardados no `localStorage` do navegador |
| Verificação por e-mail | Não existe: qualquer código de 6 dígitos conclui o cadastro |
| Hunts, combate, transformações, inventário, forja, bestiário, quests, treino | Funcionam, simulados no próprio cliente |
| Market, guilda, party, PvP, rankings, loja VIP, pagamentos | Indisponíveis — dependiam do servidor autoritativo |

Como o progresso vive no navegador, limpar os dados do site apaga a conta, e não há sincronização entre dispositivos.

## Estrutura

| Caminho | Conteúdo |
|---|---|
| `index.html`, `landing-assets/` | Página inicial |
| `play/` | Cliente do jogo — `src/` com o código, `assets/` e `generated/` com arte e catálogos |
| `wiki/` | Wiki estática: vocações, hunts, bosses, itens, transformações |
| `aplicar-modo-offline.ps1` | Script que converteu a build online nesta versão estática |

## Rodar localmente

O cliente usa ES Modules, então precisa de um servidor HTTP — abrir o `index.html` pelo `file://` não funciona.

```bash
npx --yes serve -l 8080
# http://localhost:8080/play/
```

A landing e a wiki usam caminhos absolutos com o prefixo `/dbo-idle-play/`, que é onde o GitHub Pages publica este repositório. Localmente elas só funcionam se a pasta for servida sob esse mesmo caminho; o jogo em `play/` usa caminhos relativos e roda em qualquer lugar.

Se um dia o site mudar de endereço — outro repositório ou um domínio próprio — basta um find-and-replace de `/dbo-idle-play/` nos arquivos da raiz e da wiki.

## Aviso

Projeto independente de fã, sem fins comerciais e sem vínculo oficial com as franquias que serviram de inspiração. Este repositório distribui o cliente completo, incluindo arte de terceiros — leia o [`NOTICE.md`](NOTICE.md) antes de reaproveitar qualquer coisa daqui.
