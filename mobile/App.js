import React, { useState, useEffect } from 'react';
import { RootNavigatior } from "./src/routes";

import { isSignedIn } from './src/services/auth';

export default function App() {

  const [signed, setSigned] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(  () => {

       isSignedIn()
      .then(  res => {  
        setSigned(res);
        setIsLoading(false);
      } )
      .catch(err => alert("An error occurred"));
    }, []);

    if (isLoading) {
      return null;
    }

    console.log("signed: ", signed);

    return <RootNavigatior signed={signed} />
}




