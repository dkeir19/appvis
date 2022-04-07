import React from 'react';
import styled from 'styled-components';
import Card from './Card';
import Followers from './Followers';
import Stockinfo from './Stockinfo';
import { Treemap } from './Charts'
import { GithubContext } from '../context/context';
import { Stock2 } from './Charts';
const User = () => {
  const { repos, currentStock, currentStockName } = React.useContext(GithubContext);

  return (
    <section className='section'>
      <Wrapper className='section-center'>
     
        <Stockinfo></Stockinfo>
        <Treemap stockName={currentStockName}/>
        
        
        
        <Stock2 stockName={currentStockName}/>
        {/* <Followers></Followers> */}
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  padding-top: 2rem;
  display: grid;
  gap: 3rem 2rem;
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }
  /* align-items: start; */
`;

export default User;
