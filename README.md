# Vaz & Monteiro Advocacia

Landing page de alta conversão para um escritório de advocacia fictício, criada como peça
de portfólio. Site estático, sem back-end e sem banco de dados: HTML, CSS e JavaScript puros,
prontos para publicar na Vercel com o build padrão.

## O que a página entrega

- Estrutura de conversão em 8 blocos: menu fixo, hero, áreas de atuação, compromisso,
  advogados, como atuamos, formulário qualificador e perguntas frequentes.
- Formulário que monta uma mensagem com nome, área do direito e descrição do caso, e abre o
  WhatsApp do escritório já preenchido.
- Scroll reveal item a item, com `IntersectionObserver` observando cada elemento
  individualmente e atraso escalonado de 0,1s por item, na ida e na volta.
- Estados de hover e foco em todos os elementos interativos.
- Layout mobile-first validado de 375px a 1920px.

## Estrutura do projeto

```
.
├── index.html                  página única, com todo o conteúdo
├── assets/
│   ├── css/styles.css          folha de estilo única, em 15 blocos comentados
│   ├── js/main.js              menu mobile, formulário e scroll reveal
│   └── img/
│       ├── logo-vm.png         monograma bordô, para fundos claros
│       ├── logo-vm-light.png   monograma creme, usado no menu e no rodapé
│       ├── favicon-16/32/48.png
│       ├── apple-touch-icon.png
│       └── og-image.png        prévia para redes sociais, 1200x630
├── favicon.ico
├── robots.txt
└── vercel.json                 cabeçalhos de cache e segurança
```

## Rodando localmente

Qualquer servidor estático serve. Sem dependências e sem etapa de build.

```bash
python3 -m http.server 4173
# abra http://localhost:4173
```

## Publicando na Vercel

1. Importe este repositório na Vercel.
2. Framework Preset: **Other**. Deixe Build Command e Output Directory vazios.
3. Em Settings, Git, aponte a Production Branch para a branch deste projeto.

Cada push na branch de produção gera um novo deploy automaticamente.

## Personalização

| O que mudar | Onde |
| --- | --- |
| Número do WhatsApp | `assets/js/main.js`, constante `WHATSAPP_NUMBER` |
| Cores e espaçamentos | `assets/css/styles.css`, bloco `1. Tokens` |
| Textos, advogados e perguntas | `index.html` |
| Domínio nas metatags sociais | `index.html`, tags `og:image` e `twitter:image` |

O formulário abre o WhatsApp com a mensagem já montada a partir dos campos, e o texto
inclui um aviso de que o escritório é fictício e o site é peça de portfólio.
Depois do primeiro deploy, troque os caminhos de `og:image` e `twitter:image` pela URL
absoluta do domínio, que é o formato que as redes sociais leem com mais confiabilidade.

## Identidade visual

| Token | Valor | Uso |
| --- | --- | --- |
| `--wine` | `#5C2A2E` | destaques, bordas, nomes dos advogados |
| `--wine-dark` | `#3F1C1F` | menu, hero, formulário e rodapé |
| `--green` | `#2F4A3C` | botões de ação |
| `--green-light` | `#8FAE9C` | destaque sobre fundo escuro, foco dos campos |
| `--cream` | `#F7F2EA` | fundo claro principal |
| `--white` | `#FBF9F5` | fundo dos cards e seções alternadas |
| `--ink` | `#2A211D` | texto principal |
| `--muted` | `#6E6058` | texto de apoio |

Títulos em EB Garamond, corpo em Inter, ambas via Google Fonts.

## Acessibilidade

- Contraste conferido par a par: todo texto atinge pelo menos 4,5:1, e as bordas de campos e
  botões atingem 3:1.
- Navegação completa por teclado, com foco visível, link de pular para o conteúdo e menu que
  fecha no `Esc` devolvendo o foco ao botão.
- `prefers-reduced-motion` desliga animações, transições e o scroll suave.
- A página continua legível com JavaScript desativado.

## Verificação

A entrega foi testada em Chromium a 375px, 768px, 1024px, 1440px e 1920px: abertura e
fechamento do menu, montagem da mensagem do WhatsApp, revelação item a item na ida e na
volta, hover de cada elemento interativo, ausência de rolagem horizontal e ausência de erros
de console.
