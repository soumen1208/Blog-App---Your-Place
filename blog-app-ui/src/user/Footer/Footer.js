import React from 'react'
import '../Footer/footer.css'

function Footer() {

    return (
        <div className='footerContainer'>

            <div style={{ width: '50%' }}>
                <img className='footerLogo' src={require('../../assets/IMG20220427092154.jpg')} alt='footerLogo' />
            </div>

            <div style={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <a href='#' className='socialMedia'>Facebook</a>
                <a href='#' className='socialMedia'>WhatsApp</a>
                <a href='#' className='socialMedia'>Twitter</a>
                <a href='#' className='socialMedia'>Instagram</a>
            </div>

        </div>
    )
}

export default Footer