import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'



const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleReset = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }

        try {
            const response = await fetch(`/api/reset-password/${token}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ newPassword })
            });

            const data = await response.json();
            if (response.ok) {
                setMessage("Password reset successful. Redirecting...");
                setTimeout(() => navigate("/login"), 2000);
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage("Something went wrong");
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            <form onSubmit={handleReset}>
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Submit</button>
                <p>{message}</p>
            </form>
        </div>
    );
};


export default ResetPassword;