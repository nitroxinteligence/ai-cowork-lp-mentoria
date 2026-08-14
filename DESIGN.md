---
name: AI COWORK
description: IA trabalhando com você e para você.
colors:
  black: "#000000"
  deep-navy: "#06172F"
  navy: "#08254E"
  sapphire: "#0A4AA6"
  primary-blue: "#176FD1"
  steel-blue: "#6E9ED0"
  cyan: "#42C7F5"
  ice: "#C7E3F1"
  soft-ice: "#EAF4FF"
  near-white: "#F7FBFF"
  white: "#FFFFFF"
  ink: "#071529"
typography:
  display:
    fontFamily: "Spline Sans, sans-serif"
    fontSize: "clamp(3rem, 7vw, 5.75rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Spline Sans, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 4.5rem)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Spline Sans, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "-0.01em"
  label:
    fontFamily: "Spline Sans, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.02em"
rounded:
  sm: "8px"
  md: "12px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "40px"
  xl: "72px"
components:
  button-primary:
    backgroundColor: "{colors.primary-blue}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "16px 24px"
  button-light:
    backgroundColor: "{colors.white}"
    textColor: "{colors.navy}"
    rounded: "{rounded.pill}"
    padding: "16px 24px"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "14px 16px"
---

# Design System: AI COWORK

## Overview

**Creative North Star: "Clareza Operacional"**

A página parece um documento executivo preciso, construído para um profissional experiente entender uma proposta complexa sem ruído. O hero preto concentra a promessa e acomoda o vídeo ao lado da copy; as seções brancas oferecem leitura, raciocínio e respiro. A tecnologia aparece como fluxo, coordenação e capacidade, nunca como robô, cérebro digital ou decoração de ficção científica.

O sistema combina precisão corporativa com composição mínima. O hero permanece preto puro e sem glow. A mesh azul da marca existe apenas no rodapé, sobre uma base preta. O humano é sempre o ponto de direção e aprovação. Se um elemento não melhora compreensão, hierarquia ou ação, ele é removido.

**Key Characteristics:**

- contraste estrutural entre preto puro e branco;
- hierarquia tipográfica forte com uma única família técnica e legível;
- fluxos visuais que explicam coordenação, não cards que decoram;
- movimento limitado a feedback e transições essenciais;
- seleção premium sem ostentação ou urgência artificial.

**The Reduction Rule.** Cada seção sustenta uma ideia dominante. Ornamentação sem função, animação de rolagem e preenchimento visual são proibidos.

## Colors

A identidade é monocromática azul, construída por profundidade, luminosidade e contraste frio.

### Primary

- **Primary Blue:** ações principais, estados ativos e pequenos pontos de reconhecimento da marca.
- **Cyan:** energia luminosa rara em cursores, conexões e foco; nunca domina uma superfície grande.

### Secondary

- **Sapphire:** transição entre profundidade institucional e ação.
- **Steel Blue:** informação secundária, linhas de fluxo e superfícies intermediárias.

### Neutral

- **Black:** fundo integral do hero e base integral do rodapé.
- **Deep Navy:** modal e regiões funcionais de profundidade.
- **Navy:** superfícies escuras institucionais e elementos estruturais.
- **Near White:** fundo dominante das seções de leitura.
- **Soft Ice:** diferenciação tonal suave sem recorrer a cinza genérico.
- **Ink:** texto principal em superfícies claras.

**The Cold Spectrum Rule.** Roxo, magenta, verde, laranja e gradientes arco-íris são proibidos. A variação nasce exclusivamente da família azul aprovada.

**The Cyan Rarity Rule.** Cyan ocupa pequenos pontos de atenção e a mesh do rodapé. Se ele virar fundo dominante de uma seção, a identidade perde profundidade.

## Typography

**Display Font:** Spline Sans (com fallback `sans-serif`)
**Body Font:** Spline Sans (com fallback `sans-serif`)

**Character:** uma grotesca compacta criada para interfaces e parágrafos, com cortes discretamente técnicos que aparecem nos tamanhos grandes. A única família cria unidade; peso, escala, largura e ritmo fazem a hierarquia.

### Hierarchy

