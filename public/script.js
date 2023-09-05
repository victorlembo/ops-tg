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

  

  // Função para buscar dados dos trabalhos do servidor
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

      jobItem.innerHTML = `
        <div class="job-items">
          <div class="company-img">
            <a href="#"><img src="assets/img/icon/job-list1.png" alt=""></a>
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

  // // Função para atualizar o contador de trabalhos na página
  // async function updateJobCount() {
  //   const jobCountElement = document.getElementById('jobCount');
  //   const jobCount = await fetchJobCount();
  //   jobCountElement.textContent = `Total de oportunidades: ${jobCount}`;
  // }

  // // Chama a função para atualizar o contador ao carregar a página
  // updateJobCount();