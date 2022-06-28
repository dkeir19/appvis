import React from 'react';
import styled from 'styled-components';
import Stockinfo from './Stockinfo';
import SavedStocks from './SavedStocks'
import { Treemap } from './Charts'
import { GithubContext } from '../context/context';
import { Candlestick } from './Charts';

const User = () => {
  const { repos, currentStock, currentStockName } = React.useContext(GithubContext);

  return (
    <section className='section'>
      <Wrapper className='section-center'>
        <Stockinfo/>
        <SavedStocks/>
        <Treemap stockName={currentStockName}/>
        <Candlestick/> 
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  padding-top: 2rem;
  display: grid;
  gap: 0.5rem 0.5rem;
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
    
  }
  /* align-items: start; */
`;

export default User;
