import React, { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ComponanceTable from '../Table';
import Button from '@material-ui/core/Button';

import {
  Content,
  Header,
  Page,
  pageTheme,
  ContentHeader,
  Link,
} from '@backstage/core';

const WelcomePage: FC<{}> = () => {
  const profile = { givenName: 'to System Analysis and Design 63' };

  return (
    <Page theme={pageTheme.home}>
      <Header
        title={`Welcome ${profile.givenName || 'to Backstage'}`}
        subtitle="Some quick intro and links."
      ></Header>
      <Content>
        <ContentHeader title="Application CRUD">
          <Link component={RouterLink} to="/user">
            <Button variant="contained" color="primary">
              Add User
            </Button>
          </Link>
        </ContentHeader>
        <ComponanceTable></ComponanceTable>
      </Content>
    </Page>
  );
};

export default WelcomePage;
