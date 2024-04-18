                const telefoneInput = document.getElementById('telefone');

            telefoneInput.addEventListener('input', function(event) {
                const apenasDigitos = this.value.replace(/\D/g, '');
                
                if (apenasDigitos.length > 0) {
                    this.value = apenasDigitos.replace(/^(\d{2})(\d{5})(\d{4}).*/, '$1-$2-$3');
                } else {
                    this.value = '';
                }
            });
            
            document.addEventListener("DOMContentLoaded", function() {
                const formulario = document.getElementById("formulario");
                const salvarInfoCheckbox = document.getElementById("salvar_info");
                const confirmarEnvioBtn = document.getElementById("confirmarEnvio");
        
                // Função para salvar os dados no localStorage
                function salvarDadosLocalStorage() {
                    const dados = {
                        nome: formulario.nome.value,
                        nome_empresa: formulario.nome_empresa.value,
                        endereco: formulario.endereco.value,
                        complemento: formulario.complemento.value,
                        cidade: formulario.cidade.value,
                        telefone: formulario.telefone.value,
                        email: formulario.email.value
                    };
                    localStorage.setItem("dadosFaturamento", JSON.stringify(dados));
                    console.log("Dados salvos no localStorage.");
                }
        
                confirmarEnvioBtn.addEventListener("click", function() {
                    if (salvarInfoCheckbox.checked) {
                        salvarDadosLocalStorage();
                    }
                    enviarFormulario();
                });
        
                function enviarFormulario() {
                    console.log("Formulário enviado!");
                }
        
                // Verifica se há dados salvos no localStorage ao carregar a página
                if (localStorage.getItem("dadosFaturamento")) {
                    const dadosSalvos = JSON.parse(localStorage.getItem("dadosFaturamento"));
                    formulario.nome.value = dadosSalvos.nome;
                    formulario.nome_empresa.value = dadosSalvos.nome_empresa;
                    formulario.endereco.value = dadosSalvos.endereco;
                    formulario.complemento.value = dadosSalvos.complemento;
                    formulario.cidade.value = dadosSalvos.cidade;
                    formulario.telefone.value = dadosSalvos.telefone;
                    formulario.email.value = dadosSalvos.email;
                    // Marca a opção "Salvar informações" como selecionada
                    salvarInfoCheckbox.checked = true;
                }
            });
        

