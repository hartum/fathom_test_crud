// App.tsx
import React, { useState } from 'react';
import UserList from './views/UserList';
import UserForm from './views/UserForm';
import { interfaceUser } from './User'

const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<interfaceUser | undefined>(undefined);
  const handleUserSelect = (user: interfaceUser) => {
    if (typeof user === 'undefined'){ return } else{
      setSelectedUser(user);
    }
    return 'yeah'+ user;
  }
  
  return (
    <div>
      <UserForm onSubmit={(user) => handleUserSelect(user)} user={selectedUser} />
      <UserList />
    </div>
  );
};

export default App;
