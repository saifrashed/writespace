import NavBar from '@/components/NavBar';
import React from 'react';
import Link from 'next/link';
import { Note } from '@/lib/types';
import { useRouter } from 'next/router';
import {
    highlightPlugin,
    MessageIcon,
    RenderHighlightContentProps,
    RenderHighlightsProps,
    RenderHighlightTargetProps,
} from '@react-pdf-viewer/highlight';
import { Button, Position, PrimaryButton, Tooltip, Viewer } from '@react-pdf-viewer/core';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';


const View: React.FC = () => {
    const router = useRouter();
    const { courseId, assignmentId } = router.query;
    const [message, setMessage] = React.useState('');
    const [notes, setNotes] = React.useState<Note[]>([]);
    const [grade, setGrade] = React.useState<number>(0);
    const [noteBar, setNotebar] = React.useState<boolean>(false);

    let noteId = notes.length;

    const noteEles: Map<number, HTMLElement> = new Map();


    const jumpToNote = (note: Note) => {
        if (noteEles.has(note.id)) {
            noteEles.get(note.id)?.scrollIntoView();
        }
    };

    const renderHighlights = (props: RenderHighlightsProps) => (
        <div>
            {notes.map((note) => (
                <React.Fragment key={note.id}>
                    {note.highlightAreas
                        .filter((area) => area.pageIndex === props.pageIndex)
                        .map((area, idx) => (
                            <div
                                key={idx}
                                style={Object.assign(
                                    {},
                                    {
                                        background: 'yellow',
                                        opacity: 0.4,
                                    },
                                    props.getCssProperties(area, props.rotation)
                                )}
                                onClick={() => jumpToNote(note)}
                                ref={(ref): void => {
                                    noteEles.set(note.id, ref as HTMLElement);
                                }}
                            />
                        ))}
                </React.Fragment>
            ))}
        </div>
    );

    const highlightPluginInstance = highlightPlugin({
        renderHighlights,
    });

    const { jumpToHighlightArea } = highlightPluginInstance;

    return (
        <div
            style={{ height: "100vh" }}
        >
            <div
                style={{
                    border: '1px solid rgba(0, 0, 0, 0.3)',
                    display: 'flex',
                    height: '100%',
                    overflow: 'hidden',
                }}
            >
                <div className='w-full'>
                    <div className="bg-white flex justify-center items-center overflow-x-scroll w-full" style={{ height: "10vh" }}>
                        <div>
                            <Link href={`/courses/${courseId}/assignment/${assignmentId}`}>
                                <button
                                    className="px-4 py-2 mr-2 inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-full">
                                    Go back
                                </button>
                            </Link>
                        </div>

                        <div>
                            <button onClick={() => { setNotebar(true) }}
                                className="px-4 py-2 mr-2 inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-full">
                                Watch notes ({notes.length})
                            </button>
                        </div>


                        <div>
                            <button
                                className="px-4 py-2 inline-block bg-gray-100 text-gray-800 text-sm font-medium rounded-full cursor-default">
                                Grade: 9
                            </button>
                        </div>
                    </div>
                    <div style={{ height: "90vh" }}>
                        <Viewer fileUrl={"/sample.pdf"} plugins={[highlightPluginInstance]} />
                    </div>
                </div>

                {/* Notes Bar */}
                <div className={"relative z-10 "} role="dialog" aria-modal="true">
                    <div
                        className={"pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 transition ease-in-out delay-250 " + (!noteBar && "translate-x-full")}>
                        <div className="pointer-events-auto relative w-screen max-w-md">
                            <div
                                className="flex h-full flex-col overflow-y-scroll hide-scrollbar bg-white  shadow-xl">
                                <div className="flex flex-col px-4 py-5 sm:px-6 bg-gray-500">
                                    <div className="flex justify-between">
                                        <h2 className=" text-2xl text-white">
                                            Notes
                                        </h2>
                                        <button type="button"
                                            className="rounded-md text-white"
                                            onClick={() => {
                                                setNotebar(false)
                                            }}>
                                            <span className="sr-only">Close panel</span>
                                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg"
                                                fill="none" viewBox="0 0 24 24" stroke-width="2"
                                                stroke="currentColor" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                    d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                    <span className="text-white text-xl font-light">
                                        Here are all the notes that the student will see.
                                    </span>
                                </div>

                                <div className="relative  flex-1">
                                    <div className="absolute inset-0 ">
                                        <ul className="divide-y divide-gray-200">

                                            {notes.length === 0 && <div className='text-center py-3'>There is no note</div>}
                                            {notes.map((note) => {
                                                return (
                                                    <li className="block hover:bg-gray-50 cursor-pointer" onClick={() => jumpToHighlightArea(note.highlightAreas[0])}>
                                                        <div className="px-4 py-4 sm:px-6">
                                                            <div
                                                                className="items-center justify-between">
                                                                <p className="text-md text-gray-700 font-light">
                                                                    "{note.quote}"
                                                                </p>
                                                                <p className="text-md text-gray-700  font-bold">
                                                                    {note.content}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </div>
    );
};

export default View;
