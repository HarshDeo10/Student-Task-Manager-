document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');
  
    taskForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const formData = new FormData(taskForm);
      const task = {
        courseId: formData.get('courseId'),
        taskName: formData.get('taskName'),
        dueDate: formData.get('dueDate'),
        additionalDetails: formData.get('additionalDetails')
      };
  
      try {
        const response = await fetch('/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(task)
        });
        const data = await response.json();
        console.log(data);
        renderTasks();
      } catch (error) {
        console.error('Error:', error);
      }
    });
  
    async function renderTasks() {
      try {
        const response = await fetch('/tasks');
        const tasks = await response.json();
        taskList.innerHTML = '';
        tasks.forEach(task => {
          const taskItem = document.createElement('div');
          taskItem.innerHTML = `
            <h3>${task.courseId}</h3>
            <p>${task.taskName}</p>
            <p>Due Date: ${new Date(task.dueDate).toDateString()}</p>
            <p>${task.additionalDetails}</p>
          `;
          taskList.appendChild(taskItem);
        });
      } catch (error) {
        console.error('Error:', error);
      }
    }
  
    renderTasks();
  });
  