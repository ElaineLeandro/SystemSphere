const telefoneInput = document.getElementById('telefone');
    
            telefoneInput.addEventListener('input', function(event) {

                const apenasDigitos = this.value.replace(/\D/g, '');
                
                if (apenasDigitos.length > 0) {
                    this.value = apenasDigitos.replace(/^(\d{2})(\d{5})(\d{4}).*/, '$1-$2-$3');
                } else {
                    this.value = '';
                }
            });