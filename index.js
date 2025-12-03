$(document).ready(()=>{
    var cursor = $('.cursor');
    var number = $('.number');
    var visor = $('.visor');
    var operacao;
    var active = false;
    var numero1;
    var numero2;
    var resultado;

    //NUMEROS E VIRGULA
    number.on('click',function(){
       let digitado = $(this).attr('dataref');
       let val = visor.html()
       let valor;
       digitado = digitado == "VIRGULA" ? "," : digitado;
        if(!active){
            if(val == 0){
                valor = digitado == "," ? '0'+digitado : digitado;
               }else{
                valor = val+digitado;
               }
            numero1 = valor;
        }else{
            if(numero2 == 0 || numero2 == "" || numero2 == undefined){
                valor = digitado == ',' ? '0'+digitado : digitado;
               }else{
                valor = val+digitado;
               }
            numero2 = valor;
        }
        visor.html(valor);
    });

    //BOTÕES QUE REALIZAM OPERAÇÕES MATEMATICAS
    cursor.on('click',function(){
        op = $(this).attr('dataref');
        cursor.removeClass("active")
        switch(op){
            case 'AC' : 
                ajustarCalculadora(0,"");
            break;
            case 'ADICAO' :
                $(this).addClass("active")
                if(numero2 == "" || numero2 == undefined || numero2 == 0){
                    operacao = "+"; 
                    active = true;     
                }else{
                    let result = calcular(numero1,numero2,operacao);
                    ajustarCalculadora(result,"+")
                }
            break;
            case 'SUBTRACAO' :  
            $(this).addClass("active")
                if(numero2 == "" || numero2 == undefined || numero2 == 0){
                    operacao = "-"; 
                    active = true;     
                }else{
                    let result = calcular(numero1,numero2,operacao);
                    ajustarCalculadora(result,"-"); 
                }
            break;
            case 'MULTIPLICACAO' :  
            $(this).addClass("active")
                if(numero2 == "" || numero2 == undefined || numero2 == 0){
                    operacao = "*"; 
                    active = true;     
                }else{
                    let result = calcular(numero1,numero2,operacao);
                    ajustarCalculadora(result,"*"); 
                }
            break;
            case 'DIVISAO' :  
            $(this).addClass("active")
                if(numero2 == "" || numero2 == undefined || numero2 == 0){
                    operacao = "/"; 
                    active = true;     
                }else{
                    let result = calcular(numero1,numero2,operacao);
                    ajustarCalculadora(result,"/"); 
                }
            break;
            case 'IGUAL' :  
                $(this).addClass("active")
                if(operacao == "" || operacao == undefined ){
                    return false;
                }
                if(numero1 == "" || numero1 == undefined || numero2 == "" || numero2 == undefined){
                    numero1 = numero2 = 0;
                    visor.html(0)
                }
                let result = calcular(numero1,numero2,operacao);
                ajustarCalculadora(result,"",false); 
                
            break;
            case 'PERCENTUAL' :
                let num1 = numero1.toString().replace(",",".");
                let num2 = numero2.toString().replace(",",".");
                if(active){
                    if(operacao == "+" || operacao == "-"){
                        numero2 = (num2 * num1)/100
                    }
                    if(operacao == "*" || operacao == '/'){
                        numero2 = num2/100;
                    }
                    visor.html(numero2.toString().replace(".",","));
                }else{
                    numero1 = num1/100
                    visor.html(numero1);
                }
            break;
        }
    });


    function calcular(a,b,op){
        num1 = a.toString().replace(',','.');
        num2 = b.toString().replace(',','.');
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);
        let result;
        switch(op){
            case "+" :
                result = (num1 + num2).toString().replace('.',',');
            break;
            case "-" :
                result = (num1 - num2).toString().replace('.',',');
            break;    
            case "*" :
                result = (num1 * num2).toString().replace('.',',');
            break;
            case "/" :
                result = (num1 / num2).toString().replace('.',',');
            break;
        }

        let count = result.length;
        if(count > 14){
            dif = count - 14;
            result = result.substr(0,11)+"e"+dif;
        }
        return result;
    }

    function ajustarCalculadora(result,operacao,status=true){
        numero1 = result;
        numero2 = 0;
        resultado = result;
        visor.html(numero1);
        operacao = operacao;
        if(status == false){
            active = false;
        }
    }
});