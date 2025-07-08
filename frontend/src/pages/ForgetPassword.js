import React, { useState } from 'react'

const ForgetPassword = () => {

    const [email, setEmail] = useState('')

    const [msg, setMsg] = useState('')


    const handleSubmit = async (e) => {

        e.preventDefault();


        try {
            const res = await fetch('/api/forget-password', {

                method: 'POST',
                headers: { "Content-Type": "application/json" },

                body: JSON.stringify({ email })


            });

            const data = await res.json();
            setMsg(data.message || "link sent if email is valid")



        } catch (error) {


            console.log(error)
            setMsg("something went wrong")

        }



    }



    return (
        <div>

            <h2>    ForgetPassword
            </h2>


            <form onSubmit={handleSubmit}>


                <input type="email"

                    placeholder='Enter your email'

                    required
                    value={email}

                    onChange={(e) => setEmail(e.target.value)}
                />


                <button type='submit'> Send Reset Link  </button>


                {msg}

            </form>



        </div>
    )

}

export default ForgetPassword