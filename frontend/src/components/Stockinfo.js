import React from 'react';
import { GithubContext } from '../context/context';
import styled from 'styled-components';
import { MdBusiness, MdLocationOn, MdLink, MdInsertChart, MdAttachMoney } from 'react-icons/md';
const Stockinfo = () => {
  const { stockInfo, stockNews, addToWatch, loggedUser, toggleLogin } = React.useContext(GithubContext);
  const {
    weburl,
    name,
    logo,
    ticker,
    exchange,
    finnhubIndustry,
    company,
    country,
  } = stockInfo;
  //const {a} = stockNews;



  console.log(JSON.stringify(loggedUser, null, 2) );
  
  const handleAddWatch = (e) => {
    e.preventDefault();
    console.log('in handleaddwatch');
    addToWatch(ticker);
  };


  const signin = (e) => {
    e.preventDefault();
    toggleLogin(true);
  }
  // const handleError = (this) => {
  //   this.parentElement.innerHTML = '';
  // }

  return (
    <Wrapper>
      <header>
        
        <img src={logo} alt={name} />
       
        <div>
          <h4>{name}</h4>
          {/* <p>@{twitter_username || 'john doe'}</p> */}
        </div>

        {loggedUser  ? (
          <a onClick={(e) => { handleAddWatch(e,ticker); } } className="menu-item--small" href="">Add to my watch list</a>
        ) : (
          <p><a onClick={(e) => signin(e) } className="menu-item--small" href="">Sign in</a> to add to watchlist</p>
        )
        }



      </header>
      <p className='bio'></p>
      <div className='links'>
   
        <p>
          <MdLocationOn></MdLocationOn> {country}
        </p>
        <p><MdAttachMoney></MdAttachMoney>{exchange}</p>
        <br/>
        <p><MdBusiness></MdBusiness>{finnhubIndustry}</p>
        <p><MdInsertChart></MdInsertChart>{ticker}</p>
        <a href={`https://${weburl}`}>
          <MdLink></MdLink>
          {weburl}
        </a>
      </div>   
        {stockNews != 0 ? stockNews.slice(0,2).map((news, index) => {
          // const { avatar_url: img, html_url, login } = follower;
          const {image, headline, summary, url} = news
          return (
            <div key={index}>
             
              <img src={image} id='aa' onError={i => i.target.style.display='none'}   alt={headline}/>
            
              <h4>{headline}</h4>
              <p>{summary} <a href={url}>article &#10095;&#10095;</a></p>
            
            </div>
            // <div>{news['headline']}</div>
            
          )
        }) : ''}



     
    </Wrapper>
  );
};
const Wrapper = styled.article`
  grid-row-start: 1;
  grid-row-end: 4;
  margin-bottom:1rem;
  background: var(--clr-white);
  padding: 1.5rem 2rem;
  border-top-right-radius: var(--radius);
  border-bottom-left-radius: var(--radius);
  border-bottom-right-radius: var(--radius);
  position: relative;
  &::before {
    content: 'Stock';
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
  div {
    position:relative;
    img {
      // width: 150px;
      // height: 150px;
      height:200px;
      opacity:0.65;
      object-fit:cover;
      margin-top:10px;
      margin-bottom:20px;
    }
    h4 {
      position: relative;
      //top:-200%;
      //transform: translateY(-125%);
      font-size:14px;
      //left:0.5rem;
      z-index:2;
      background-color:#fff;
      padding: 8px 0px 0px 0px;
      //margin:5px;
      margin-bottom:0px;
    }
    p {
      // position:absolute;
      // top:11rem;
      a {
        display:inline-block;
      }
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
      margin-bottom: 0;
    }
    a {
      color: var(--clr-primary-5);
      border: 1px solid var(--clr-primary-5);
      padding: 0.25rem 0.75rem;
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
  .links {
    p,
    a {
      margin-bottom: 0.25rem;
      display: inline;
     
      align-items: center;
      margin-bottom:10px;
      margin-right:20px;
      svg {
        margin-right: 0.25rem;
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
  }
`;
export default Stockinfo;
