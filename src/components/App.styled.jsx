import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 16px;
`;

export const PreSearchPlaceHolder = styled.div`
  margin: 0 auto;
  text-align: center;
  width: 50vw;
  font-weight: bold;
  font-size: 2rem;
  color: #828689;
  font-weight: bold;
`;

export const StyledToastContainer = styled(ToastContainer)`
  &&&.Toastify__toast-container {
    height: 10vh;
    width: 25vw;
    font-size: 1.5rem;
  }
`;
