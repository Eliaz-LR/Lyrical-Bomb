import { useState, useEffect } from "react"


export default function DarkModeButton() {
    // taken from https://tailwindcss.com/docs/dark-mode and react-ified
    const prefersDarkMode = (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches))
    const [darkMode, setDarkMode] = useState(prefersDarkMode)

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
            localStorage.theme = 'dark'
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.theme = 'light'
        }
    }, [darkMode])

    return (
        <button className="absolute top-0 right-0 m-2" onClick={() => setDarkMode(!darkMode)}>Change theme</button>
    )
}