// import logo from './logo.svg';
import "./App.css";
// import MyPage from './components/MyPage.js';
// import HelloWorld from  './components/HelloWorld.js';
// import BlinkComponent from './components/BlinkComponent.js';
// import CountComponent from './components/CountComponent.js';
// import ParentComponent from './components/ParentComponent.js';
// import ThemeButton from './components/ThemeButton.js';
// import { ThemeProvider } from './components/ThemeProvider.js';
// import ToDoApp from "./components/ToDoApp.js";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Button from "react-bootstrap/Button";
import { useContext } from "react";

// import {
//   PostsContext,
//   PostsProvider,
// } from "./components/community/PostsProvider.js";
import { PostsProvider } from "./components/community/PostsProvider.js";
import CommunityApp from "./components/community/CommunityApp.js";

function App() {
  return (
    // <ThemeProvider>
    //   <Button variant='primary'>기본</Button>
    //   <Button variant='danger'>Danger</Button>
    //   <Button variant='info'>Info</Button>
    // <ThemeButton />
    // <MyPage />
    // </ThemeProvider>
    <>
      <PostsProvider>
        <CommunityApp></CommunityApp>
      </PostsProvider>
    </>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       hello, 이동인ㅞ
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
