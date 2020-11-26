import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import CssBaseline from '@material-ui/core/CssBaseline';

export default function PageNotFound(){
    return (
        <div className="empty">
                  <CssBaseline />

        <FontAwesomeIcon icon={faFolderOpen} className="empty-icon"/><br/>
            <h2 className="center">Parece que esta página no existe...</h2>
        </div>
    );
}