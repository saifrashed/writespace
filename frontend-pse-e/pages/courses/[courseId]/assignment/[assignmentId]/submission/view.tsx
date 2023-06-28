import NavBar from '@/components/NavBar';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Note } from '@/lib/types';
import { useRouter } from 'next/router';
import useSubmission from '@/lib/hooks/useSubmission';
import useAssignment from "@/lib/hooks/useAssignment";
import useAuthentication from '@/lib/hooks/useAuthentication';
import Lottie from "lottie-react"
import SpellingQuiz from '@/components/spellingQuiz'
import * as searchingAnimationData from "@/public/animations/searching.json";
import { Reply } from '@/lib/types';

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


/**
 * The view submission page component.
 *
 * @component
 * @returns {JSX.Element} The rendered view submission page.
 */
const View: React.FC = () => {
    const router = useRouter();
    const { assignmentId } = router.query;
    const [notes, setNotes] = React.useState<Note[]>([]);
    const [noteBar, setNotebar] = React.useState<boolean>(false);
    const { token } = useAuthentication()
    const { getSubmission, addReply, submission, fileNotes, fileUrl, grade } = useSubmission(token, assignmentId?.toString())

    const [showPopup, setShowPopup] = useState(false);

    const noteEles: Map<number, HTMLElement> = new Map();

    const jumpToNote = (note: Note) => {
        if (noteEles.has(note.id)) {
            noteEles.get(note.id)?.scrollIntoView();
        }
    };

    const handleDocumentLoad = () => {
        if (fileNotes) {
            setNotes(fileNotes)
        }
    }

    const addCommentReply = async (noteId: number, reply: string) => {
        if (notes) {
            const updatedNotes = [...notes]; // Create a copy of the original array
            const reply_object: Reply = {
                noteId: noteId,
                message: reply,
                userId: 0,
                user_name: "",
            };
            updatedNotes[noteId - 1].replies.push(reply_object);
            setNotes(updatedNotes);
        }
        if (assignmentId) {
            addReply(token, Number(assignmentId), reply, noteId, "");
        }
    };

    const renderHighlights = (props: RenderHighlightsProps) => (
        <div>
            {notes.map((note, index) => (
                <React.Fragment key={index}>
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

            {fileUrl && (
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

                            <div>
                                <button onClick={() => { setShowPopup(!showPopup) }}
                                    className="px-4 py-2 mr-2 inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-full">
                                    Revise spelling
                                </button>
                            </div>

                            <div>
                                <button
                                    className="px-4 py-2 inline-block bg-gray-100 text-gray-800 text-sm font-medium rounded-full cursor-default">
                                    Grade: {grade ? grade : " Waiting to be graded"}
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
                                                Comments
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
                                    <div className="relative flex-1">
                                        <div className="absolute inset-0 ">
                                            <ul className="divide-y divide-gray-200">
                                                {notes.length === 0 && <div className='text-center py-3'>There are no notes to view</div>}
                                                {notes.map((note, index) => {
                                                    const hasReplies = note.replies.length > 0;
                                                    return (
                                                        <>
                                                            <article className="p-6 text-base  bg-white rounded-lg " key={index} >
                                                                <div className='hover:bg-gray-50 cursor-pointer' onClick={() => jumpToHighlightArea(note.highlightAreas[0])}>
                                                                    <footer className="flex justify-between items-center mb-2">
                                                                        <div className="flex items-center">
                                                                            <p className="inline-flex items-center mr-3 text-sm text-gray-900 ">
                                                                                {note.author ? note.author : "Anonymous"}
                                                                            </p>
                                                                        </div>
                                                                    </footer>
                                                                    <p className="text-gray-500 ">{note.quote}</p>
                                                                    <p className="text-black text-bold ">{note.content}</p>
                                                                </div>

                                                            </article>
                                                            {hasReplies && (
                                                                <>
                                                                    {note.replies.map((reply, replyIndex) => (
                                                                        <article className="p-6 mb-6 ml-6 lg:ml-12 text-base bg-white rounded-lg " key={`${note.id}-reply-${replyIndex}`}>
                                                                            <footer className="flex justify-between items-center mb-2">
                                                                                <div className="flex items-center">
                                                                                    <p className="inline-flex items-center mr-3 text-sm text-gray-900">
                                                                                        {reply.user_name ? <p>{reply.user_name}</p> : <p>You</p>}
                                                                                    </p>
                                                                                    <p className="text-sm text-gray-600 "><time
                                                                                        title="February 12th, 2022">Feb. 12, 2022</time></p>
                                                                                </div>
                                                                            </footer>
                                                                            <p className="text-gray-500">{reply.message}</p>
                                                                        </article>
                                                                    ))}
                                                                </>
                                                            )}
                                                            {!note.fresh && (
                                                                <section className="bg-white ml-6 lg:ml-12 ">
                                                                    <div className="max-w-2xl mx-auto px-4 py-3">
                                                                        <form className="mb-6">
                                                                            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 ">
                                                                                <label className="sr-only">Your comment</label>
                                                                                <textarea id={`${note.id}-comment`}
                                                                                    className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none "
                                                                                    placeholder="Write a comment..." required></textarea>
                                                                            </div>
                                                                            <button type="submit"
                                                                                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-500 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
                                                                                onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    const comment = document.getElementById(`${note.id}-comment`).value;
                                                                                    if (comment) {
                                                                                        addCommentReply(note.id, comment);
                                                                                        document.getElementById(`${note.id}-comment`).value = "";
                                                                                    }
                                                                                }}
                                                                                >
                                                                                Post comment
                                                                            </button>
                                                                        </form>
                                                                    </div>
                                                                </section>
                                                            )}
                                                        </>
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
            )}

            {!fileUrl && (
                <>
                    <NavBar />

                    <div className="w-1/3 mx-auto mt-10 text-center">
                        <Lottie
                            loop={true}
                            autoplay={true}
                            animationData={searchingAnimationData}
                        />
                        <p className="text-3xl font-bold mb-5">This assignment has not been uploaded to Writespace.</p>
                        <button onClick={() => { router.back() }}
                            className="px-4 py-2 mr-2 inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 text-lg font-medium rounded-full">
                            Go back
                        </button>
                    </div>
                </>
            )}

            <SpellingQuiz fileUrl={fileUrl} showPopup={showPopup} togglePopup={() => { setShowPopup(!showPopup) }} />
        </div>
    );
};

export default View;
