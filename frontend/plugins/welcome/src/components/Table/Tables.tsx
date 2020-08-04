import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { DefaultApi } from '../../api/apis';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ComponentsTable() {
  const classes = useStyles();
  const api = new DefaultApi();
  const [users, setUsers] = useState(Array);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      const res = await api.listUser({ limit: 10, offset: 0 });
      setLoading(false);
      setUsers(res);
    };
    getUsers();
  }, [loading]);

  const deleteUsers = async (id: number) => {
    const res = await api.deleteUser({ id: id });
    setLoading(true);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">No.</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Age</TableCell>
            <TableCell align="center">Manage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(item => (
            <TableRow key={item.id}>
              <TableCell align="center">{item.id}</TableCell>
              <TableCell align="center">{item.name}</TableCell>
              <TableCell align="center">{item.age}</TableCell>
              <TableCell align="center">
                <Button
                  onClick={() => {
                    deleteUsers(item.id);
                  }}
                  style={{ marginLeft: 10 }}
                  variant="contained"
                  color="secondary"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
