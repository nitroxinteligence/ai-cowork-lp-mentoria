# AI COWORK — Paleta de cores da identidade visual

Esta é a paleta oficial da identidade visual da AI COWORK. O sistema é monocromático azul: profundidade, contraste e hierarquia são construídos com diferentes luminosidades e saturações da mesma família cromática.

## 1. Paleta principal

| Cor | Amostra | HEX | RGB | HSL | CMYK aproximado | Função principal |
| --- | --- | --- | --- | --- | --- | --- |
| Navy | 🟦 | `#08254E` | `8, 37, 78` | `215°, 81%, 17%` | `90, 53, 0, 69` | Fundo escuro institucional |
| Sapphire | 🟦 | `#0A4AA6` | `10, 74, 166` | `215°, 89%, 35%` | `94, 55, 0, 35` | Profundidade, sombras e transições |
| Primary Blue | 🟦 | `#176FD1` | `23, 111, 209` | `212°, 80%, 45%` | `89, 47, 0, 18` | Cor principal da marca |
| Steel Blue | 🟦 | `#6E9ED0` | `110, 158, 208` | `211°, 51%, 62%` | `47, 24, 0, 18` | Tons intermediários e superfícies |
| Cyan | 🟦 | `#42C7F5` | `66, 199, 245` | `195°, 90%, 61%` | `73, 19, 0, 4` | Reflexos, brilho e destaques digitais |
| Ice | 🟦 | `#C7E3F1` | `199, 227, 241` | `200°, 60%, 86%` | `17, 6, 0, 5` | Símbolo claro e superfícies suaves |
| Near White | ⬜ | `#F7FBFF` | `247, 251, 255` | `210°, 100%, 98%` | `3, 2, 0, 0` | Fundo claro principal |

> Os valores CMYK são conversões aproximadas. Para impressão crítica, solicitar prova de cor no papel e no processo gráfico escolhidos.

## 2. Cores auxiliares

| Cor | HEX | RGB | HSL | Função |
| --- | --- | --- | --- | --- |
| Deep Navy | `#06172F` | `6, 23, 47` | `215°, 77%, 10%` | Pontos mais profundos de fundos e gradientes |
| Soft Ice | `#EAF4FF` | `234, 244, 255` | `211°, 100%, 96%` | Fundo alternativo azul-claro |
| White | `#FFFFFF` | `255, 255, 255` | `0°, 0%, 100%` | Contraste máximo sobre fundos escuros |
| Black | `#000000` | `0, 0, 0` | `0°, 0%, 0%` | Aplicação estritamente monocromática |

As cores auxiliares sustentam contraste e composição. Elas não devem substituir o Primary Blue como cor reconhecível da marca.

## 3. Hierarquia cromática

### Cor institucional

`#176FD1` — Primary Blue

Use no símbolo em cor sólida, elementos principais da interface, links, destaques e materiais institucionais de uma única cor.

### Cor de fundo escuro

`#08254E` — Navy

Use em capas, apresentações, avatares, seções premium e aplicações que recebem o símbolo branco, Ice ou dimensional.

### Cor de fundo claro

`#F7FBFF` — Near White

Use como substituto do branco puro em interfaces e materiais editoriais. Ele mantém a temperatura fria da identidade.

### Cor de luminosidade

`#42C7F5` — Cyan

Use com moderação nos reflexos do acabamento dimensional, indicadores ativos e pontos de energia visual. Não deve dominar grandes superfícies.

## 4. Gradientes oficiais

### Gradiente institucional escuro

```css
background: linear-gradient(
  135deg,
  #06172F 0%,
  #08254E 34%,
  #0A4AA6 68%,
  #176FD1 100%
);
```

Uso: fundos escuros, apresentações, páginas de lançamento e peças com o símbolo claro.

### Gradiente institucional claro

```css
background: linear-gradient(
  135deg,
  #F7FBFF 0%,
  #C7E3F1 42%,
  #6E9ED0 72%,
  #0A4AA6 100%
);
```

Uso: materiais editoriais, fundos atmosféricos e aplicações do símbolo dimensional.

### Gradiente livre da marca

O fundo principal do logotipo usa um **gradiente livre assimétrico** — também chamado de *freeform gradient* ou *mesh gradient*. A distribuição sugerida é:

- Deep Navy e Navy no topo e no canto superior direito.
- Sapphire e Primary Blue nas áreas intermediárias.
- Steel Blue e Ice no canto inferior esquerdo.
- Transições amplas, suaves e sem faixas visíveis.
- Leve granulação pode ser usada para evitar aparência excessivamente digital.

