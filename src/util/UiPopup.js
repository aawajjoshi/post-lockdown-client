import React from 'react';
import { Popup } from 'semantic-ui-react';

function UiPopup({ content, children }){

    return <Popup inverted content={content} trigger={children} />
}

export default UiPopup;