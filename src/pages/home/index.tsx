import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div>
      <h1>Home</h1>
      <div><Link to='/download'>分片下载</Link></div>
    </div>
  );
};
export default Home;