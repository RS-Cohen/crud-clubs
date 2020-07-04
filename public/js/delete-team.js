
  const deleteBtn = document.querySelectorAll('.delete-link'); 
  
  deleteBtn.forEach(btn => {
    btn.onclick =  deleteTeam(btn);
  })
  
  function deleteTeam(btn) {
    const btnUrl = btn.href;
    const deleteUrl = '/teams' + btnUrl.split('/teams')[1];
    const deleteModalForm = document.querySelector('#deleteModalForm');
    deleteModalForm.action = deleteUrl;
  }
