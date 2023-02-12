import React, { useCallback, useEffect, useMemo, useState } from "react";
import { gapi } from "gapi-script";
import { createEvent } from "./utils";

const API_KEY = "AIzaSyCoIzHM-mLO3pnmaXCcTWum_6V6pgsFwsg";
const CLIENT_ID =
	"991063391170-68vluf5rn1s31209lpmuoopckpb3o8g1.apps.googleusercontent.com";
const SCOPES = "https://www.googleapis.com/auth/calendar";

export default function Auth2() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

	const login = useCallback(async () => {
        setIsLoading(true);
		let auth2 = gapi.auth2.getAuthInstance();
		await auth2.signIn();
        setIsLoggedIn(true);
        setIsLoading(false);
	}, []);
	const logout = useCallback(async () => {
        setIsLoading(true);
		let auth2 = gapi.auth2.getAuthInstance();
		await auth2.signOut();
        setIsLoggedIn(false);
        setIsLoading(false);
	}, []);

	useEffect(() => {
		gapi.load("client", () => {
			gapi.client.setApiKey(API_KEY);
            setIsLoading(true);
			gapi.client
				.init({
					apiKey: API_KEY,
					clientId: CLIENT_ID,
					scope: "https://www.googleapis.com/auth/calendar",
					discoveryDocs: [
						"https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
					],
				})
				.then(() => {
					let auth2 = gapi.auth2.getAuthInstance();
                    setIsLoading(false);
					if (!auth2.isSignedIn.get()) {
						setIsLoggedIn(false);
						return;
					}
					setIsLoggedIn(true);
				});
		});
	}, []);
	return (
		<div className="main">
			<h1>Google Meeting Generator 
                {
                    <img src="/loader.svg" alt="Loading..." style={{
                        opacity: isLoading ? '1' : '0'
                    }}/>
                }
            </h1>
			{isLoggedIn ? (
				<div className="buttons">
					<button onClick={createEvent}>Create Meeting</button>
					<button onClick={logout}>Logout</button>
				</div>
			) : (
				<button onClick={login}>Login</button>
			)}
		</div>
	);
}
