import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Quotes from './components/Quotes';
import Quote from './components/Quote';

function App() {
    return (
        <Layout>
            <BrowserRouter>
                <Routes>
                    <Route path="/" exact element={<Quotes />} />
                    <Route path="/quote/:movieId" exact element={<Quote />} />
                </Routes>
            </BrowserRouter>
        </Layout>
    );
}

export default App;