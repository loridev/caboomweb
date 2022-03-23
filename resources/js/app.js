/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

//require('./components/Example');

import Example from './components/Example';
import Home from './pages/Home';
import { render } from 'react-dom';
import React from 'react';
import Navbar from './UI/Navbar/Navbar';
import NavLink from './UI/Navbar/NavLink';
import css from './../css/app.css';

function App() {
    const LINKS = [
        {
            to: '#home',
            text: 'Home'
        },
        {
            to: '#aboutus',
            text: 'About us'
        },        {
            to: '#contact',
            text: 'Contact'
        },        {
            to: '#signin',
            text: 'Sign in'
        },
    ]
    return(
        <>
            <Navbar>
                {LINKS.map((link) => <NavLink to={link.to} text={link.text} key={link.text} />)}
            </Navbar>
        </>
    );
}

export default App;

if (document.getElementById('root')) {
    render(
        (
            <React.StrictMode>
                <App />
            </React.StrictMode>
        ),
        document.getElementById('root')
    );
}