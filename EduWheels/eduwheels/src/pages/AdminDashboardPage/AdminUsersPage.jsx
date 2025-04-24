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
    Avatar,
    TablePagination,
    DialogContentText,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Alert, AlertTitle } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

// Separate CSS (AdminUsersPage.module.css)
// import './AdminUsersPage.module.css'; // Removed - all styles are in the immersive

const API_BASE_URL = 'http://localhost:8080/users'; // Updated base URL to /users

// Styled Components
const StyledPaper = styled(Paper)(({ theme }) => ({
    width: '100%',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
}));

const StyledTableContainer = styled(TableContainer)({
    borderRadius: '8px',
    overflow: 'hidden',
});

const StyledTableHead = styled(TableHead)({
    backgroundColor: '#f5f5f5',
});

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const StyledTableCell = styled(TableCell)({
    padding: '12px',
});

const StyledIconButton = styled(IconButton)({
    margin: '4px',
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
    },
});

const StyledButton = styled(Button)({
    margin: '8px',
    borderRadius: '8px',
    textTransform: 'none',
});

const StyledDialog = styled(Dialog)({
    '& .MuiDialog-paper': {
        borderRadius: '12px',
        width: '100%',
        maxWidth: '600px',
    },
});

const StyledTextField = styled(TextField)({
    margin: '8px 0 ',
    '& .MuiOutlinedInput-root': {
        borderRadius: '8px',
    },
});

const StyledFormControl = styled(FormControl)({
    margin: '8px 0',
    '& .MuiInputBase-root': {
        borderRadius: '8px',
    },
});

const StyledAvatar = styled(Avatar)({
    width: 40,
    height: 40,
    borderRadius: '50%',
    marginRight: 12,
});

const MotionTableRow = motion(StyledTableRow);

const UserRow = ({ user, onEdit, onDelete }) => (
    <MotionTableRow
        key={user.userId}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
    >
        <StyledTableCell component="th" scope="row">
            {user.schoolid}
        </StyledTableCell>
        <StyledTableCell>
            <Box display="flex" alignItems="center">
                <StyledAvatar src={user.profilePicture} alt={user.firstName} />
                <div>
                    <Typography variant="subtitle2">{user.firstName} {user.lastName}</Typography>
                    <Typography variant="caption" color="textSecondary">{user.email}</Typography>
                </div>
            </Box>
        </StyledTableCell>
        <StyledTableCell>{user.username}</StyledTableCell>
        <StyledTableCell>{user.role}</StyledTableCell>
        <StyledTableCell>
            <StyledIconButton aria-label="edit" onClick={() => onEdit(user)} color="primary">
                <EditIcon />
            </StyledIconButton>
            <StyledIconButton aria-label="delete" onClick={() => onDelete(user.userId)} color="error">
                <DeleteIcon />
            </StyledIconButton>
        </StyledTableCell>
    </MotionTableRow>
);

