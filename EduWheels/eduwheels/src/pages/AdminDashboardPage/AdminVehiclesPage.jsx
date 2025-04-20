import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Avatar, // Import Avatar component from Material UI
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import './AdminVehiclesPage.css';

const API_BASE_URL = 'http://localhost:8080';
const VEHICLES_API = `${API_BASE_URL}/api/vehicles`; // Adjust if your API base URL is different

export default function AdminVehiclesPage() {
    const [vehicles, setVehicles] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogType, setDialogType] = useState('create'); // 'create' or 'edit'
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [newVehicle, setNewVehicle] = useState({ plateNumber: '', type: '', capacity: '', status: '', photo: null });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getImageUrl = (path) => {
        const filename = path.replace(/^\/?uploads\//, ''); // removes leading "/uploads/"
        return `${API_BASE_URL}/api/vehicles/uploads/${filename}`;
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(VEHICLES_API);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setVehicles(data);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenCreateDialog = () => {
        setNewVehicle({ plateNumber: '', type: '', capacity: '', status: '', photo: null });
        setSelectedVehicle(null);
        setDialogType('create');
        setOpenDialog(true);
    };

    const handleOpenEditDialog = (vehicle) => {
        setSelectedVehicle(vehicle);
        setNewVehicle({
            plateNumber: vehicle.plateNumber,
            type: vehicle.type,
            capacity: vehicle.capacity,
            status: vehicle.status,
            photo: null, // We'll handle existing photo differently if needed
        });
        setDialogType('edit');
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewVehicle({ ...newVehicle, [name]: value });
    };

    const handlePhotoChange = (event) => {
        setNewVehicle({ ...newVehicle, photo: event.target.files[0] });
    };

    const handleCreateVehicle = async () => {
        const formData = new FormData();
        formData.append('plateNumber', newVehicle.plateNumber);
        formData.append('type', newVehicle.type);
        formData.append('capacity', newVehicle.capacity);
        formData.append('status', newVehicle.status);
        if (newVehicle.photo) {
            formData.append('photo', newVehicle.photo);
        }

        try {
            const response = await fetch(`${VEHICLES_API}/withPhoto`, {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const createdVehicle = await response.json();
            setVehicles([...vehicles, createdVehicle]); // The 'photo' field should contain the URL
            handleCloseDialog();
        } catch (e) {
            setError('Failed to create vehicle: ' + e.message);
        }
    };

    const handleUpdateVehicle = async () => {
        if (!selectedVehicle) return;

        const formData = new FormData();
        formData.append('plateNumber', newVehicle.plateNumber);
        formData.append('type', newVehicle.type);
        formData.append('capacity', newVehicle.capacity);
        formData.append('status', newVehicle.status);
        if (newVehicle.photo) {
            formData.append('photo', newVehicle.photo);
        }

        try {
            const response = await fetch(`${API_BASE_URL}/updateWithPhoto/${selectedVehicle.vehicleId}`, {
                method: 'PUT',
                body: formData,
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const updatedVehicle = await response.json();
            const updatedVehicles = vehicles.map(v =>
                v.vehicleId === updatedVehicle.vehicleId ? updatedVehicle : v
            );
            setVehicles(updatedVehicles); // The 'photo' field should contain the URL
            handleCloseDialog();
        } catch (e) {
            setError('Failed to update vehicle: ' + e.message);
        }
    };

    const handleDeleteVehicle = async (id) => {
        if (window.confirm('Are you sure you want to delete this vehicle?')) {
            try {
                const response = await fetch(`${API_BASE_URL}/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                setVehicles(vehicles.filter(vehicle => vehicle.vehicleId !== id));
            } catch (e) {
                setError('Failed to delete vehicle: ' + e.message);
            }
        }
    };

    if (loading) {
        return <Typography>Loading vehicles...</Typography>;
    }

    if (error) {
        return <Typography color="error">Error: {error}</Typography>;
    }

    return (
        <Box className="admin-vehicles-page">
            <Typography variant="h4" className="page-title">
                Manage Vehicles
            </Typography>
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleOpenCreateDialog}
                className="add-vehicle-button"
            >
                Add New Vehicle
            </Button>

            <TableContainer component={Paper} className="vehicles-table-container">
                <Table aria-label="vehicles table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Photo</TableCell>
                            <TableCell>Plate Number</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Capacity</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vehicles.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    No vehicles found. Click "Add New Vehicle" to add one.
                                </TableCell>
                            </TableRow>
                        ) : (
                            vehicles.map((vehicle) => (
                                <TableRow key={vehicle.vehicleId}>
                                    <TableCell>{vehicle.vehicleId}</TableCell>
                                    <TableCell>
                                        {vehicle.photoPath ? (
                                            <Avatar
                                                variant="rounded"
                                                src={getImageUrl(vehicle.photoPath)}
                                                alt={vehicle.plateNumber}
                                                sx={{ width: 56, height: 56 }}
                                            />
                                        ) : (
                                            <Typography variant="caption">No Photo</Typography>
                                        )}
                                    </TableCell>
                                    <TableCell>{vehicle.plateNumber}</TableCell>
                                    <TableCell>{vehicle.type}</TableCell>
                                    <TableCell>{vehicle.capacity}</TableCell>
                                    <TableCell>{vehicle.status}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleOpenEditDialog(vehicle)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDeleteVehicle(vehicle.vehicleId)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Create/Edit Vehicle Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    {dialogType === 'create' ? 'Create New Vehicle' : 'Edit Vehicle'}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="plateNumber"
                        name="plateNumber"
                        label="Plate Number"
                        type="text"
                        fullWidth
                        value={newVehicle.plateNumber}
                        onChange={handleInputChange}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="type-label">Type</InputLabel>
                        <Select
                            labelId="type-label"
                            id="type"
                            name="type"
                            value={newVehicle.type} // Use the value prop
                            onChange={handleInputChange} // Use the onChange prop
                            label="Type"
                        >
                            <MenuItem value="Bus">Bus</MenuItem>
                            <MenuItem value="Minibus">Minibus</MenuItem>
                            <MenuItem value="Van">Van</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        margin="dense"
                        id="capacity"
                        name="capacity"
                        label="Capacity"
                        type="number"
                        fullWidth
                        value={newVehicle.capacity}
                        onChange={handleInputChange}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="status-label">Status</InputLabel>
                        <Select
                            labelId="status-label"
                            id="status"
                            name="status"
                            value={newVehicle.status}
                            onChange={handleInputChange}
                            label="Status"
                        >
                            <MenuItem value="Available">Available</MenuItem>
                            <MenuItem value="Unavailable">Unavailable</MenuItem>
                            <MenuItem value="Maintenance">Maintenance</MenuItem>
                        </Select>
                    </FormControl>
                    <input
                        accept="image/*"
                        className="photo-input"
                        id="photo-upload"
                        type="file"
                        onChange={handlePhotoChange}
                        style={{ marginTop: 16 }}
                    />
                    <label htmlFor="photo-upload">
                        <Button component="span" color="primary" style={{ marginRight: 8 }}>
                            Upload Photo
                        </Button>
                    </label>
                    {newVehicle.photo && (
                        <Typography variant="caption" display="block">
                            {newVehicle.photo.name}
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={dialogType === 'create' ? handleCreateVehicle : handleUpdateVehicle} color="primary">
                        {dialogType === 'create' ? 'Create' : 'Update'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}