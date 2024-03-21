import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className='header-container bg-slate-200 shadow-md'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-4'>
                <Link to="/">
                    <h1 className="logo font-bold text-xl sm:text-2xl flex flex-wrap">
                        <span className='text-slate-500'>Wander</span>
                        <span className='text-slate-700'>Lust</span>
                    </h1>
                </Link>
                <form className='bg-slate-100 p-2 rounded-lg flex items-center' action="#">
                    <input className='bg-transparent outline-none w-24 sm:w-64' type="text" placeholder='Search...' />
                    <FaSearch className='text-slate-500' />
                </form>
                <ul className='flex item-center gap-8'>
                    <Link to="/home">
                        <li className='hidden text-slate-500 sm:inline hover:underline'>Home</li>
                    </Link>
                    <Link to='/about'>
                        <li className='hidden text-slate-500 sm:inline hover:underline'>About</li>
                    </Link>
                    <Link to='/sign-in'>
                        <li className='text-slate-500 font-bold hover:underline'>Sign In</li>
                    </Link>
                </ul>
            </div>

        </header>
    )
}

export default Header