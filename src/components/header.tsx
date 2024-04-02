import Logo from '/logo.svg'
import { Row } from './layout/row'

export const Header = () => {
    return (
        <header>
            <Row className='gap-8 w-full items-center'>
                <img src={Logo} alt="Logotipo do Projeto" />
                <nav>
                    <Row className='gap-5 text-sm'>
                        <a href="#" className='text-zinc-300 font-medium hover:text-zinc-50'>Eventos</a>
                        <a href="#" className='text-zinc-50 font-bold'>Participantes</a>
                    </Row>
                </nav>
            </Row>
        </header>
    )
}