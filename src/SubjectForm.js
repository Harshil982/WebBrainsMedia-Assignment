import React,{useState} from 'react'
import { db } from './firebase-config';
import { collection, addDoc } from "firebase/firestore"
import './StudentData.css'
import {IoCloseSharp} from 'react-icons/io5'

const SubjectForm = () => {
    // const [users, setusers] = useState([])
    const [dummy, setdummy] = useState(0)
    const [subject, setsubject] = useState('')
    const [topic1, settopic1] = useState('')
    const [t1note1, sett1note1] = useState('')
    const [t1note2, sett1note2] = useState('')
    const [topic2, settopic2] = useState('')
    const [t2note1, sett2note1] = useState('')
    const [t2note2, sett2note2] = useState('')
    const userCollectionRef = collection(db, "Student-subject-data")
    // const harshildata = getDocs(userCollectionRef);
    // console.log(harshildata)
    // useEffect(() => {
    //     const getuser = async () => {
    //         const data = await getDocs(userCollectionRef);
    //         console.log(data.docs)
    //         setusers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //     }
    //     getuser();
    // }, [])
    // console.log(users)

    const addData =  () => {
        addDoc(userCollectionRef, { SubjectName: subject, Topics: [{ [topic1]: [t1note1,t1note2] ,[topic2]: [t2note1,t2note2] }] });
        const container = document.querySelector(".notification-container");
        container.classList.add("d-none");
        setdummy((prev) => prev+1)
        // window.location.reload();
    }

    // const deleteData = async (id) => {
    //     const userDoc = doc(db,"Student-subject-data",id)
    //     await deleteDoc(userDoc);
    //     window.location.reload();
    // }

    const closeNotification = () => {
        const container = document.querySelector(".notification-container");
        container.classList.add("d-none");
    }

    const addNote = () => {
        const container = document.querySelector(".notification-container");
        container.classList.remove("d-none");
    }
    return (
        <div>
            <p>{dummy}</p>
            <input placeholder="Subject Name..." onChange={(e) => setsubject(e.target.value)} /><br />
            <input placeholder="Topic 1 Name..." onChange={(e) => settopic1(e.target.value)} />
            <input placeholder="Note 1..." onChange={(e) => sett1note1(e.target.value)} />
            <input placeholder="Note 2..." onChange={(e) => sett1note2(e.target.value)} /><br />
            <input placeholder="Topic 2 Name..." onChange={(e) => settopic2(e.target.value)} />
            <input placeholder="Note 1..." onChange={(e) => sett2note1(e.target.value)} />
            <input placeholder="Note 2..." onChange={(e) => sett2note2(e.target.value)} /><br />
            <br />
            <button onClick={addData} >Submit Note</button>
            <button onClick={closeNotification} >Add Note</button>

            {/* Notification container start */}
            <div className="notification-container" >
                <p>{subject} has been added successfully</p>
                <IoCloseSharp className="close-btn" onClick={addNote} />
            </div>
            {/* notification cintainer end  */}
        </div>
    )
}

export default SubjectForm