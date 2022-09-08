const operacaoAnteriorText = document.querySelector("#operacao-anterior")
const atualOperacaoText = document.querySelector("#atual-operacao")
const botoes = document.querySelectorAll("#botoes-container button")

class Calculator {
 constructor(operacaoAnteriorText, atualOperacaoText){
 	this.operacaoAnteriorText = operacaoAnteriorText
 	this.atualOperacaoText = atualOperacaoText
 	this.atualOperacao = ""
 }

//adicionar dígito à tela da calculadora
 adicionarDigito(digit){
 	// verifique se a operação atual já tem um ponto

 	if(digit === "." && this.atualOperacaoText.innerText.includes(".")){
 		return;
 	}


 	this.atualOperacao = digit
 	this.atualizarTela()

 }


 //processar todas as operações da calculadora

 operacaoProcesso(operation){
 	//verifique se a corrente está vazia
 	if(this.atualOperacaoText.innerText === "" && operation !== "C"){
 		// change operation
 		if(this.operacaoAnteriorText.innerText !== ""){
 			this.operacaoMudanca(operation)

 		}	
 		return;
 	}


	 	
	//obter valor atual e anterior
	let valorOperacao
	const anterior = +this.operacaoAnteriorText.innerText.split(" ") [0];
	const atual = +this.atualOperacaoText.innerText;

	switch (operation){
		case "+":
			valorOperacao = anterior + atual;
			this.atualizarTela(valorOperacao, operation, atual, anterior);
		break;
		case "-":
			valorOperacao = anterior - atual;
			this.atualizarTela(valorOperacao, operation, atual, anterior);
		break;
		case "/":
			valorOperacao = anterior / atual;
			this.atualizarTela(valorOperacao, operation, atual, anterior);
		break;
		case "*":
			valorOperacao = anterior * atual;
			this.atualizarTela(valorOperacao, operation, atual, anterior);
		break;
		case "DEL":
			this.processoDeletarOperacao();
		break;
		case "CE":
			this.processoLimparOperacaoAtual();
		break;
		case "C":
			this.processoLimparOperacao();
		break;
		case "=":
			this.processoOperacaoIgual();
		break;
		default:
		return;
	}

 }

//alterar valores da tela da calculadora

atualizarTela(valorOperacao = null,
  operation = null,
  atual = null,
  anterior = null
  ){



	if(valorOperacao === null) {
	this.atualOperacaoText.innerText += this.atualOperacao;
} else {
	//verifique se o valor é zero se for apenas adicionar o valor atual
	if(anterior === 0 ){
		valorOperacao = atual
	}
	// adicionar valor atual ao anterior
	this.operacaoAnteriorText.innerText = `${valorOperacao} ${operation}`;
	this.atualOperacaoText.innerText = "";
}
}

//alterar operação matemática
operacaoMudanca(operation){

const mathOperations = ["*", "/", "+", "-"]
	
	if(!mathOperations.includes(operation)){
		return
	}
 this.operacaoAnteriorText.innerText = this.operacaoAnteriorText.innerText.slice(0 ,-1) + operation;
}
//Excluir o último dígito
processoDeletarOperacao(){
	this.atualOperacaoText.innerText = this.atualOperacaoText.innerText.slice(0, -1);
}

//limpar operação atual
processoLimparOperacaoAtual (){
	this.atualOperacaoText.innerText = "";
}

// limpar todas as operações
processoLimparOperacao (){
	this.atualOperacaoText.innerText = "";
	this.operacaoAnteriorText.innerText = "";
}
//processar uma operação
processoOperacaoIgual(){

const operation = operacaoAnteriorText.innerText.split(" ")[1]

	this.operacaoProcesso(operation);

}
}

const calc = new Calculator(operacaoAnteriorText, atualOperacaoText);

botoes.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		const value = e.target.innerText;

		if(+value >= 0 || value === "."){
			calc.adicionarDigito(value)
		}else {
			calc.operacaoProcesso(value);
		}
	})
})







