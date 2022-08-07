import React, { useContext } from "react";
import Log from "../components/Log";
import NewPostForm from "../components/Post/NewPostForm";
import Thread from "../components/Thread";
import { UidContext } from "../components/AppContext";

const Home = () => {
const uid = useContext(UidContext);

  return (
    <div className="home">
      <div className="main">
      {uid ? (
        <div>
          <div>
        <NewPostForm />
        </div>
        <div> 
        <Thread />
        </div>
      </div>
      ) : (
        <div className="home-header">
          <Log signin={false} signup={true} />
          <img src="./img/icon-left-font.svg" alt="img-log" />
        </div>
      )}
      </div>
    </div>
  );
};

export default Home;