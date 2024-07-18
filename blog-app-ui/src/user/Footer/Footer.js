import React from 'react'
import '../Footer/footer.css'

function Footer() {

    return (
        <div className='footerContainer'>

            <div style={{ width: '50%' }}>
                <img className='footerLogo' src={require('../../assets/IMG20220427092154.jpg')} />
            </div>

            <div style={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <a className='socialMedia'>Facebook</a>
                <a className='socialMedia'>WhatsApp</a>
                <a className='socialMedia'>Twitter</a>
                <a className='socialMedia'>Instagram</a>
            </div>

        </div>
    )
}

export default Footer