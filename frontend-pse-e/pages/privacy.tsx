
import Head from "next/head";
import 'tailwindcss/tailwind.css';
import NavBar from "@/components/NavBar"

const PrivacyPolicy = () => {
    return (
        <>
            <Head>
                <title>Privacy Policy - WriteSpace</title>
                <meta name="description" content="Writing. Fun, Intuitive." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
            </Head>

            <NavBar showLogout={false} />
            <div className="px-4 sm:px-6 lg:px-8 mt-14">
                <div className="relative mx-auto max-w-[37.5rem] pt-20 text-center pb-24">
                    <h1 className="text-4xl font-extrabold sm:text-5xl">Privacy policy</h1>
                    <p className="mt-4 text-base leading-7 text-[#4b5563]">Last updated on June 29, 2023</p>
                </div>
            </div>
            <div className="relative px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-[40rem]">
                    <p className="mb-4 text-sm text-[#4b5563]">
                        Welcome to WriteSpace! This privacy policy describes how we collect, use, share, and protect your personal information in connection with the use of our application, WriteSpace. We value your privacy and ensure that your personal information is treated confidentially and in accordance with applicable privacy laws.
                    </p>
                    <h2 className="mb-4 mt-8 font-bold text-xl">Collected Information</h2>

                    <h3 className="mb-4 font-bold text-md">User Information</h3>

                    <p className="mb-4 text-sm text-[#4b5563]">
                        When using WriteSpace, we collect certain personal information from users, such as:
                    </p>

                    <ul className="space-y-0.5 text-[#4b5563] text-sm list-disc list-inside">
                        <li>Name</li>
                        <li>Email address</li>
                        <li>User ID (assigned by Canvas)</li>
                        <li>User settings and preferences</li>
                    </ul>

                    <h3 className="mb-4 mt-8 font-bold text-lg">Assignment Information</h3>

                    <p className="mb-4 text-sm text-[#4b5563]">
                        When students submit assignments through the Canvas API, we collect the following information related to the writing assignments:
                    </p>

                    <ul className="space-y-0.5 text-[#4b5563] text-sm list-disc list-inside">
                        <li>Content of the submitted assignments</li>
                        <li>Date and time of submission</li>
                        <li>Any attachments to the assignments</li>
                    </ul>

                    <h2 className="mb-4 mt-8 font-bold text-xl">Use of Collected Information</h2>

                    <p className="mb-4 text-sm text-[#4b5563]">
                        We use the collected information for the following purposes:
                    </p>

                    <ul className="space-y-0.5 text-[#4b5563] text-sm list-disc list-inside">

                        <li>Providing and improving the functionality of WriteSpace</li>
                        <li>Processing and managing submitted assignments</li>
                        <li>Communicating with users regarding their assignments and the application</li>
                        <li>Providing customer support and troubleshooting</li>
                        <li>Analyzing the usage of the application to improve user experience</li>
                        <li>Gaining insights to enhance user experience</li>
                        <li>Ensuring the security and safety of WriteSpace</li>
                    </ul>

                    <h2 className="mb-4 mt-8 font-bold text-xl">Data Management</h2>

                    <h3 className="mb-4 mt-8 font-bold text-lg">Data Storage and Security</h3>

                    <p className="mb-4 text-sm text-[#4b5563]">
                        We take reasonable measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. Your data is stored on secure servers, and we employ appropriate technical and organizational measures to protect the data.
                    </p>

                    <h3 className="mb-4 mt-8 font-bold text-lg">Data Retention</h3>

                    <p className="mb-4 text-sm text-[#4b5563]">
                        We retain your personal information for the period necessary to fulfill the purposes for which the information was collected, unless a longer retention period is required or permitted by law.
                    </p>

                    <h3 className="mb-4 mt-8 font-bold text-lg">Sharing of Information with Third Parties</h3>

                    <p className="mb-4 text-sm text-[#4b5563]">
                        We do not share your personal information with third parties except in the following cases:
                    </p>

                    <ul className="space-y-0.5 text-[#4b5563] text-sm list-disc list-inside">
                        <li>With your prior consent</li>
                        <li>When sharing information is necessary to comply with legal obligations, such as responding to court orders or legal processes</li>
                        <li>With trusted service providers who perform certain services on our behalf, such as hosting providers or customer support</li>
                    </ul>

                    <h2 className="mb-4 mt-8 font-bold text-xl">Your Rights</h2>

                    <p className="mb-4 text-sm text-[#4b5563]">
                        You have certain rights regarding your personal information. You can:
                    </p>

                    <ul className="space-y-0.5 text-[#4b5563] text-sm list-disc list-inside">
                        <li>Request access to the personal information we have about you</li>
                        <li>Correct or update inaccurate information</li>
                        <li>Request deletion of your personal information</li>
                        <li>Object to certain processing of your personal information</li>
                        <li>Withdraw your consent for the processing of your personal information (which may affect the use of WriteSpace)</li>
                    </ul>

                    <p className="mb-4 text-sm text-[#4b5563]">
                        Please contact us using the contact information provided below to exercise these rights or if you have any questions or concerns regarding your privacy.
                    </p>

                    <h2 className="mb-4 mt-8 font-bold text-xl">Cookies</h2>

                    <p className="mb-4 text-sm text-[#4b5563]">
                        WriteSpace uses cookies and similar technologies to enhance the functionality of the application and provide a personalized experience. By using WriteSpace, you consent to the use of cookies in accordance with our Cookie Policy.
                    </p>

                    <h2 className="mb-4 mt-8 font-bold text-xl">Changes to the Privacy Policy</h2>

                    <p className="mb-4 text-sm text-[#4b5563]">
                        This privacy policy may be amended from time to time to reflect updated privacy practices or to comply with relevant laws and regulations. We recommend checking our privacy policy regularly for any changes.
                    </p>

                    <h2 className="mb-4 mt-8 font-bold text-xl">Contact Information</h2>
                    <p className="mb-4 text-sm text-[#4b5563]">If you have any questions, comments, or requests regarding this privacy policy, please contact us at
                        <a className="font-bold" href="mailto:bobkreugel@hotmail.com"> bobkreugel@hotmail.com</a>.
                    </p>
                    <p className="mb-56 text-sm text-[#4b5563]">Thank you for using WriteSpace and trusting us with your personal information.
                    </p>
                </div>
            </div>
        </>
    );
};

export default PrivacyPolicy;
