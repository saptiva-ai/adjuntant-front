"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";


const Dashboard = () => {
    const { data: session } = useSession();

    return (
        <>
            {session ? (
                <>
                    <h1>Hello!</h1>
                        { JSON.stringify(session) }
                    <p></p>
                    <button onClick={() => signOut()} className="border border-black rounded-lg">Sign out</button>
                </>
            ): (
                <>
                    <h1 className="txt-3x1"> Welcome to Adjuntant</h1>
                    <button onClick={() => signIn("google")} className="border border-black rounded-lg">Sign in with Google</button>
                    <button onClick={() => signIn("github")} className="border border-black rounded-lg">Sign in with GitHub</button>
                </>
            )}
            
        </>
    )
}

export default Dashboard