// Função para renderizar o menu com base no estado de autenticação
function renderMenu() {
    const headerBtn = document.querySelector('.header-btn.d-none.f-right.d-lg-block');
  
    // Verifique se o cookie 'isUserLoggedIn' existe
    const isUserLoggedIn = document.cookie.includes('isUserLoggedIn=true');
  
    if (isUserLoggedIn) {
      // Se o usuário estiver logado, renderize o menu com o link para o painel
      headerBtn.innerHTML = `
        <a href="./dashboard.html" class="btn head-btn1">Meu Painel</a>
        <a href="#" class="btn head-btn1" onclick="logout()">Sair</a>
        `;
    } else {
      // Se o usuário não estiver logado, renderize o menu com os links de cadastro e login
      headerBtn.innerHTML = `
        <a href="./register.html" class="btn head-btn1">Cadastrar</a>
        <a href="./login.html" class="btn head-btn1">Entrar</a>
      `;
    }
  }


  function logout() {
    // Envie uma solicitação POST para a rota de logout
    fetch('/api/logout', {
      method: 'POST',
      credentials: 'same-origin', // Para enviar cookies
    })
      .then((response) => {
        if (response.redirected) {
          // O servidor redirecionou para a página de login
          window.location.href = response.url;
        }
      })
      .catch((error) => {
        console.error('Erro ao fazer logout:', error);
      });
  }
  
  // Chame a função para renderizar o menu quando a página for carregada
  window.addEventListener('load', renderMenu);
  