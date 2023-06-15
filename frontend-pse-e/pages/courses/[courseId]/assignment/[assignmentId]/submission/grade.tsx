import NavBar from '@/components/NavBar';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { Note } from '@/lib/types';
import { useRouter } from 'next/router';
import Lottie from "lottie-react"
import * as submittedAnimationData from "@/public/animations/greenTick.json";
import useSubmission from '@/lib/hooks/useSubmission';
import useAuthentication from '@/lib/hooks/useAuthentication';

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

const Grade: React.FC = () => {
    const router = useRouter();
    const { courseId, assignmentId } = router.query;
    const [message, setMessage] = React.useState('');
    const [notes, setNotes] = React.useState<Note[]>([]);
    const [grade, setGrade] = React.useState<number>(0);
    const [noteBar, setNotebar] = React.useState<boolean>(false);
    const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const { gradeSubmission, getSubmissionDocument, fileUrl, fileNotes } = useSubmission()
    const { token } = useAuthentication()

    useEffect(() => {
        if (assignmentId) {
            getSubmissionDocument(assignmentId.toString(), token)
        }
    }, [])

    useEffect(() => {
        console.log(fileUrl)
    }, [fileUrl])

    const handleDocumentLoad = () => {
        if (fileNotes) {
            setNotes(fileNotes);
        }
    };

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
                        <button onClick={addNote}
                            className="px-4 py-2 mr-2 inline-block bg-blue-500  text-white text-sm font-medium rounded-full">
                            Add Note
                        </button>
                    </div>
                    <button onClick={props.cancel}
                        className="px-4 py-2 mr-2 inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-full">
                        Cancel
                    </button>
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
            {/* If Teacher still has to submit the grade */}
            {!isSubmitted && (
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
                                <button onClick={() => { router.back() }}
                                    className="px-4 py-2 mr-2 inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-full">
                                    Go back
                                </button>
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
                                        onClick={() => { setGrade(grade - 1) }}

                                        type="button"
                                        className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
                                    >
                                        -
                                    </button>

                                    <input
                                        type="number"
                                        value={grade}
                                        max={10}
                                        readOnly
                                        className="h-10 w-16 rounded border-gray-200 text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                                    />

                                    <button
                                        onClick={() => { setGrade(grade + 1) }}
                                        type="button"
                                        className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div>
                                <button
                                    className="px-4 py-2 inline-block bg-gray-100  hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-full" onClick={() => { setShowModal(true) }}>
                                    Submit grade
                                </button>
                            </div>
                            <div>
                                <button
                                    className="px-4 py-2 inline-block bg-gray-100  hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-full" onClick={() => { setShowModal(true) }}>
                                    Assign badges
                                </button>
                            </div>
                        </div>
                        <div style={{ height: "90vh" }}>
                            {fileUrl && (
                                <Viewer fileUrl={fileUrl} plugins={[highlightPluginInstance]} onDocumentLoad={handleDocumentLoad} />
                            )}
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
                                                    fill="none" viewBox="0 0 24 24" strokeWidth="2"
                                                    stroke="currentColor" aria-hidden="true">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                        d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                        <span className="text-white text-xl font-light">
                                            Comments about your assignment.
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

                    <div tabIndex={-1} className={"fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50  p-4 overflow-x-hidden overflow-y-auto md:inset-0  max-h-full " + (showModal ? " " : " hidden")}>
                        <div className="relative w-full max-w-md max-h-full mx-auto">
                            <div className="relative bg-white rounded-lg shadow ">
                                <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center " data-modal-hide="popup-modal">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" onClick={() => { setShowModal(false) }} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                                <div className="p-6 text-center">
                                    <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    <h3 className="mb-5 text-lg font-normal text-gray-500 ">Are you sure you want to submit this grade?</h3>
                                    <button data-modal-hide="popup-modal" onClick={() => { setIsSubmitted(true); setShowModal(false); gradeSubmission(grade, notes, token, assignmentId) }} type="button" className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                        Yes, I'm sure
                                    </button>
                                    <button data-modal-hide="popup-modal" onClick={() => { setShowModal(false) }} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 ">No, cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* If Teacher submitted the grade */}
            {isSubmitted && (
                <>
                    <NavBar />

                    <div className="w-1/3 mx-auto mt-10 text-center">
                        <Lottie
                            loop={false}
                            autoplay={true}
                            animationData={submittedAnimationData}
                        />
                        <p className="text-3xl font-bold mb-5">Grade has been submitted!</p>
                        <button onClick={() => { router.back() }}
                            className="px-4 py-2 mr-2 inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 text-lg font-medium rounded-full">
                            Go back
                        </button>
                    </div>
                </>
            )}
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




{/* <div tabIndex={-1} className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50  p-4 overflow-x-hidden overflow-y-auto md:inset-0  max-h-full">
                    <div className="relative w-full max-w-md max-h-full mx-auto">
                        <div className="relative bg-white rounded-lg shadow ">
                            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center " data-modal-hide="popup-modal">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="p-6 text-center">
                                <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <h3 className="mb-5 text-lg font-normal text-gray-500 ">Are you sure you want to delete this product?</h3>
                                <button data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                    Yes, I'm sure
                                </button>
                                <button data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 ">No, cancel</button>
                            </div>
                        </div>
                    </div>
                </div> */}
