import NavBar from '@/components/NavBar';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import {
    highlightPlugin,
    HighlightArea,
    MessageIcon,
    RenderHighlightContentProps,
    RenderHighlightsProps,
    RenderHighlightTargetProps,
} from '@react-pdf-viewer/highlight';
import { Button, Position, PrimaryButton, Tooltip, Viewer } from '@react-pdf-viewer/core';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

interface DisplayNotesSidebarExampleProps {
    fileUrl: string;
}

interface Note {
    id: number;
    content: string;
    highlightAreas: HighlightArea[];
    quote: string;
}

const Grade: React.FC<DisplayNotesSidebarExampleProps> = () => {
    const router = useRouter();
    const { courseId, assignmentId } = router.query;
    const [message, setMessage] = React.useState('');
    const [notes, setNotes] = React.useState<Note[]>([]);
    const [noteBar, setNotebar] = React.useState<boolean>(false);

    let noteId = notes.length;


    const noteEles: Map<number, HTMLElement> = new Map();

    const renderHighlightTarget = (props: RenderHighlightTargetProps) => (
        <div className='absolute flex z-10'
            style={{
                background: '#eee',
                left: `${props.selectionRegion.left}%`,
                top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
                transform: 'translate(0, 8px)',
            }}
        >
            <Tooltip
                position={Position.TopCenter}
                target={
                    <Button onClick={() => { props.toggle() }}>
                        <MessageIcon />
                    </Button>
                }
                content={() => <div style={{ width: '100px' }}>Add a note</div>}
                offset={{ left: 0, top: -8 }}
            />
        </div>
    );

    const renderHighlightContent = (props: RenderHighlightContentProps) => {
        const addNote = () => {
            if (message !== '') {
                const note: Note = {
                    id: ++noteId,
                    content: message,
                    highlightAreas: props.highlightAreas,
                    quote: props.selectedText,
                };
                setNotes(notes.concat([note]));
                props.cancel();
            }
        };

        return (
            <div
                className='rounded-lg border border-gray-300 bg-white p-4 absolute z-10 shadow-lg'
                style={{
                    left: `${props.selectionRegion.left}%`,
                    top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
                }}
            >
                <div>

                    <textarea rows={3} onChange={(e) => setMessage(e.target.value)} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 " placeholder="Write your comment here..."></textarea>
                </div>
                <div
                    style={{
                        display: 'flex',
                        marginTop: '8px',
                    }}
                >
                    <div style={{ marginRight: '8px' }}>
                        <PrimaryButton onClick={addNote}>Add</PrimaryButton>
                    </div>
                    <Button onClick={props.cancel}>Cancel</Button>
                </div>
            </div>
        );
    };

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
        renderHighlightTarget,
        renderHighlightContent,
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
                {/* <div
                    style={{
                        borderRight: '1px solid rgba(0, 0, 0, 0.3)',
                        width: '25%',
                        overflow: 'auto',
                    }}
                >
                    {notes.length === 0 && <div style={{ textAlign: 'center' }}>There is no note</div>}
                    {notes.map((note) => {
                        return (
                            <div
                                key={note.id}
                                style={{
                                    borderBottom: '1px solid rgba(0, 0, 0, .3)',
                                    cursor: 'pointer',
                                    padding: '8px',
                                }}
                                // Jump to the associated highlight area
                                onClick={() => jumpToHighlightArea(note.highlightAreas[0])}
                            >
                                <blockquote
                                    style={{
                                        borderLeft: '2px solid rgba(0, 0, 0, 0.2)',
                                        fontSize: '.75rem',
                                        lineHeight: 1.5,
                                        margin: '0 0 8px 0',
                                        paddingLeft: '8px',
                                        textAlign: 'justify',
                                    }}
                                >
                                    {note.quote}
                                </blockquote>
                                {note.content}
                            </div>
                        );
                    })}
                </div> */}
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

                        <div className='inline-block'>
                            <div className="flex items-center gap-1">
                                <button
                                    type="button"
                                    className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
                                >
                                    -
                                </button>

                                <input
                                    type="number"
                                    value="1"
                                    max={10}
                                    className="h-10 w-16 rounded border-gray-200 text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                                />

                                <button
                                    type="button"
                                    className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div>
                            <button
                                className="px-4 py-2 inline-block bg-gray-100  hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-full">
                                Submit grade
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
                                <div className="flex flex-col px-4 py-5 sm:px-6 bg-yellow-500">
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

export default Grade;



{/* <div className='inline-block'>
                            <div className="flex overflow-x-auto space-x-5 ">
                                <img src="https://w7.pngwing.com/pngs/710/523/png-transparent-badge-gold-badge-template-gold-shield-logo-shield-badges-and-labels.png" className="h-10 w-10 rounded-full" />
                                <img src="https://w7.pngwing.com/pngs/710/523/png-transparent-badge-gold-badge-template-gold-shield-logo-shield-badges-and-labels.png" className="h-10 w-10 rounded-full" />
                                <img src="https://w7.pngwing.com/pngs/710/523/png-transparent-badge-gold-badge-template-gold-shield-logo-shield-badges-and-labels.png" className="h-10 w-10 rounded-full" />
                                <img src="https://w7.pngwing.com/pngs/710/523/png-transparent-badge-gold-badge-template-gold-shield-logo-shield-badges-and-labels.png" className="h-10 w-10 rounded-full" />
                                <img src="https://w7.pngwing.com/pngs/710/523/png-transparent-badge-gold-badge-template-gold-shield-logo-shield-badges-and-labels.png" className="h-10 w-10 rounded-full" />
                                <img src="https://w7.pngwing.com/pngs/710/523/png-transparent-badge-gold-badge-template-gold-shield-logo-shield-badges-and-labels.png" className="h-10 w-10 rounded-full" />
                                <img src="https://w7.pngwing.com/pngs/710/523/png-transparent-badge-gold-badge-template-gold-shield-logo-shield-badges-and-labels.png" className="h-10 w-10 rounded-full" />
                            </div>
                        </div> */}
