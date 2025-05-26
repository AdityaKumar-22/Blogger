function Container({children}) { //anything wrapped under <Container> will be passed as children
  return <div className='w-full max-w-7xl mx-auto px-4'>{children}</div>; 
}

export default Container