2. Crie uma rota /calculadora que receba os parâmetros via query:
operacao (valores possíveis: soma, subtracao, multiplicacao, divisao);
numUm e numDois (números para operação);
A rota deve processar os parâmetros e retornar o resultado da operação solicitada.

GET /calculadora?operacao=soma&numUm=4&numDois=6 → Retorna Resultado: 10