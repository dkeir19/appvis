import React from 'react';
import { Info, Repos, User, Search, Navbar, Marketnews, SavedStocks } from '../components';
import loadingImage from '../images/preloader.gif';
import { GithubContext } from '../context/context';
const Dashboard = () => {
  const { isLoading } = React.useContext(GithubContext);

  if (isLoading) {
    return (
      <main>
        <Navbar />
        <Search />
        <img src={loadingImage} className='loading-img' alt='loding' />
      </main>
    );
  }
  return (
    <main>
       {/* <Info /> */}
      
      <Navbar></Navbar>
      
      <Search />
      <User />
    
      
      {/* <Repos /> */}
     
      <Marketnews />
      
    </main>
  );
};

export default Dashboard;
