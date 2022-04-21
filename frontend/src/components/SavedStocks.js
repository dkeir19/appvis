import React from 'react';
import { GithubContext } from '../context/context';
import styled from 'styled-components';

const SavedStocks = () => {
  const { watchStocks, watchStocks2, searchStock, removeStock, loggedUser } = React.useContext(GithubContext);

  const handleSubmit = (e,ticker) => {
    e.preventDefault();
    if (ticker) {
     
      searchStock(ticker);
      
    }
  };

  const handleRemove = (e,ticker) => {
    e.preventDefault();
    if (ticker) {
     
      removeStock(ticker);
      
    }
  };

  return (
    <Wrapper>
  
      <div className='followers'>
        {   
            Array.from(watchStocks2).map((item, index) => {
              //const { avatar_url: img, html_url, login } = stock;
              return (
                <article key={index}>
                  {/* <img src={stock[2]} alt={stock[1]} /> */}
                 
                  <a href="" onClick={(e) => { handleSubmit(e,item.ticker); } }>
                    <img src={item.logo} alt={item.name}/>
                  </a>
                  <a href="" onClick={(e) => { handleSubmit(e,item.ticker); } }>
                  <div>
                    <h4>{item.name}</h4>
                    <h5>{item.ticker}</h5>
                    {/* <a href={html_url}>{html_url}</a> */}
                  </div>
                  </a>
                  <div>
                  <a href="" onClick={(e) => { handleRemove(e,item.ticker); } }>
                    Remove stock
                  </a>
                  </div>
                </article>
              );
              // return (
              //   <article key={index}>
              //     <img src={stock[2]} alt={stock[1]} />
              //     <div>
              //       <h4>{stock[1]}</h4>
              //       {/* <a href={html_url}>{html_url}</a> */}
              //     </div>
              //   </article>
              // );
            })
      }
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  display: grid;

  
    background: var(--clr-white);
  border-top-right-radius: var(--radius);
  border-bottom-left-radius: var(--radius);
  border-bottom-right-radius: var(--radius);
  position: relative;

  &::before {
    content: 'My watch list';
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%);
    background: var(--clr-white);
    color: var(--clr-grey-5);
    border-top-right-radius: var(--radius);
    border-top-left-radius: var(--radius);
    text-transform: capitalize;
    padding: 0.5rem 1rem 0 1rem;
    letter-spacing: var(--spacing);
    font-size: 1rem;
  }
  .followers {
    overflow: scroll;
    height: 260px;
    display: grid;
    grid-template-rows: repeat(auto-fill, minmax(45px, 1fr));
    gap: 1.25rem 1rem;
    padding: 1rem 2rem;
  }
  article {
    transition: var(--transition);
    padding: 0.15rem 0.5rem;
    border-radius: var(--radius);
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    column-gap: 1rem;
    img {
      height: 100%;
      width: 45px;
      border-radius: 50%;
      object-fit: cover;
    }
    h4 {
      margin-bottom: 0;
    }
    a {
      color: var(--clr-grey-5);
    }
  }
`;
export default SavedStocks;
