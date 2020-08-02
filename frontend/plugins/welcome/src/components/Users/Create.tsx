import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Content,
  Header,
  Page,
  pageTheme,
  ContentHeader,
} from '@backstage/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { Alert } from '@material-ui/lab';
import http from 'axios';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    margin: {
      margin: theme.spacing(3),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: '25ch',
    },
  }),
);

const url = 'http://localhost:8080';

const initialUserState = {
  name: 'System Analysis and Design',
  age: 20,
};

export default function Create(props: any) {
  const classes = useStyles();
  const profile = { givenName: 'to Software Analysis 63' };
  const [user, setUser] = useState(initialUserState);
  const [status, setStatus] = useState(false);
  const [alert, setAlert] = useState(true);

  const handleInputChange = (event: any) => {
    const { id, value } = event.target;
    setUser({ ...user, [id]: value });
  };

  const CreateUser = async () => {
    const { data } = await http.post(`${url}/api/v1/users`, {
      name: user.name,
      age: Number(user.age),
    });
    await console.log(data);
    setStatus(true);
    if (data.id != '') {
      setAlert(true);
    } else {
      setAlert(false);
    }

    const timer = setTimeout(() => {
      setStatus(false);
    }, 1000);

    // http
    //   .post('http://localhost:8080/api/v1/users', {
    //     name: 'Tanapon Kongjaroensuk',
    //     age: 20,
    //   })
    //   .then(response => {
    //     console.log('response: ', response);
    //     // do something about response
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   });
  };

  return (
    <Page theme={pageTheme.home}>
      <Header
        title={`Welcome ${profile.givenName || 'to Backstage'}`}
        subtitle="Some quick intro and links."
      ></Header>
      <Content>
        <ContentHeader title="Create">
          {status ? (
            <div>
              {alert ? (
                <Alert severity="success">
                  This is a success alert — check it out!
                </Alert>
              ) : (
                <Alert severity="warning" style={{ marginTop: 20 }}>
                  This is a warning alert — check it out!
                </Alert>
              )}
            </div>
          ) : null}
        </ContentHeader>
        <div className={classes.root}>
          <form noValidate autoComplete="off">
            <FormControl
              fullWidth
              className={classes.margin}
              variant="outlined"
            >
              <TextField
                id="name"
                label="Name"
                variant="outlined"
                type="string"
                size="medium"
                value={user.name}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl
              fullWidth
              className={classes.margin}
              variant="outlined"
            >
              <TextField
                id="age"
                label="Age"
                variant="outlined"
                type="number"
                size="medium"
                value={user.age}
                onChange={handleInputChange}
              />
            </FormControl>

            <div className={classes.margin}>
              <Button
                onClick={() => {
                  CreateUser();
                }}
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
              <Button
                style={{ marginLeft: 20 }}
                component={RouterLink}
                to="/"
                variant="contained"
              >
                Back
              </Button>
            </div>
          </form>
        </div>
      </Content>
    </Page>
  );
}
