// UserForm.tsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../apiService";
import { createUser, updateUser } from "../apiService";
import { interfaceUser } from "../User";
import { RootState } from "../store/store";
import { selectUser, setUserList } from "../store/userReducer";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

interface UserFormProps {
  onSubmit: (user: interfaceUser) => void;
  user?: interfaceUser;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, user }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [userData, setUserData] = useState<interfaceUser>(
    user || { name: "", email: "", createdAt: "", avatar: "" }
  );
  const [errorName, setErrorName] = useState<string>("");
  const [erroEmail, setErrorEmail] = useState<string>("");
  const dispatch = useDispatch();
  const selectedUser = useSelector(
    (state: RootState) => state.user.selectedUser
  );

  useEffect(() => {
    // Actualizar el formulario cuando cambia el usuario seleccionado
    if (selectedUser) {
      cleanMsgError();
      setUserData(selectedUser);
      setVisible(true);
    }
  }, [selectedUser]);

  const createNewUser = () => {
    cleanMsgError();
    setUserData({ name: "", email: "", createdAt: "", avatar: "" });
    dispatch(selectUser(null));
    setVisible(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validar formulario
    if (!validateForm()) return;
    if (selectedUser) {
      // Actualizar usuario existente
      const updatedUser = await updateUser(userData);
      onSubmit(updatedUser);
    } else {
      // Crear nuevo usuario
      userData.createdAt = new Date().toISOString();
      const newUser = await createUser(userData);
      onSubmit(newUser);
    }
    // Cerrar popUp formulario
    setVisible(false);
    // Actualizo lista
    getUsers().then((data) => dispatch(setUserList(data)));
  };
  const validateForm = () => {
    if (!userData.name.trim()) {
      setErrorName("Name is required");
      return false;
    } else {
      setErrorName("");
    }
    if (!userData.email.trim()) {
      setErrorEmail("Email is required");
      return false;
    } else {
      setErrorEmail("");
    }
    if (!isValidEmail(userData.email.trim())) {
      setErrorEmail("The e-mail must be in a valid format");
      return false;
    } else {
      setErrorEmail("");
    }
    return true;
  };

  // Función para validar el formato del correo electrónico
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const cleanMsgError = () => {
    setErrorName('');
    setErrorEmail('');
  }

  return (
    <>
      <Button
        label="New User"
        icon="pi pi-plus-circle"
        onClick={createNewUser}
      />
      <Dialog
        header="User details"
        visible={visible}
        style={{ width: "30vw" }}
        onHide={() => setVisible(false)}
      >
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="id" value={userData.id} />
          <label>
            Name*:
            <br />
            <InputText
              name="name"
              value={userData.name}
              onChange={(e) => handleChange(e)}
            />
            <small>{errorName}</small>
          </label>
          <br />
          <label>
            Email*:
            <br />
            <InputText
              name="email"
              value={userData.email}
              onChange={(e) => handleChange(e)}
            />
            <small>{erroEmail}</small>
          </label>
          <br />
          <label>
            Avatar:
            <br />
            <InputText
              name="avatar"
              value={userData.avatar}
              onChange={(e) => handleChange(e)}
            />
          </label>
          <br />
          <Button label={selectedUser ? "Update" : "Create"} />
        </form>
      </Dialog>
    </>
  );
};

export default UserForm;
