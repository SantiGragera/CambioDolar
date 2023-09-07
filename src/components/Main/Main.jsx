import CambioDolares from '../CambioDolares/CambioDolares'
import CambioPesos from '../CambioPesos/CambioPesos'
import './Main.css'

const Main = () => {

  return (
    <div className='main_todo'>
        <div className='box'>
            <CambioPesos />
            <CambioDolares />
        </div>

    </div>
  )
}

export default Main