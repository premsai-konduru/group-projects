import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Dropdown, Badge } from 'react-bootstrap';
import axios from 'axios';

const ActivityTable = () => {
  const [tasks, setTasks] = useState([]);
  const [action, setAction] = useState(null);

  const calculateDaysBetweenDates = function (currentDate, deadline) {
    let mili = 1000 * 60 * 60 * 24;
    return Math.floor((currentDate - new Date(deadline)) / mili);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks'); // Replace with your backend API endpoint

        console.log(response.data);
        const currentDate = new Date();
        const updatedTasks = response.data.map((task) => {
          if (task.status == "Completed") {
            return { ...task, bgColor: 'success' };
          }
          if (task.status == "Cancelled") {
            return { ...task, bgColor: 'danger' };
          }
          const daysBetweenDates = calculateDaysBetweenDates(currentDate, task.deadline);
          if (daysBetweenDates <= 0) {
            return { ...task, status: 'In Progress', bgColor: 'primary' };
          } else {
            return { ...task, status: 'Pending', bgColor: 'warning' };
          }
        });

        // Update the deadline format before setting the state
        const tasksWithUpdatedDeadline = updatedTasks.map((task) => ({
          ...task,
          deadline: new Date(task.deadline),
        }));

        setTasks(tasksWithUpdatedDeadline);
      } catch (error) {
        console.error('Error fetching tasks:', error.message);
      }
    };

    fetchTasks();
  }, [action]);

  const handleDropdownSelect = async (selectedAction, taskId) => {
    // Use functional update to ensure the update is based on the latest state
    setAction((prevAction) => {
      // Find the task with the specified taskId in the tasks array
      const updatedTasks = tasks.map((task) => {
        if (task._id === taskId) {
          // Update the status of the found task
          return { ...task, status: selectedAction === 'Completed' ? 'Completed' : 'Cancelled' };
        }
        return task;
      });

      // Update the state with the modified tasks array
      setTasks(updatedTasks);

      // Update the task on the backend
      updateTaskOnBackend(taskId, selectedAction);

      // Update the selectedAction and taskId in the state
      return {
        ...prevAction,
        selectedAction,
        taskId,
      };
    });
  };

  const updateTaskOnBackend = async (taskId, status) => {
    try {
      // Replace the following URL with your backend API endpoint for updating a task
      const url = `http://localhost:5000/api/tasks/${taskId}`;

      // Assuming your backend expects a PUT request with the updated status
      await axios.put(url, { status });

      console.log('Task updated on the backend.');
    } catch (error) {
      console.error('Error updating task on the backend:', error.message);
    }
  };


  return (
    <div>
      <h2>All Activities</h2>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Deadline</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.title}</td>
              <td>{task.deadline.toISOString().split('T')[0]}</td>
              <td>
                <Badge bg={task.bgColor}>{task.status}</Badge>
              </td>
              <td>
                {task.status === 'In Progress' || task.status === 'Pending' ? (
                  <Dropdown onSelect={(selectedAction) => handleDropdownSelect(selectedAction, task._id)}>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                      Select Action
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="Completed">Completed</Dropdown.Item>
                      <Dropdown.Item eventKey="Cancelled">Cancelled</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ActivityTable;