const CreateEditUserDialog = ({ open, onClose, user, onSave, dialogType }) => {
    const [newUser, setNewUser] = useState(user);
    const [error, setError] = useState('');

    useEffect(() => {
        setNewUser(user);
    }, [user]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const handleSave = () => {
        if (!newUser.username || !newUser.firstName || !newUser.lastName || !newUser.email || !newUser.role) {
            setError('Please fill in all required fields.');
            return;
        }
        if (dialogType === 'create' && !newUser.password) {
            setError('Please provide a password for the new user.');
            return;
        }
        setError(''); // Clear any previous error
        onSave(newUser);
    };

    return (
        <StyledDialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                {dialogType === 'create' ? 'Create New User' : 'Edit User'}
            </DialogTitle>
            <DialogContent>
                {error && (
                    <Alert severity="error" className="mb-3">
                        <AlertTitle>Error</AlertTitle>
                        {error}
                    </Alert>
                )}
                <StyledTextField
                    autoFocus
                    margin="dense"
                    id="username"
                    name="username"
                    label="Username"
                    type="text"
                    fullWidth
                    value={newUser.username || ''}
                    onChange={handleInputChange}
                    required
                />
                <StyledTextField
                    margin="dense"
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    type="text"
                    fullWidth
                    value={newUser.firstName || ''}
                    onChange={handleInputChange}
                    required
                />
                <StyledTextField
                    margin="dense"
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    type="text"
                    fullWidth
                    value={newUser.lastName || ''}
                    onChange={handleInputChange}
                    required
                />
                <StyledTextField
                    margin="dense"
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth
                    value={newUser.email || ''}
                    onChange={handleInputChange}
                    required
                />
                {dialogType === 'create' && (
                    <StyledTextField
                        margin="dense"
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        fullWidth
                        value={newUser.password || ''}
                        onChange={handleInputChange}
                        required
                    />
                )}
                <StyledFormControl fullWidth margin="dense">
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                        labelId="role-label"
                        id="role"
                        name="role"
                        value={newUser.role || ''}
                        onChange={handleInputChange}
                        label="Role"
                        required
                    >
                        <MenuItem value="Admin">Admin</MenuItem>
                        <MenuItem value="Staff">Staff</MenuItem>
                        <MenuItem value="User">User</MenuItem>
                    </Select>
                </StyledFormControl>
                <StyledTextField
                    margin="dense"
                    id="profilePicture"
                    name="profilePicture"
                    label="Profile Picture URL"
                    type="text"
                    fullWidth
                    value={newUser.profilePicture || ''}
                    onChange={handleInputChange}
                />
            </DialogContent>
            <DialogActions>
                <StyledButton onClick={onClose} color="primary">
                    Cancel
                </StyledButton>
                <StyledButton onClick={handleSave} color="primary">
                    {dialogType === 'create' ? 'Create' : 'Update'}
                </StyledButton>
            </DialogActions>
        </StyledDialog>
    );
};

const DeleteUserDialog = ({ open, onClose, userId, onDelete }) => {
    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{"Delete User"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this user? This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <StyledButton onClick={onClose} color="primary">
                    Cancel
                </StyledButton>
                <StyledButton onClick={() => onDelete(userId)} color="error">
                    Delete
                </StyledButton>
            </DialogActions>
        </Dialog>
    );
};

const AdminUsersPage = () => {
    const [users, setUsers] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogType, setDialogType] = useState('create'); // 'create' or 'edit'
    const [selectedUser, setSelectedUser] = useState({
        userId: null,
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        profilePicture: '',
    });
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(API_BASE_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setUsers(data);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenCreateDialog = () => {
        setSelectedUser({
            userId: null,
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            role: '',
            profilePicture: '',
        });
        setDialogType('create');
        setOpenDialog(true);
    };

    const handleOpenEditDialog = (user) => {
        setSelectedUser(user);
        setDialogType('edit');
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSaveUser = async (user) => {
        try {
            if (dialogType === 'create') {
                const response = await fetch(`${API_BASE_URL}/signup`, { // Changed to /signup
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user),
                });
                if (!response.ok) {
                    const errorData = await response.json(); //attempt to get error message.
                    throw new Error(errorData.message || `Failed to create user: ${response.status}`);
                }
                const createdUser = await response.json();
                setUsers([...users, createdUser]);
            } else {
                const response = await fetch(`${API_BASE_URL}/${user.userId}`, {
                    method: 'PUT', //correct method
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user),
                });
                if (!response.ok) {
                    throw new Error(`Failed to update user: ${response.status}`);
                }
                const updatedUser = await response.json();
                setUsers(users.map((u) => (u.userId === updatedUser.userId ? updatedUser : u)));
            }
            handleCloseDialog();
            fetchUsers();
        } catch (e) {
            setError(e.message);
        }
    };

    const handleOpenDeleteDialog = (userId) => {
        setUserToDelete(userId);
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    const handleDeleteUser = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`Failed to delete user: ${response.status}`);
            }
            setUsers(users.filter((user) => user.userId !== id));
            handleCloseDeleteDialog();
            fetchUsers();
        } catch (e) {
            setError(e.message);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredUsers.length - page * rowsPerPage);
    const displayedUsers = filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Box className="admin-users-page">
            <Typography variant="h4" className="page-title">
                Manage Users
            </Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center" className="mb-4">
                <StyledButton
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleOpenCreateDialog}
                    className="add-user-button"
                >
                    Add New User
                </StyledButton>
                <div className="search-input-wrapper">
                    <TextField
                        id="search"
                        type="text"
                        placeholder="Search Users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <SearchIcon className="search-icon" />
                </div>
            </Box>

            <StyledPaper>
                <StyledTableContainer>
                    <Table aria-label="users table">
                        <StyledTableHead>
                            <TableRow>
                                <StyledTableCell>School ID</StyledTableCell>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>Username</StyledTableCell>
                                <StyledTableCell>Role</StyledTableCell>
                                <StyledTableCell>Actions</StyledTableCell>
                            </TableRow>
                        </StyledTableHead>
                        <TableBody>
                            <AnimatePresence>
                                {loading ? (
                                    <TableRow>
                                        <StyledTableCell colSpan={5} align="center">
                                            Loading users...
                                        </StyledTableCell>
                                    </TableRow>
                                ) : error ? (
                                    <TableRow>
                                        <StyledTableCell colSpan={5} align="center" style={{ color: 'red' }}>
                                            Error: {error}
                                        </StyledTableCell>
                                    </TableRow>
                                ) : displayedUsers.length === 0 ? (
                                    <TableRow>
                                        <StyledTableCell colSpan={5} align="center">
                                            No users found.
                                        </StyledTableCell>
                                    </TableRow>
                                ) : (
                                    displayedUsers.map((user) => (
                                        <UserRow
                                            user={user}
                                            onEdit={handleOpenEditDialog}
                                            onDelete={handleOpenDeleteDialog}
                                        />
                                    ))
                                )}
                            </AnimatePresence>
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <StyledTableCell colSpan={5} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </StyledTableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredUsers.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </StyledPaper>

            <CreateEditUserDialog
                open={openDialog}
                onClose={handleCloseDialog}
                user={selectedUser}
                onSave={handleSaveUser}
                dialogType={dialogType}
            />

            <DeleteUserDialog
                open={openDeleteDialog}
                onClose={handleCloseDeleteDialog}
                userId={userToDelete}
                onDelete={handleDeleteUser}
            />
        </Box>
    );
};

export default AdminUsersPage;

