import '/node_modules/react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Grid } from 'react-loader-spinner';

import { Wrapper } from './Loader.styled';

export const Loader = () => (
  <Wrapper>
    <Grid heigth="100" width="100" color="grey" ariaLabel="loading" />
  </Wrapper>
);
