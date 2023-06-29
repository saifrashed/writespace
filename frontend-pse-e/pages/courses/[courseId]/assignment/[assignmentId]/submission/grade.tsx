import NavBar from '@/components/NavBar';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { Badge, Note } from '@/lib/types';
import { useRouter } from 'next/router';
import Lottie from "lottie-react"
import * as submittedAnimationData from "@/public/animations/greenTick.json";
import useSubmission from '@/lib/hooks/useSubmission';
import useAuthentication from '@/lib/hooks/useAuthentication';
import useUser from '@/lib/hooks/useUser';
import useBadges from '@/lib/hooks/useBadges';
import useAssignment from '@/lib/hooks/useAssignment';
import { useNotification } from '@/lib/hooks/useNotification';
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
 * The grade page component.
 *
 * @component
 * @returns {JSX.Element} The rendered grade page.
 */
const Grade: React.FC = () => {
    const router = useRouter();
    const { courseId, assignmentId, user } = router.query;
    const { token } = useAuthentication()
    const { onWarning, onSuccess } = useNotification();
    const [message, setMessage] = React.useState('');
    const [notes, setNotes] = React.useState<Note[]>([]);
    const [grade, setGrade] = React.useState<number>(1);
    const [noteBar, setNotebar] = React.useState<boolean>(false);
    const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [showBadgeModal, setBadgeModal] = React.useState<boolean>(false);
    const [badgeClicked, setBadgeClicked] = React.useState<boolean[]>([]);
    const [assignedBadges, setAssignedBadges] = React.useState<number[]>([]);
    const { updateUserExperiencePoints } = useUser(token)
    const { assignment } = useAssignment(token, courseId?.toString(), assignmentId?.toString()); // When navigating to a course via url

    const { gradeSubmission, getSubmission, addReply, fileUrl, fileNotes, submission } = useSubmission(token, assignmentId?.toString(), user?.toString())
    const { user:grader, addUserBadges} = useUser(token)
    const { badges } = useBadges(token)


    function removeObjectsByBadgeIds(arr: any[], badgeIdsToRemove: number[]): any[] {
        return arr.filter((obj) => !badgeIdsToRemove.includes(obj.badgeId));
    }

    const automaticBadges = [2, 13, 14, 15, 16, 17, 18, 19, 20]

    const filteredBadges = removeObjectsByBadgeIds(badges, automaticBadges)


    function isBadgePresent(badgeId: number) {
        return grader?.badges.some(badge => (badge.badgeId === badgeId && badge.courseId === parseInt(courseId) && badge.assignmentId === parseInt(assignmentId)));
    }


    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    const openBadgeModal = () => {
        setBadgeModal(true);
    };

    const closeBadgeModal = () => {
        setBadgeModal(false);
    };

    const handleBadgeClick = (index: number, badge: Badge) => {
        let newBadgeClicked = [...badgeClicked];
        newBadgeClicked[index] = !badgeClicked[index];
        setBadgeClicked(newBadgeClicked);

        let newAssignedBadges = [...assignedBadges];

        if (newBadgeClicked[index]) {
            newAssignedBadges.push(badge.badgeId);
        }
        else {
            newAssignedBadges = newAssignedBadges.filter((item) => item !== badge.badgeId);
        }

        setAssignedBadges(newAssignedBadges);
    };

    const addCommentReply = async (noteId: number, reply: string) => {
        const date = new Date().toLocaleString("en-UK");
        if (notes) {
            const updatedNotes = [...notes]; // Create a copy of the original array
            const reply_object: Reply = {
                noteId: noteId,
                message: reply,
                userId: 0,
                user_name: "",
                date: date,
            };
            updatedNotes[noteId - 1].replies.push(reply_object);
            setNotes(updatedNotes);
        }
        if (assignmentId && user) {
            addReply(token, Number(assignmentId), reply, noteId, user?.toString(), date);
        }
    };

    const handleDocumentLoad = () => {
        if (fileNotes) {
            setNotes(fileNotes);
        }
    };

    useEffect(() => {
        if (user) {
            let newAssignedBadges: number[] = [];
            let newBadgeClicked: boolean[] = [];
            // user.badges.forEach((badge: any) => {
            //     newAssignedBadges.push(badge.id);
            //     badgeClicked[badge.id] = true;
            // });
            setAssignedBadges(newAssignedBadges);
        }
    }, [user]);

    useEffect(() => {
        if (submission) {
            setGrade(submission?.grade || 1)
        }
    }, [submission]);

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
                    replies: [],
                    author: "",
                    fresh: true,
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
                                    Watch comments ({notes.length})
                                </button>
                            </div>

                            <div className='inline-block'>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => { grade != 1 ? setGrade(grade - 1) : onWarning("Minimum points reached") }}

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

                                    /

                                    <input
                                        type="number"
                                        value={10}
                                        readOnly
                                        className="h-10 w-16 rounded border-gray-200  text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                                    />

                                    <button
                                        onClick={() => { (grade < 10 ? setGrade(grade + 1) : onWarning("Maximum points reached")) }}
                                        type="button"
                                        className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div>
                                <button
                                    onClick={openModal}
                                    className="px-4 py-2 mr-2 inline-block bg-gray-100  hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-full"
                                    type="button"
                                >
                                    Submit Grade
                                </button>
                            </div>
                            <div>
                                <button
                                    className="px-4 py-2 inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-full relative"
                                    onClick={openBadgeModal}
                                >
                                    {assignedBadges.length === 0 ? "Assign badges" : "See assigned badges"}
                                    <span
                                        className="absolute top-0 right-0 bg-gray-500 text-white rounded-full w-4 h-4 flex items-center justify-center top-0 right-0 -mt-1 -mr-1"
                                        style={{
                                            fontSize: '12px',
                                        }}
                                    >
                                        {assignedBadges.length}
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div style={{ height: "90vh" }}>
                            {fileUrl && (
                                <Viewer fileUrl={fileUrl} plugins={[highlightPluginInstance]} onDocumentLoad={handleDocumentLoad} />
                            )}
                        </div>
                    </div>

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
                                                {notes.length === 0 && <div className='text-center py-3'>There are no comments to view</div>}
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
                                                                                    <p className="text-sm text-gray-600 "><time>{reply.date}</time></p>
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
                    {showModal && (
                        <div
                            tabIndex={-1}
                            className={`fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full flex justify-center items-center  backdrop-blur-[6px]`}
                        >
                            <div className="relative w-full max-w-md max-h-full">
                                <div className="relative bg-white rounded-lg shadow">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                                        data-modal-hide="popup-modal"
                                    >
                                        <svg
                                            aria-hidden="true"
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                    <div className="p-6 text-center">
                                        <svg
                                            aria-hidden="true"
                                            className="mx-auto mb-4 text-gray-400 w-14 h-14 "
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            ></path>
                                        </svg>
                                        <h3 className="mb-5 text-lg font-normal text-gray-500 ">
                                            Submit the assessment with a grade of {grade}?
                                        </h3>
                                        <button
                                            data-modal-hide="popup-modal"
                                            type="button"
                                            className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                                            onClick={() => {
                                                setIsSubmitted(true);
                                                setShowModal(false);
                                                if (assignmentId && user && courseId) {
                                                    gradeSubmission(token, grade, notes, assignmentId?.toString(), user?.toString(), courseId?.toString())
                                                    addUserBadges(assignedBadges, courseId?.toString(), assignmentId?.toString(), user?.toString(), '', token)
                                                    if(!isBadgePresent(20)){
                                                        addUserBadges([20], courseId?.toString(), assignmentId?.toString(), '', '', token)
                                                        onSuccess("Congratulations you have received a badge! View your profile to see it.")
                                                    }
                                                }
                                            }}
                                        >
                                            Yes, I&apos;m sure
                                        </button>
                                        <button
                                            data-modal-hide="popup-modal"
                                            type="button"
                                            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
                                            onClick={() => { setShowModal(false) }}
                                        >
                                            No, cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {showBadgeModal && (
                        <div
                            tabIndex={-1}
                            className={`fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full flex justify-center items-center  backdrop-blur-[6px]`}
                        >
                            <div className="relative w-full max-w-3xl max-h-full mx-auto">
                                <div className="relative bg-white rounded-lg shadow ">
                                    <button
                                        type="button"
                                        onClick={closeBadgeModal}
                                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                                        data-modal-hide="popup-badge-modal"
                                    >
                                        <svg
                                            aria-hidden="true"
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                    <div className="p-6 text-center">

                                        <div className="grid gap-4 my-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                                            {filteredBadges.map((badge, index) => {
                                                return (
                                                    <button className={`flex flex-col items-center justify-center w-full h-full border-2 p-1 rounded-2xl hover:scale-110 ${badgeClicked[index] ? 'border-green-500' : 'border-gray-300'}`}
                                                        onClick={() => { console.log("assigning badge: ", badge.name); handleBadgeClick(index, badge); }}
                                                        title={badge.description}
                                                        key={badge.badgeId}
                                                    >
                                                        <img className="w-10 h-10" src={`/badges/${badge.badgeId.toString()}.png`} alt={badge.description} />
                                                        <p className="text-sm">{badge.name}</p>
                                                    </button>)
                                            })}
                                        </div>
                                        <h3 className="mb-0 text-lg font-normal text-gray-500 ">Are you sure you want to assign these badges?</h3>
                                        <p className="mb-5 text-sm font-normal text-gray-500 ">(badges wont be given until grade submission)</p>
                                        <button
                                            data-modal-hide="popup-badge-modal"
                                            type="button"
                                            className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                                            onClick={() => {
                                                setBadgeModal(false);
                                            }}
                                        >
                                            Yes, I&apos;m sure
                                        </button>
                                        <button
                                            data-modal-hide="popup-badge-modal"
                                            type="button"
                                            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
                                            onClick={() => { setBadgeModal(false) }}
                                        >
                                            No, cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
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
