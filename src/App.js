import React from 'react';
import './App.css';
import Header from './Components/Header';
import ComponentTree from './Components/ComponentTree';

function App() {

  const componentTreeData = {
    name: 'App',
    props: {prop1: 'value'},
    state: {state1: 'value1'},
    children: [
      {
        name: 'ChildComponent',
        props: {prop1: 'value1'},
        state: {prop2: 'value2'}
      }
      //I can add other child components here
    ]
  }
  return (
    <div className="App">
     <Header appName="React Debugger" />
     <ComponentTree componentTreeData={componentTreeData} />
    </div>
  );
}

export default App;
