import icon from '../../assests/logo.svg'
function Logo() {
  return (
    <div className="flex items-center">
      <img src={icon} alt="Logo" className="w-20 h-20 " />
    </div>
  )
}

export default Logo