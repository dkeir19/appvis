import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';
import Finnhub from 'finnhub';
import { api_key } from '../config.js'

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

// Provider, Consumer - GithubContext.Provider

const GithubProvider = ({ children }) => {
  
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  // request loading
  const [requests, setRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const[currentStock, setCurrentStock] = useState(0);
  const[currentStockName, setCurrentStockName] = useState(0);
  // error
  const [error, setError] = useState({ show: false, msg: '' });

  const [stockInfo, setStockInfo] = useState(0);
  const [stockNews, setStockNews] = useState(0);

  const [marketNews, setMarketNews] = useState(0)
  const [loggedUser, setLoggedUser] = useState(0)
  const [loginError, setLoginError] = useState('')

  const state =  [ ['AAPL', 'APPLE INC', 'https://static.finnhub.io/logo/87cb30d8-80df-11ea-8951-00000000092a.png'], ['NVDA', 'NVIDIA CORP', 'https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/NVDA.png']  ];

  const [watchStocks, setWatchStocks] = useState( state  );
  const [watchStocks2, setWatchStocks2] = useState( 0  );

  const[showLogin, setShowLogin] = useState(false);
  
  const toggleLogin = (setting) => {

    setShowLogin(setting);
  }


  const getCompanyProfile = async (stocks) => {
    const finnhub = require('finnhub');
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = api_key;
    const finnhubClient = new finnhub.DefaultApi();

    // get stockinfo
    const stockDetails = [];

    const thestocks = stocks.map( item => {

        let finnhubpromise = function(item) {
          return new Promise((resolve, reject) => {
            finnhubClient.companyProfile2({'symbol': item}, (error, data, response) => {
                  if (error ||      
                    ( data // 👈 null and undefined check
                    && Object.keys(data).length === 0)
                              
                    ) {

                    toggleError(true, 'there is no listed company with that name');
                  } else {
                    //console.log(JSON.stringify(data, null, 2) );
                    //stockDetails.push(data);-
                    resolve(data);
                  }

              }
            )
            });
        }
        return finnhubpromise(item);
      }
    )
  


  Promise.allSettled(thestocks)
  .then(responses => {

    for(let response of responses) {
      stockDetails.push(response.value);
    }

    setWatchStocks2(stockDetails);
    localStorage.setItem("userWatchlist", JSON.stringify(stockDetails));
  })

    
  }


  

  const searchStock = async (stock) => {

    const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

    if(userInfoFromStorage !== null) {
      setLoggedUser(userInfoFromStorage)
    }

    try{ 
    const userStockFromStorage = localStorage.getItem("userWatchlist")
    ? JSON.parse(localStorage.getItem("userWatchlist"))
    : null;
  
    if(userStockFromStorage !== null) {
      setWatchStocks2(userStockFromStorage)
    }
  }
  catch(e) {}
    
    const finnhub = require('finnhub');
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = "c8cjreaad3i9nv0coua0"
    const finnhubClient = new finnhub.DefaultApi()


    const date1= parseInt((new Date('2022.04.01').getTime() / 1000).toFixed(0))
    const date2= parseInt((new Date('2022.04.25').getTime() / 1000).toFixed(0))

    var getDaysArray = function(start, end) {
      for(var arr=[],dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
          arr.push(new Date(dt));
      }
      return arr;
    };
    const daysArray=getDaysArray("2012-08-10","2022-04-12")
    // console.log('got stock');
    // console.log(JSON.stringify(daysArray, null, 2) );

    // Stock candles
    console.log({stock}.stock);
    if( {stock} !== "" ) {
      finnhubClient.stockCandles({stock}.stock, "D", date1, date2, (error, data, response) => {
        if (error || data.s=="no_data" ) {
          toggleError(true, 'there is no listed company with that name');
        } else {
          console.log(JSON.stringify(data, null, 2) );
          const temp=[]
          const appended=[]
          for(var i = 0; i < data.h.length; i++) {
            //temp[i]=[ daysArray[i].toISOString().substring(0, 10), data.o[i], data.h[i], data.l[i], data.c[i], data.v[i]]
            let d = new Date(0); // The 0 there is the key, which sets the date to the epoch
            d.setUTCSeconds(data.t[i]);
            temp[i]= {x: d.valueOf() , o:data.o[i], h:data.h[i], l:data.l[i], c: data.c[i] }
            appended[i]=temp[i]
          }
          console.log(typeof(data.t[1]));
          console.log(appended );
          //daysArray[i].toString().slice(1,10)
          //console.log(data.h);
  
          setCurrentStock(appended);
          setCurrentStockName({stock}.stock)
        }

      });


      // get stockinfo
      finnhubClient.companyProfile2({'symbol': {stock}.stock}, (error, data, response) => {
        if (error || 
          
         ( data // 👈 null and undefined check
          && Object.keys(data).length === 0)
                    
          ) {
        
          toggleError(true, 'there is no listed company with that name');
        } else {
          console.log(JSON.stringify(data, null, 2) );
          setStockInfo(data);
        }
      });

      // get stock news
      var today = new Date();
   
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();

      today = yyyy + '-' + mm + '-' + dd;

      var yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      dd = String(yesterday.getDate()).padStart(2, '0');
      mm = String(yesterday.getMonth() + 1).padStart(2, '0'); //January is 0!
      yyyy = yesterday.getFullYear();

      yesterday = yyyy + '-' + mm + '-' + dd;

      finnhubClient.companyNews( {stock}.stock, yesterday, today, (error, data, response) => {
        if (error) {
            console.error(error);
        } else {
            console.log(data)
            setStockNews(data);
        }
      });

      // General news
      finnhubClient.marketNews("general", {}, (error, data, response) => {
        setMarketNews(data)
      });
    


    }

  }

  const logout = () => {
    localStorage.removeItem("userInfo");
    setLoggedUser(0);
  }

  const login = async (email, password) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/users/login",
        { email, password },
        config
      );

      setLoggedUser(data)
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      error.response && error.response.data.message
      ? setLoginError(error.response.data.message)
      : setLoginError(error.message)
    }
  }

  const registerUser = async (name, email, password) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
 
      const { data } = await axios.post(
        "/api/users",
        { name, email, password },
        config
      );
  
     
      setLoggedUser(data)
      localStorage.setItem("userInfo", JSON.stringify(data));

      
      setWatchStocks2(data.savedStocks);
      getCompanyProfile(data.savedStocks);
      localStorage.setItem("userWatchlist", JSON.stringify(data.savedStocks));
    } catch (error) {
     
    }
  };

  const addToWatch = async (ticker) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
 
      const { data } = await axios.post(
        "/api/users/watchlist",
        { ticker, loggedUser},
        config
      );
  
     
      setLoggedUser(data)
      localStorage.setItem("userInfo", JSON.stringify(data));

    

      // bring back stock summary from finnhub
      getCompanyProfile(data.savedStocks);


    } catch (error) {
     
    }
  };

  const removeStock = async (ticker, user) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
 
      const { data } = await axios.post(
        "/api/users/watchlistremove",
        { ticker, loggedUser},
        config
      );
  
     
      setLoggedUser(data)
      setWatchStocks2(watchStocks2.filter( record => record.ticker !== ticker) );
      // setWatchStocks2(data.savedStocks);
      localStorage.setItem("userInfo", JSON.stringify(data));
      localStorage.setItem("userWatchlist", watchStocks2)


    } catch (error) {
     
    }
  };


  const searchGithubUser = async (user) => {
    toggleError();
    setIsLoading(true);
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    );
    if (response) {
      setGithubUser(response.data);
      const { login, followers_url } = response.data;

      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ])
        .then((results) => {
          const [repos, followers] = results;
          const status = 'fulfilled';
          if (repos.status === status) {
            setRepos(repos.value.data);
          }
          if (followers.status === status) {
            setFollowers(followers.value.data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      toggleError(true, 'there is no user with that username');
    }
    checkRequests();
    setIsLoading(false);
  };

  //  check rate
  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        setRequests(remaining);
        if (remaining === 0) {
          toggleError(true, 'sorry, you have exceeded your hourly rate limit!');
        }
      })
      .catch((err) => console.log(err));
  };
  function toggleError(show = false, msg = '') {
    setError({ show, msg });
  }


  useEffect(() => {
    searchStock('AAPL');
  }, []);
  // error
  useEffect(checkRequests, []);
  //get initial user
  useEffect(() => {
    searchGithubUser('john-smilga');
  }, []);
  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchStock,
        searchGithubUser,
        loggedUser,
        login,
        loginError,
        registerUser,
        logout,
        getCompanyProfile,
        watchStocks,
        watchStocks2,
        removeStock,
        stockInfo,
        stockNews,
        marketNews,
        isLoading,
        currentStock,
        currentStockName,
        addToWatch,
        showLogin,
        toggleLogin,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
