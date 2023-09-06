// Add your JavaScript code here
document.addEventListener('DOMContentLoaded', () => {
  console.log('Script loaded');
});

function fetchUserName(userId) {
  return fetch(`/api/user/${userId}`)
    .then(response => response.json())
    .then(data => {
      if (data.user) {
        return data.user.name;
      } else {
        return 'Unknown User';
      }
    })
    .catch(error => {
      console.error(error);
      return 'Unknown User';
    });
}


async function fetchUserProfileImage(userId) {
  try {
    const response = await fetch(`/api/user/${userId}`);
    const userData = await response.json();
    return userData.user.profile_image;
  } catch (error) {
    console.error(error);
    return ''; // Return an empty string if there's an error
  }
}

async function fetchJobs() {
  try {
    const response = await fetch('/api/jobs/recent');
    const data = await response.json();
    const jobList = document.getElementById('jobList');

    for (const job of data.jobs) {
      const jobItem = document.createElement('div');
      jobItem.classList.add('single-job-items', 'mb-30');

      // Fetch the user's name using the user ID
      const userName = await fetchUserName(job.id_user);

      // Fetch the user's profile image using the user ID
      const profileImage = await fetchUserProfileImage(job.id_user);

      jobItem.innerHTML = `
          <div class="job-items">
            <div class="company-img">
              <a href="#"><img src="uploads/${profileImage}" alt=""></a>
            </div>
            <div class="job-tittle job-tittle2">
              <h4>${job.title}</h4>
              </a>
              <ul>
                <li>${userName}</li> 
                <li><i class="fas fa-map-marker-alt"></i>${job.location}</li>
                <li>R$ ${job.budget}</li>
              </ul>
            </div>
          </div>
          <div class="items-link items-link2 f-right">
            <a href="job_details.html?jobId=${job.id}">Detalhes</a>
            <span>${getTimeAgo(job.created_at)}</span>
          </div>
        `;

      jobList.appendChild(jobItem);
    }
  } catch (error) {
    console.error(error);
  }
}

// Call the function to fetch and render jobs
fetchJobs();


function getTimeAgo(createdAt) {
  const now = new Date();
  const createdDate = new Date(createdAt);
  const timeDiffInSeconds = Math.floor((now - createdDate) / 1000);

  if (timeDiffInSeconds < 86400) {
    return "Publicado hoje";
  }

  const timeDiffInDays = Math.floor(timeDiffInSeconds / 86400);
  return `Publicado há ${timeDiffInDays} dia${timeDiffInDays !== 1 ? "s" : ""}`;
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


async function fetchJobCount() {
  try {
    const response = await fetch('/api/jobs/count');
    const data = await response.json();
    return data.count;
  } catch (error) {
    console.error(error);
    return 0;
  }
}

