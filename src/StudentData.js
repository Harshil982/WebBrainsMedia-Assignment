import { useEffect, useState } from 'react';
import './App.css';
import { db } from './firebase-config';
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore"
import './StudentData.css'
import { IoCloseSharp } from 'react-icons/io5'

function StudentData() {
    const [inputFields, setInputFields] = useState([
        { Topic: '', note: '' }
    ])
    const [users, setusers] = useState([])
    const [dummy, setdummy] = useState(0)
    const [subject, setsubject] = useState('')
    // const [topic1, settopic1] = useState('')
    // const [t1note1, sett1note1] = useState('')
    // const [t1note2, sett1note2] = useState('')
    // const [topic2, settopic2] = useState('')
    // const [t2note1, sett2note1] = useState('')
    // const [t2note2, sett2note2] = useState('')
    const userCollectionRef = collection(db, "Student-subject-data")
    // const harshildata = getDocs(userCollectionRef);
    // console.log(harshildata)
    useEffect(() => {
        const getuser = async () => {
            const data = await getDocs(userCollectionRef);
            console.log(data.docs)
            setusers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getuser();
    }, [dummy])
    console.log(users)

    const addData = async () => {
        await addDoc(userCollectionRef, { SubjectName: subject, Topics: inputFields });
        // await addDoc(userCollectionRef, { SubjectName: subject, Topics: [{ [topic1]: [t1note1, t1note2], [topic2]: [t2note1, t2note2] }] });
        const container = document.querySelector(".notification-container");
        container.classList.add("d-none");
        setdummy((prev) => prev + 1)
        // window.location.reload();
    }

    const deleteData = async (id, delSubject) => {
        const userDoc = doc(db, "Student-subject-data", id)
        await deleteDoc(userDoc);
        alert(`Subject ${delSubject} has been Deleted successfully`)
        setdummy((prev) => prev - 1)
    }

    const closeNotification = () => {
        const container = document.querySelector(".notification-container");
        container.classList.add("d-none");
    }

    const addNote = () => {
        const container = document.querySelector(".notification-container");
        container.classList.remove("d-none");
    }

    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    }

    const addFields = () => {
        let newfield = { Topic: '', note: '' }
        setInputFields([...inputFields, newfield])
    }
    const submit = (e) => {
        e.preventDefault();
        console.log({ SubjectName: subject, Topics: inputFields })
    }
    return (
        <div className="App">
            <h1>Your Data</h1>
            {inputFields.map((input, index) => {
                return (
                    <div key={index}>
                        <input
                            name='Topic'
                            placeholder='Topic'
                            value={input.Topic}
                            onChange={event => handleFormChange(index, event)}
                        />
                        <input
                            name='note'
                            placeholder='Note'
                            value={input.note}
                            onChange={event => handleFormChange(index, event)}
                        />
                        <button>Add Note</button>
                    </div>
                )
            })}
            <button onClick={addFields}>Add More..</button>
            <button onClick={submit}>Submit</button>
            <input placeholder="Subject Name..." onChange={(e) => setsubject(e.target.value)} /><br />
            {/*<input placeholder="Topic 1 Name..." onChange={(e) => settopic1(e.target.value)} />
            <input placeholder="Note 1..." onChange={(e) => sett1note1(e.target.value)} />
            <input placeholder="Note 2..." onChange={(e) => sett1note2(e.target.value)} /><br />
            <input placeholder="Topic 2 Name..." onChange={(e) => settopic2(e.target.value)} />
            <input placeholder="Note 1..." onChange={(e) => sett2note1(e.target.value)} />
            <input placeholder="Note 2..." onChange={(e) => sett2note2(e.target.value)} /><br /> */}
            <br />
            <button onClick={addData} >Submit Note</button>
            <button onClick={closeNotification} >Add Note</button>

            {/* Notification container start */}
            <div className="notification-container" >
                <p>Subject {subject} has been added successfully</p>
                <IoCloseSharp className="close-btn" onClick={addNote} />
            </div>
            {/* notification cintainer end  */}

            <div className="subject-container" >
                {
                    users.map((student, index) => (
                        <div key={index} className="subject-data-container" >
                            <h2>Subject : {student.SubjectName}</h2>
                            {student.Topics.map((topic, ind) => (
                                <div key={ind}>
                                    <h3>{topic['Topic']}</h3>
                                    <li>{topic.note}</li>
                                </div>
                            ))}
                            <button onClick={() => { deleteData(student.id, student.SubjectName) }} >Delete {student.SubjectName}</button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default StudentData;
