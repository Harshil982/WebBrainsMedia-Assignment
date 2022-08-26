import { useEffect, useState } from 'react';
import './App.css';
import { db } from './firebase-config';
import { collection,getDocs,addDoc,doc,updateDoc,deleteDoc } from "firebase/firestore"
import StudentData from './StudentData';

function App() {
  const [name, setname] = useState('')
  const [age, setage] = useState(0)
  const [users, setusers] = useState([])
  const userCollectionRef = collection(db,"students")

  const createUser = async () => {
    // console.log(name , age)
    if(name && age)
    {
    await addDoc(userCollectionRef,{name : name,age : Number(age)});
    setname("")
    setage(0)
    }
    else
    {
      if (!name) {
        alert("Please Fill Name")
      }
      else
      {
        alert("Please Fill Age")
      }
    }
  }

  const updateUser = async (id,newage) => {
    const userDoc = doc(db,"students",id)
    const newFields = {age : newage+1}
    await updateDoc(userDoc,newFields)
  }

  const deleteUser = async (id) => {
    const userDoc = doc(db,"students",id)
    await deleteDoc(userDoc);
  }

  useEffect(() => {
    const getuser = async () => {
      const data = await getDocs(userCollectionRef);
      // console.log(data.docs)
      setusers(data.docs.map((doc) => ({...doc.data(),id : doc.id})));
    }
    getuser();
  },[])
  return (
    <div className="App">
      <input type="text" placeholder="Enter Name" value={name} onChange={(e) => setname(e.target.value)} />
      <input type="number" placeholder="Enter Age" value={age} onChange={(e) => setage(e.target.value)} />
      <button onClick={createUser} >Create User</button>
      <h1>Hello</h1>
      {
        users.map((user) => (
          <div key={user.id} >
            <p>Name : {user.name}</p>
            <p>Age : {user.age}</p>
            <button onClick={() => {updateUser(user.id,user.age)}} >Increament Age</button>
            <button onClick={() => {deleteUser(user.id)}} >Delete {user.name}</button>
          </div>
        ))
      }
      <StudentData />
    </div>
  );
}

export default App;
