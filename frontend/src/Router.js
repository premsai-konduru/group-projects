import React from 'react';
import { Route, Routes} from 'react-router-dom';
import Missing from './components/Missing';
import Activities from './components/Activities';
import NewActivity from './components/NewActivity';

const Router = () => {
    return (
        <>
            <Routes>
                <Route path="/*" element={<Activities />} />
                <Route path="/new" element={<NewActivity />} />
                <Route path="*" element={<Missing />} />
            </Routes>
        </>
    );
};

export default Router;
