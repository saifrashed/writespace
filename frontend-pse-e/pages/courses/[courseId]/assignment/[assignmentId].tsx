import Head from "next/head";
import { useRouter } from "next/router";

const Assignment = () => {
    const router = useRouter();

    const { courseId: courseId, assignmentId: assignmentId } = router.query;

    return (
        <>
            <Head>
                <title>Assignment {assignmentId} - {courseId} - WriteSpace</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
        </>
    );
};

export default Assignment;
