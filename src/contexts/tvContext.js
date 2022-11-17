import React, { useState } from "react";

export const TvContext = React.createContext(null);

const TvContextProvider = (props) => {
  const [favorites, setFavorites] = useState( [] )
  const [mustWatch, setMustWatch] = useState( [] )
  const [myReviews, setMyReviews] = useState( {} ) 

  const addToFavorites = (tv) => {
    let newFavorites = [];
    if (!favorites.includes(tv.id)){
      newFavorites = [...favorites, tv.id];
    }
    else{
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites)
  };

  // We will use this function in a later section
  const removeFromFavorites = (tv) => {
    setFavorites( favorites.filter(
      (tvId) => tvId !== tv.id
    ) )
  };

  const addReview = (tv, review) => {
    setMyReviews( {...myReviews, [tv.id]: review } )
  };

  const addToMustWatch = (tv) => {
    let newMustWatch = [];
    if (!mustWatch.includes(tv.id)){
      newMustWatch = [...mustWatch, tv.id];
    }
    else{
      newMustWatch = [...mustWatch];
    }
    setMustWatch(newMustWatch)
    console.log(newMustWatch)
  };

  return (
    <TvContext.Provider
      value={{
        favorites,
        mustWatch,
        addToFavorites,
        removeFromFavorites,
        addReview,
        addToMustWatch
      }}
    >
      {props.children}
    </TvContext.Provider>
  );
};

export default TvContextProvider;