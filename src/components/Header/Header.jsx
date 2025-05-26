import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import {Container, Logo, LogoutBtn} from '../index'

const Header = () => {
    const authStatus= useSelector((state)=> state.auth.status)
    const navigate= useNavigate()

    const navItems=[
        {name:'Home', slug:'/',active:true},
        {name: 'Login', slug: '/login', active: !authStatus},
        {name: 'Sign up', slug: '/signup', active: !authStatus},
        {name: 'All Posts', slug: '/posts', active: authStatus},
        {name: 'Add Post', slug: '/add-post', active: authStatus},
    ]
  return (
    <header className='py-3 shadow bg-[#1e1f0a] sticky top-0 z-50'>
      <Container>
        <nav className='flex items-center '>
          <div>
            <Link to='/'><Logo width='70px'/></Link>
          </div>
          <ul className='flex ml-auto text-2xl gap-3'>
            {navItems.map((item)=>
                item.active? (<li key={item.name}>
                    <button onClick={()=>navigate(item.slug)} className='cursor-pointer inline-block px-6 py-2 duration-200 hover:text-[#b0b0a5]'>{item.name}</button>
                </li>): null
            )}
            {authStatus && (
              <li >
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
        </Container>
    </header>
  )
}

export default Header
