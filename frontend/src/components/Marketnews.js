import React from 'react';
import { GithubContext } from '../context/context';
import styled from 'styled-components';
import loadingImage from '../images/preloader.gif';
import { MdBusiness, MdLocationOn, MdLink } from 'react-icons/md';
const Marketnews = () => {
  const { marketNews } = React.useContext(GithubContext);

  return (
    <section className='section' id='market-news'>
    <Wrapper className='section-center'>

    {marketNews? (
                   marketNews != 0 ? marketNews.slice(0,5).map((news, index) => {
                    const { category, datetime, headline, image, source, summary, url } = news;
          
                    return (
                      
                      <article key={index}>
                        {/* <img src={image} alt={headline}/> */}
                        <h4>{headline}</h4>
                        <p>{summary}</p>
                        <p><a href={url}>{url}</a></p>
                      </article>
                      // <div>{news['headline']}</div>
                      
                    )
                  }) : ''
        ) : (
         
           <img src={loadingImage} className='loading-img' alt='loding' />
        )}




    </Wrapper>

    </section>
  );
};
const Wrapper = styled.article`
 
  background: var(--clr-white);
  padding: 1.5rem 2rem;
  border-top-right-radius: var(--radius);
  border-bottom-left-radius: var(--radius);
  border-bottom-right-radius: var(--radius);
  position: relative;
  &::before {
    content: 'Market news';
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
  article {
    margin-bottom:10px;
    img {
      width: 150px;
      height: 150px;
      
    }
  }
  header {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    column-gap: 1rem;
    margin-bottom: 1rem;
    img {
      width: 75px;
      height: 75px;
      border-radius: 50%;
    }
    h4 {
      //margin-bottom: 0.25rem;
    }
    p {
      margin-bottom: 0px;
    }
    a {
      color: var(--clr-primary-5);
      border: 1px solid var(--clr-primary-5);
      //padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      text-transform: capitalize;
      letter-spacing: var(--spacing);
      transition: var(--transition);
      cursor: pointer;
      &:hover {
        background: var(--clr-primary-5);
        color: var(--clr-white);
      }
    }
  }
  .bio {
    color: var(--clr-grey-3);
  }

    p,
    a {
      //margin-bottom: 0.25rem;
      margin-bottom:0px !important;
      display: flex;
      align-items: center;
      svg {
        margin-right: 0.5rem;
        font-size: 1.3rem;
      }
    }
    a {
      color: var(--clr-primary-5);
      transition: var(--transition);
      svg {
        color: var(--clr-grey-5);
      }
      &:hover {
        color: var(--clr-primary-3);
      }
    }
`;
export default Marketnews;
