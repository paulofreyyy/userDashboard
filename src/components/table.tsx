import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Box, Typography, TextField, InputAdornment, styled } from '@mui/material';
import { useTable } from '../hooks/useTable';
import { HiMagnifyingGlass } from 'react-icons/hi2';

const UsersTable = () => {
    const { countComments, countPosts, filteredUsers, handleChangePage, handleChangeRowsPerPage, page, rowsPerPage, setSearchTerm } = useTable();

    // Aplicando estilo nas linhas da tabela
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    return (
        <Paper sx={{ bgcolor: "#FFF", borderRadius: 4, p: 3 }} elevation={0}>
            <TableContainer>
                <Box display="flex" justifyContent="space-between" p={2} alignItems='center'>
                    <Typography variant='h6' fontWeight={600}>Usuários</Typography>

                    <TextField
                        label="Buscar por Nome"
                        variant='standard'
                        onChange={(e) => setSearchTerm(e.target.value)}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <HiMagnifyingGlass />
                                    </InputAdornment>
                                ),
                            }
                        }}
                    />
                </Box>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600 }}>Nome</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Postagens</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Comentários</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((user) => (
                                <StyledTableRow key={user.id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{countPosts(user.id)}</TableCell>
                                    <TableCell>{countComments(user.id)}</TableCell>
                                </StyledTableRow>
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
