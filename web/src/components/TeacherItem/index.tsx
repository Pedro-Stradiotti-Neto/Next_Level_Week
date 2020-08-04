import React from 'react';

import whatsAppIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css'

function TeacherItem() {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://media-exp1.licdn.com/dms/image/C4D03AQHfhTlq5h003Q/profile-displayphoto-shrink_200_200/0?e=1602115200&v=beta&t=Z81isQRAMYvxTXpVegU1_uN4lNOtF-58LcQdfSGyPsk" alt="Pedro Stradiotti Neto" />
                <div>
                    <strong>Pedro Stradiotti Neto</strong>
                    <span>Química</span>
                </div>
            </header>

            <p>
                Entusiasta das melhores tecnologias de química avancada.
                        <br /><br />
                        Apaixonado por explodir coisas em laboratórios e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.
                    </p>

            <footer>
                <p>
                    Preco/Hora
                            <strong>R$ 80,00</strong>
                </p>
                <button type='button'>
                    <img src={whatsAppIcon} alt="WhatsApp" />
                            Entrar em contato
                        </button>
            </footer>
        </article>
    )
}

export default TeacherItem;