Esse fundo não deve ser recriado como um gradiente radial perfeitamente centralizado.

## 5. Gradiente metálico do símbolo

O acabamento dimensional pode combinar os seguintes pontos cromáticos:

```css
background: linear-gradient(
  115deg,
  #08254E 0%,
  #0A4AA6 18%,
  #176FD1 36%,
  #42C7F5 55%,
  #C7E3F1 72%,
  #F7FBFF 84%,
  #6E9ED0 100%
);
```

Esse gradiente serve como referência cromática. O acabamento aprovado possui iluminação tridimensional e não deve ser substituído automaticamente por um preenchimento linear simples.

## 6. Combinações recomendadas

| Elemento | Fundo | Contraste aproximado | Uso |
| --- | --- | --- | --- |
| `#FFFFFF` | `#08254E` | `15.16:1` | Máximo contraste institucional |
| `#F7FBFF` | `#08254E` | `14.58:1` | Texto e símbolo claros |
| `#C7E3F1` | `#08254E` | `11.33:1` | Aplicação Ice sobre Navy |
| `#08254E` | `#EAF4FF` | `13.63:1` | Texto e símbolo escuros |
| `#176FD1` | `#FFFFFF` | `4.96:1` | Azul principal sobre branco |
| `#176FD1` | `#F7FBFF` | `4.77:1` | Azul principal sobre Near White |

Os contrastes acima foram calculados em sRGB. As seis combinações atendem ao nível WCAG AA para texto normal. Para textos muito pequenos, finos ou sobre imagens, faça uma verificação específica na composição final.

## 7. Proporção de uso sugerida

- **50% — Near White, Soft Ice ou áreas de respiro:** fundos e espaços negativos.
- **25% — Navy e Deep Navy:** estrutura, contraste e superfícies premium.
- **15% — Primary Blue e Sapphire:** identidade, ações e componentes principais.
- **7% — Steel Blue e Ice:** transições, superfícies secundárias e apoio.
- **3% — Cyan:** brilho, energia e detalhes de alta atenção.

Essa proporção é uma orientação, não uma fórmula rígida. Peças escuras podem inverter o peso entre os fundos claros e Navy.

## 8. Aplicação do logotipo

- **Dimensional:** use sobre gradiente institucional, Navy ou fundos claros pouco contrastados.
- **Azul sólido:** use `#176FD1` sobre branco, Near White ou Soft Ice.
- **Branco sólido:** use `#FFFFFF` ou `#F7FBFF` sobre Navy e Deep Navy.
- **Navy sólido:** use `#08254E` sobre Near White, Soft Ice ou Ice.
- **Preto sólido:** reserve para documentos estritamente monocromáticos.
- **Ice sólido:** use `#C7E3F1` sobre Navy quando a aplicação branca parecer dura demais.

## 9. Usos incorretos

- Não introduzir roxo, magenta, verde, laranja ou outros tons fora da família azul.
- Não usar gradientes arco-íris ou efeitos iridescentes multicoloridos.
- Não aplicar Cyan como cor dominante de grandes superfícies.
- Não colocar o símbolo Primary Blue sobre Sapphire ou Steel Blue sem contraste suficiente.
- Não usar preto puro como fundo institucional principal quando Navy estiver disponível.
- Não misturar cinza metálico com azul no símbolo principal.
- Não alterar isoladamente as cores das duas órbitas ou da estrela central.

## 10. Tokens digitais

```css
:root {
  --ai-cowork-deep-navy: #06172F;
  --ai-cowork-navy: #08254E;
  --ai-cowork-sapphire: #0A4AA6;
  --ai-cowork-primary: #176FD1;
  --ai-cowork-steel: #6E9ED0;
  --ai-cowork-cyan: #42C7F5;
  --ai-cowork-ice: #C7E3F1;
  --ai-cowork-soft-ice: #EAF4FF;
  --ai-cowork-near-white: #F7FBFF;
  --ai-cowork-white: #FFFFFF;
  --ai-cowork-black: #000000;
}
```

## 11. Referência rápida

```text
Deep Navy     #06172F
Navy          #08254E
Sapphire      #0A4AA6
Primary Blue  #176FD1
Steel Blue    #6E9ED0
Cyan          #42C7F5
Ice           #C7E3F1
Soft Ice      #EAF4FF
Near White    #F7FBFF
White         #FFFFFF
Black         #000000
```
