import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TextField, Paper } from '@mui/material';
import { useUsers } from '../hooks/useUsers';

const UsersTable = () => {
    const { countComments, countPosts, filteredUsers, handleChangePage, handleChangeRowsPerPage, page, rowsPerPage, setSearchTerm } = useUsers();

    return (
        <Paper>
            <TextField
                label="Buscar por Nome"
                variant="outlined"
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
                margin="normal"
            />

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Postagens</TableCell>
                            <TableCell>Comentários</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{countPosts(user.id)}</TableCell>
                                    <TableCell>{countComments(user.id)}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredUsers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default UsersTable;
