import { useState } from 'react'
import './App.css'
import TasksList from './components/TasksLIst'
import Login from './components/Login';
import RegisterForm from './components/RegisterForm';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  //Logicc to determine what to show to the user
  const renderContent = () => {
    // if logged in show tasks
    if (isAuthenticated) {
      return <TasksList />;
    }

    // If not logged in, but user clicked "Register"
    if(isRegistered) { 
      return (
        <RegisterForm
          onGoToLogin={() => setIsRegistered(false)}
          onRegisterSuccess={() => setIsRegistered(false)}
        />
      );
    }

    // Default view (Login)
    return (
      <Login
        onLoginSuccess={() => setIsAuthenticated(true)}
        onGoToRegister={() => setIsRegistered(true)}
      />
    );
  };

  return (
   <div className="App">
      {/* <h1>My Project</h1> */}

      {renderContent()}

      {/* {!isAuthenticated ? (
          // If not logged in, show Login
          <Login onLoginSuccess={() => setIsAuthenticated(true)} />
      ) : (
          // If logged in, show Tasks
          <TasksList />
      )} */}
      
    </div>
  )
}

export default App
