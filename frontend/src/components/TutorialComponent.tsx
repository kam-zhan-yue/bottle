import React from 'react'
import got_it_button from "../assets/got_it_button.png";

const TutorialComponent = () => {

    const handleClick = () => {
        console.log("Button clicked!");
    }

  return (
    <div className='bg-transparent rounded flex flex-col items-center justify-center min-h-screen' style={{ fontFamily: "PixelifySans", color: "#FFFFFF" }}>
        <h1 className='text-center'>Welcome to Message in a Bottle</h1>
        <div className='flex flex-col items-center justify-center'>
            <ul>
                <li className='p-2'>
                    Use keys W, A, S, D to move around
                </li>
                <li className='p-2'>
                    Press SPACE to interact with an object
                </li>
                <li className='p-2'>
                    Send messages by interacting with DESK
                </li>
                <li className='p-2'>
                    Receive and reply to messages by interacting with MAILBOX
                </li>
            </ul>
        </div>
        <button onClick={handleClick}>
            <img src={got_it_button} alt="button" />
        </button>
    </div>
  )
}

export default TutorialComponent