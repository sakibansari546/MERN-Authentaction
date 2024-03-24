import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
    const { currentUser } = useSelector(state => state.user);

    return (
        <header className='header-container bg-slate-200 shadow-md'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-4'>
                <Link to="/">
                    <h1 className="logo font-bold text-xl sm:text-2xl flex flex-wrap">
                        <span className='text-slate-500'>Wander</span>
                        <span className='text-slate-700'>Lust</span>
                    </h1>
                </Link>
                <ul className='flex items-center justify-center gap-8'>
                    <Link to="/">
                        <li className='hidden text-slate-500 sm:inline hover:underline'>Home</li>
                    </Link>
                    <Link to='/about'>
                        <li className='hidden text-slate-500 sm:inline hover:underline'>About</li>
                    </Link>
                    {currentUser ? (
                        <Link to='/profile' className=''>
                            <img src={currentUser.profilePic} alt="user" className='w-8 h-8 rounded-full' />
                        </Link>
                    ) : (
                        <Link to='/sign-in' className='text-slate-500 font-bold hover:underline'>Sign In</Link>
                    )}
                </ul>
            </div>
        </header>
    );
}

export default Header;
