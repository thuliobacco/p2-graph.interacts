let cenarios = [];
let selecionado = 0;

function setup() {
  createCanvas(1000, 650);

  // Cada cenário representa uma política simulada:
  // risco = inadimplência financeira esperada (%)
  // retorno = retorno financeiro esperado (R$ mi)
  cenarios = [
    {
      nome: "Cenário 1",
      risco: 1.5,
      retorno: 18,
      comentario: "Baixo risco, mas retorno limitado."
    },
    {
      nome: "Cenário 2",
      risco: 3.8,
      retorno: 37,
      comentario: "Crescimento moderado com risco controlado."
    },
    {
      nome: "Cenário 3",
      risco: 6.3,
      retorno: 52,
      comentario: "Bom equilíbrio entre risco e retorno."
    },
    {
      nome: "Cenário 4",
      risco: 8.7,
      retorno: 76,
      comentario: "Retorno alto, com maior exposição ao risco."
    },
    {
      nome: "Cenário 5",
      risco: 10.9,
      retorno: 80,
      comentario: "Retorno elevado, porém com risco mais alto."
    }
  ];
}

function draw() {
  background(250);

  desenharGrafico();
  desenharPontos();
  desenharPainel();
  desenharInstrucao();
}

function desenharGrafico() {
  // Área do gráfico
  let x0 = 100;
  let y0 = 520;
  let largura = 560;
  let altura = 380;

  stroke(0);
  strokeWeight(2);

  // Eixo Y
  line(x0, y0, x0, y0 - altura);

  // Eixo X
  line(x0, y0, x0 + largura, y0);

  // Setas dos eixos
  line(x0, y0 - altura, x0 - 8, y0 - altura + 15);
  line(x0, y0 - altura, x0 + 8, y0 - altura + 15);

  line(x0 + largura, y0, x0 + largura - 15, y0 - 8);
  line(x0 + largura, y0, x0 + largura - 15, y0 + 8);

  noStroke();
  fill(0);
  textSize(24);
  textAlign(CENTER);

  // Títulos dos eixos
  text("Risco (%)", x0 + largura / 2, y0 + 70);

  textAlign(LEFT);
  text("Retorno (R$)", x0 - 60, y0 - altura - 35);

  // Marcações eixo X
  textSize(18);
  textAlign(CENTER);
  for (let i = 0; i <= 12; i += 2) {
    let x = map(i, 0, 12, x0, x0 + largura);
    stroke(0);
    strokeWeight(1.5);
    line(x, y0 - 6, x, y0 + 6);

    noStroke();
    fill(0);
    text(i, x, y0 + 30);
  }

  // Marcações eixo Y
  textAlign(RIGHT);
  for (let i = 0; i <= 80; i += 20) {
    let y = map(i, 0, 80, y0, y0 - altura);
    stroke(0);
    strokeWeight(1.5);
    line(x0 - 6, y, x0 + 6, y);

    noStroke();
    fill(0);

    if (i === 0) {
      text("0", x0 - 25, y + 6);
    } else {
      text(i + " mi", x0 - 25, y + 6);
    }
  }
}

function desenharPontos() {
  let x0 = 100;
  let y0 = 520;
  let largura = 560;
  let altura = 380;

  for (let i = 0; i < cenarios.length; i++) {
    let c = cenarios[i];

    let x = map(c.risco, 0, 12, x0, x0 + largura);
    let y = map(c.retorno, 0, 80, y0, y0 - altura);

    if (i === selecionado) {
      // Destaque do cenário selecionado
      stroke(0, 90, 200);
      strokeWeight(3);
      fill(90, 170, 255);
      ellipse(x, y, 46, 46);

      // Pequenas linhas ao redor do ponto destacado
      stroke(0, 90, 200);
      strokeWeight(2);
      for (let a = 0; a < TWO_PI; a += PI / 4) {
        let x1 = x + cos(a) * 34;
        let y1 = y + sin(a) * 34;
        let x2 = x + cos(a) * 45;
        let y2 = y + sin(a) * 45;
        line(x1, y1, x2, y2);
      }
    } else {
      // Pontos comuns
      stroke(0);
      strokeWeight(2);
      fill(255);
      ellipse(x, y, 20, 20);
    }
  }
}

function desenharPainel() {
  let c = cenarios[selecionado];

  let x = 720;
  let y = 210;
  let w = 230;
  let h = 190;

  // Caixa lateral
  stroke(0);
  strokeWeight(2);
  fill(255);
  rect(x, y, w, h, 12);

  // Título
  noStroke();
  fill(0, 75, 180);
  textSize(24);
  textAlign(LEFT);
  text("Cenário selecionado", x + 20, y + 45);

  stroke(0, 75, 180);
  strokeWeight(2);
  line(x + 20, y + 55, x + 205, y + 55);

  // Informações
  noStroke();
  fill(0);
  textSize(20);
  text("Risco: " + c.risco.toFixed(1).replace(".", ",") + "%", x + 20, y + 95);
  text("Retorno: R$ " + c.retorno + " mi", x + 20, y + 130);

  textSize(17);
  text("Comentário:", x + 20, y + 165);

  textSize(15);
  text(c.comentario, x + 20, y + 185, w - 35, 60);
}

function desenharInstrucao() {
  noStroke();
  fill(0);
  textSize(20);
  textAlign(LEFT);
  text("* Cada clique destaca o próximo cenário.", 720, 155);
}

function mousePressed() {
  selecionado++;

  if (selecionado >= cenarios.length) {
    selecionado = 0;
  }
}