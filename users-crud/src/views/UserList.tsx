// UserList.tsx
import React, { useEffect, useState, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser } from "../apiService";
import { interfaceUser } from "../User";
import { selectUser } from "../store/userReducer";
import { RootState } from "../store/store";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";

const UserList: React.FC = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState<interfaceUser[]>([]);
  const listUpdated = useSelector((state: RootState) => state.user.userList);

  useEffect(() => {
    // Obtener lista de usuarios al cargar el componente
    getUsers().then((data) => setUsers(data));
  }, [listUpdated]);

  const handleDelete = (
    event: MouseEvent<HTMLButtonElement>,
    userId: string | undefined
  ) => {
    // Eliminar usuario y actualizar la lista
    if (userId === undefined) return;
    confirmPopup({
      target: event.currentTarget,
      message: "Do you want to delete this record?",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: async () => {
        await deleteUser(userId);
        setUsers(users.filter((user) => user.id !== userId));
      },
    });
  };

  const handleUserClick = (user: interfaceUser) => {
    dispatch(selectUser(user));
  };

  const deleteButton = (user: interfaceUser) => {
    return (
      <>
        <ConfirmPopup />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger btnDel"
          onClick={(e) => handleDelete(e, user.id)}
        />
      </>
    );
  };
  const editButton = (user: interfaceUser) => {
    return (
      <Button
        label="Edit"
        icon="pi pi-pencil"
        className="btnEdit"
        onClick={() => handleUserClick(user)}
      />
    );
  };

  const buttons = (user: interfaceUser) => {
    return (
      <div>
        {deleteButton(user)}
        {editButton(user)}
      </div>
    );
  };
  function convertDate(user: interfaceUser) {
    const date = new Date(user.createdAt);
    // Obteniendo las partes de la fecha
    const Year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses son base 0
    const day = String(date.getDate()).padStart(2, "0");
    // Formateando la fecha en el formato deseado
    const formatedDate = `${Year}-${month}-${day}`;
    return formatedDate;
  }

  return (
    <>
      <h2>User List</h2>
      <DataTable
        value={users}
        stripedRows
        removableSort
        selectionMode="single"
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column field="id" sortable header="ID"></Column>
        <Column
          field="name"
          sortable
          filter
          filterPlaceholder="Search by name"
          header="Name"
        ></Column>
        <Column field="email" header="Email"></Column>
        <Column field="createdAt" header="Created" body={convertDate}></Column>
        <Column header="Action" body={buttons}></Column>
      </DataTable>
    </>
  );
};

export default UserList;
