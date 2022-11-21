import React from "react";
import Routing from "./Routing";
import { ProfileProvider } from "./context/ProfileProvider";
import Loading from "./customComponent/Loading";
import LoaderHelper from "./customComponent/Loading/LoaderHelper";

function App() {
  return (
    <ProfileProvider>
      <Routing />
      <Loading ref={ref => LoaderHelper.setLoader(ref)} />
    </ProfileProvider>
      
  );
}

export default App;
