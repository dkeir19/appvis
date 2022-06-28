import React from 'react';
import styled from 'styled-components';
import { MdSearch } from 'react-icons/md';
import { GithubContext } from '../context/context';
import Autocomplete from 'react-autocomplete';

const Search = () => {
  var constants = require('../config')
  const [user, setUser] = React.useState('');
  const [searchEntry, setSearchEntry] = React.useState('');
  const { requests, error, searchGithubUser, searchStock, isLoading } = React.useContext(
    GithubContext
  );
  // get things from global context
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchEntry) {
     
      searchStock(searchEntry);
      
    }
  };
  return (
    <section className='section'>
      <Wrapper className='section-center'>
      
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <MdSearch />
            <Autocomplete
              inputProps={{'placeholder': 'Enter stock', 'style': {width: '100%'}  }}
              wrapperStyle={{display: 'block'}}
              getItemValue={(item) => item.ticker}
              items={constants.companiesExtended2}
              shouldItemRender={(item, value) => item.ticker.toLowerCase().indexOf(value.toLowerCase()) > -1}
              renderItem={(item, isHighlighted) =>
                <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                  {item.ticker} : {item.name} : {item.sector}
                </div>
              }
              value={searchEntry}
              onChange={(e) => setSearchEntry(e.target.value)}
              onSelect={(val) => setSearchEntry(val)}
            />
            {requests > 0 && !isLoading && (
              <button type='submit'>search</button>
            )}
          </div>
        </form>
        {error.show && (
          <ErrorWrapper>
            <p>{error.msg}</p>
          </ErrorWrapper>
        )}


      </Wrapper>
      
    </section>
  );
};

const Wrapper = styled.p`
  z-index:999;
  @keyframes moveInLeft {
    0% {
        opacity: 0;
        transform: translateX(-10rem);
    }

    80% {
        transform: translateX(1rem);
    }

    100% {
        opacity: 1;
        transform: translate(0);
    }
  }

  animation-name: moveInLeft;
  animation-duration: 1s;
  animation-timing-function: ease-out;

  position: relative;
  display: grid;
  gap: 1rem 1.75rem;
  @media (max-width: 1323px) {
    margin-top:35px;
  }

  @media (min-width: 768px) {
    
    align-items: center;
    h3 {
      padding: 0 0.5rem;
    }
  }
  .form-control {
    background: var(--clr-white);
    display: grid;
    align-items: center;
    grid-template-columns: auto 1fr auto;
    column-gap: 0.5rem;
    border-radius: 5px;
    padding: 0.5rem;
    input {
      
      border-color: transparent;
      outline-color: var(--clr-grey-10);
      letter-spacing: var(--spacing);
      color: var(--clr-grey-3);
      padding: 0.25rem 0.5rem;
    }
    input::placeholder {
      color: var(--clr-grey-3);
      text-transform: capitalize;
      letter-spacing: var(--spacing);
    }
    button {
      border-radius: 5px;
      border-color: transparent;
      padding: 0.25rem 0.5rem;
      text-transform: capitalize;
      letter-spacing: var(--spacing);
      background: var(--clr-primary-5);
      color: var(--clr-white);
      transition: var(--transition);
      cursor: pointer;
      &:hover {
        background: var(--clr-primary-8);
        color: var(--clr-primary-1);
      }
    }

    svg {
      color: var(--clr-grey-5);
    }
    input,
    button,
    svg {
      font-size: 1.3rem;
    }
    @media (max-width: 800px) {
      button,
      input,
      svg {
        font-size: 0.85rem;
      }
    }
  }
  h3 {
    margin-bottom: 0;
    color: var(--clr-grey-5);
    font-weight: 400;
  }
`;
const ErrorWrapper = styled.div`
  @keyframes moveInTop {
    0% {
        opacity: 0;
        transform: translateY(-3rem);
    }

    100% {
        opacity: 1;
        transform: translate(0);
    }
  }

  animation-name: moveInTop;
  animation-duration: .5s;
  animation-timing-function: ease-out;

  //width: 90vw;
  top: 0;
  left: 0;
  #transform: translateY(-100%);
  text-transform: capitalize;
  p {
    color: grey;
    letter-spacing: var(--spacing);
  }
`;
export default Search;