- **Display** (400, `clamp(2.25rem, 4.4vw, 4.15rem)`, 1.1): apenas no hero, com entrelinha mais aberta e escala responsiva.
- **Headline** (400, `clamp(2.25rem, 5vw, 4.5rem)`, 1.02): abertura das seções narrativas.
- **Title** (400, 1.25–1.75rem, 1.15): encontros, agrupamentos e decisões.
- **Body** (400, 1.0625rem, 1.65): texto corrido limitado a 68ch.
- **Label** (600, 0.8125rem, 0.02em): metadados e controles curtos; caixa alta não é padrão.

**The Legibility Before Tech Rule.** A sensação tecnológica vem da forma, do ritmo e dos detalhes da Spline Sans. Nunca sacrificar leitura com mono, tracking excessivo ou pesos finos.

## Elevation

O sistema é plano por padrão. Profundidade nasce de composição tonal, sobreposição controlada e mesh atmosférica. Sombras aparecem somente em elementos realmente elevados, como modal e controle flutuante; cartões de conteúdo não recebem a combinação clichê de borda clara com sombra larga.

### Shadow Vocabulary

- **Modal:** `0 24px 72px rgba(6, 23, 47, 0.24)` para separar a candidatura do documento.
- **Pressed control:** `0 4px 8px rgba(6, 23, 47, 0.16)` apenas durante interação.

**The Flat-Until-Lifted Rule.** Superfícies editoriais permanecem planas; sombra significa elevação funcional real.

## Components

### Buttons

- **Shape:** cápsula precisa (`999px`), com altura mínima de 52px.
- **Primary:** Primary Blue sobre branco em fundos claros; branco sobre Navy no hero.
- **Hover / Focus:** deslocamento máximo de 2px, mudança tonal e foco de alto contraste; resposta imediata em `pointer-down`.
- **Secondary:** texto e seta, sem caixa decorativa quando a hierarquia não exige um botão preenchido.

### Cards / Containers

- **Corner Style:** cantos discretos de 12px apenas quando existe agrupamento funcional.
- **Background:** Near White, White, Soft Ice ou Navy conforme a região.
- **Shadow Strategy:** sem sombra em repouso.
- **Border:** divisão tonal ou linha de 1px; nunca listra lateral colorida.
- **Internal Padding:** escala fluida de 24–40px.

### Inputs / Fields

- **Style:** coluna única, rótulo persistente, fundo branco, raio de 8px e borda azul-acinzentada.
- **Focus:** anel Primary Blue de 3px com contraste garantido.
- **Error / Disabled:** mensagem específica junto ao campo; cor nunca é o único indicador.

### Navigation

Cabeçalho mínimo sobre o hero: placeholder do logo, três âncoras e candidatura. Ao entrar na segunda seção, reaparece como uma cápsula flutuante translúcida. Em mobile, mantém apenas marca e CTA; não cria menu hambúrguer para tão poucos destinos.

### Workstream

Visualização autoral de especialistas digitais conectados em sequência. O fluxo mostra pesquisa, análise, estratégia, construção e crivo humano, com movimento lento e reduzível. Não imita o logotipo.

## Do's and Don'ts

### Do:

- **Do** preservar as cinco seções canônicas e a copy aprovada.
- **Do** usar `#000000` no hero e como base do rodapé; todas as seções intermediárias usam `#FFFFFF`.
- **Do** representar automação com direção, contexto e aprovação humana visíveis.
- **Do** limitar texto corrido a 68ch e oferecer forte ritmo entre blocos longos.
- **Do** respeitar redução de movimento e transparência.

### Don't:

- **Don't** inserir o logotipo antes de autorização; use placeholder textual claramente marcado.
- **Don't** usar página genérica de curso de IA baseada em hype, neon, robôs, cérebros digitais ou “prompt secreto”.
- **Don't** usar landing page SaaS composta por grids repetitivos de cartões, métricas hero e gradientes roxos.
- **Don't** usar estética de terminal, fonte mono ou linguagem de desenvolvedor como fantasia de tecnologia.
- **Don't** usar gradiente em texto, listras laterais coloridas, glassmorphism decorativo ou cartões com raio acima de 16px.
- **Don't** prometer automação total, resultado financeiro ou autoridade que não esteja documentada.
