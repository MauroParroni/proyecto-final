import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, TextField, Typography, Paper, Modal, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './admin.css';

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [password, setPassword] = useState("");
    const [openModal, setOpenModal] = useState(true);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const correctPassword = "admin123"; // Contraseña correcta

    useEffect(() => {
        if (password === correctPassword) {
            setOpenModal(false);
            fetchUsers();
        }
    }, [password]);

    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:5000/users");
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error al obtener los usuarios:", error);
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmitPassword = () => {
        if (password === correctPassword) {
            setOpenModal(false);
            fetchUsers();
        } else {
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 3000);
        }
    };

    const columns = [
        { field: "id", headerName: "ID", width: 70, editable: false },
        { field: "email", headerName: "Email", width: 200, editable: true },
        { field: "password", headerName: "Password", width: 150, editable: true },
        { field: "name", headerName: "Nombre", width: 150, editable: true },
        { field: "username", headerName: "Usuario", width: 150, editable: true },
        { field: "dni", headerName: "DNI", width: 100, editable: true },
        { field: "age", headerName: "Edad", width: 100, editable: true },
        { field: "country", headerName: "País", width: 150, editable: true },
        {
            field: "delete",
            headerName: "Eliminar",
            width: 150,
            sortable: false,
            renderCell: (params) => (
                <Button variant="contained" color="error" onClick={() => handleDelete(params.row.id)} className="data-grid-delete-button">
                    Eliminar
                </Button>
            )
        }
    ];

    const filteredRows = users.filter(user =>
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.username.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/users/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el usuario');
            }

            setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
        } catch (error) {
            console.error('Error eliminando usuario:', error);
        }
    };

    return (
        <>
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" sx={{ marginBottom: 2 }}>
                        ¡Solo acceso autorizado! Todos los procesos están siendo monitoreados
                    </Typography>
                    <TextField
                        label="Ingreso solo administrador"
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        error={error}
                        helperText={error ? "Contraseña incorrecta" : "El ingreso es automatico"}
                        fullWidth
                        sx={{ marginBottom: 2 }}
                    />
                    <Button 
                        onClick={handleSubmitPassword} 
                        variant="contained" 
                        sx={{ width: "100%" }}>
                        Ingresar
                    </Button>
                </Box>
            </Modal>

            <Paper sx={{ padding: 3 }}>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>Administrar Usuarios</Typography>
                <TextField
                    label="Buscar usuario..."
                    variant="outlined"
                    fullWidth
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{ marginBottom: 3 }}
                />
                <div style={{ height: 500, width: '100%' }}>
                    <DataGrid
                        rows={filteredRows}
                        columns={columns}
                        pageSize={5}
                        className="data-grid-cell"
                    />
                </div>
            </Paper>
        </>
    );
};

// Estilos del modal
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: 24,
    width: '300px',
    maxWidth: '90%',
};

export default AdminPage;
