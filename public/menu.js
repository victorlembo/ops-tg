function renderMenu() {
  const headerBtn = document.querySelector('.header-btn.d-none.f-right.d-lg-block');

  const isUserLoggedIn = document.cookie.includes('isUserLoggedIn=true');

  const idRole = getCookie('idRole');

  if (isUserLoggedIn) {
    if (idRole === '1') {
      headerBtn.innerHTML = `
        <a href="./dashboard.html" class="btn head-btn1">Meu Painel</a>
        <a href="#" class="btn head-btn1" onclick="logout()">Sair</a>`;
    } else if (idRole === '2') {
      headerBtn.innerHTML = `
        <a href="./dashboard_candidate.html" class="btn head-btn1">Meu Painel</a>
        <a href="#" class="btn head-btn1" onclick="logout()">Sair</a>`;
    }
  } else {
    headerBtn.innerHTML = `
      <a href="./register.html" class="btn head-btn1">Cadastrar</a>
      <a href="./login.html" class="btn head-btn1">Entrar</a>`;
  }
}

// Função para obter o valor de um cookie por nome
function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${name}=`)) {
      return cookie.substring(name.length + 1);
    }
  }
  return '';
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
