import React, { useState, useEffect } from "react";
import RestaurantComp from "./RestaurantComp";

function RestaurantList({ results, filteredResults }) {
  let restaurants;

  console.log("logging restaurants")
  console.log(results);

  restaurants = results.map((result) => (
    <RestaurantComp 
    key={result.business_id}
    busId={result.business_id}
      name={result.name}
      description={result.description}
      address={result.address}
      city={result.city}
      rating={result.rating}
      review_count={result.review_count}
      open_state={result.state}
      types={result.types}
      hours={result.working_hours}
      website={result.website}
      price_level={result.price_level}
      photos={result.photos}
    />
  ));

  return <div>{restaurants}</div>;
}

export default RestaurantList;
