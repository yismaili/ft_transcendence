'use client'
import "./auth-page.css"
import { useRouter } from "next/navigation";
import Cookies from "cookies-ts"




function AuthSection(){
    const router = useRouter();

    const redir_page = async (url:string) => {
        let auth_window = window.open(url, "", "width=600,height=400,top=200,left=300");
        
        if(auth_window != null)
        {
            let interval = setInterval(() => {
                const cookies = new Cookies();
                const mycookie = cookies.get('userData');
                if(mycookie)
                {
                    let cookie = mycookie.slice(2);
                    cookies.set("userData", cookie);
                    auth_window?.close();
                    router.push("http://localhost:3000/UserProfile");
                    clearInterval(interval);
                }        
            }, 1000);
        }
    }

    return (<>
        <main className="auth__card">
            <div className="auth__credentials">
                    <h1 className="auth__msg"> begin your journey</h1>
                    <button type="submit" className="auth__btn" onClick={() => redir_page("http://localhost:3001/auth/google/callback")}> login with google</button>
                    <button className="auth__btn" onClick={() => redir_page("http://localhost:3001/auth/intra/callback")}><strong>42</strong> login with intra </button>
            </div>
        </main>
    </>);
}
export default AuthSection; 