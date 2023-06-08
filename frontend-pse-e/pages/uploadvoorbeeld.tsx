import { SetStateAction, useState } from "react";
import Button from "../components/stdButton";
import UploadPopup from "../components/uploadPopup";
import NavBar from "@/components/NavBar";

const Home = () => {
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    return (
        <>
        <NavBar />
        <div style={{ display: "flex", justifyContent: "center",
                      alignItems: "center", height: "100vh" }}>
            <Button onClick={togglePopup}>Upload here</Button>
        </div>
        <UploadPopup showPopup={showPopup} togglePopup={togglePopup} />
        </>
    );
};

export default Home;
