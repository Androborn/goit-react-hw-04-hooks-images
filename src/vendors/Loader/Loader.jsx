import { Grid } from 'react-loader-spinner';

import { Wrapper } from './Loader.styled';

export const Loader = () => (
  <Wrapper>
    <Grid heigth="30" width="30" color="grey" ariaLabel="loading" />
  </Wrapper>
);
