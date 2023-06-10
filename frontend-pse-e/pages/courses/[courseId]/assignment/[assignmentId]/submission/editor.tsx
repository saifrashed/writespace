import NavBar from '@/components/NavBar';
import React from 'react';

import dynamic from 'next/dynamic';
const PDFeditor = dynamic(() => import('../../../../../../components/PDFeditor'), { ssr: false });


const Editor = () => {
    return (
        <div className="pt-20">
            <NavBar />
            <PDFeditor />
        </div>
    );
};

export default Editor;