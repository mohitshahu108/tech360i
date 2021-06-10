import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function LoadingBox() {
    
    return (
        <div  className="loading-box"> 
            <CircularProgress color="primary" />Loading...
        </div>
    )
}
