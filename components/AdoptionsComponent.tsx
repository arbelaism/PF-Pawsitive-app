import styles from '../styles/AdoptionsComponent.module.css';
import {NextComponentType} from 'next';
const AdoptionsComponent: NextComponentType = ()=>{
    return(
        
            <div className={styles.adoptionsPageContainer}>
                <div className={styles.filtersContainer}>
                    <div>
                        <label htmlFor='categorie'>Categoría</label>
                        <select name="categorie" onChange={()=>{}}>
                            <option value="">Categoría...</option>
                            <option value="Cats">Gatos</option>
                            <option value="Dogs">Perros</option>
                            <option value="Parrots">Aves</option>
                            <option value="Fishes">Peces</option>            
                        </select>
                    </div>
                    <div>
                        <label htmlFor='size'>Tamaño</label>
                        <select name="size" onChange={()=>{}}>
                            <option value="">Tamaño...</option>
                            <option value="BIG">Grande</option>
                            <option value="MIDDLE">Mediano</option>
                            <option value="SMALL">Pequeño</option>                                      
                        </select>
                    </div>
                    <div>
                        <label htmlFor='age'>Edad</label>
                        <select name="age" onChange={()=>{}}>
                            <option value="">Edad...</option>
                            <option value="1 year">1 año</option>
                            <option value="2 years">2 años</option>
                            <option value="3 years">3 años</option>
                            <option value="4 years">4 años</option>
                            <option value="5 years">5 años</option>                                      
                        </select>
                    </div>
                </div>
                <div className={styles.cardsContainer}>
                    <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ab non quaerat corrupti fugit consequuntur alias esse, laboriosam ad mollitia perferendis est amet obcaecati dolores? Veniam nulla ullam inventore repellat.</h1>
                    <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ab non quaerat corrupti fugit consequuntur alias esse, laboriosam ad mollitia perferendis est amet obcaecati dolores? Veniam nulla ullam inventore repellat.</h1>
                    <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ab non quaerat corrupti fugit consequuntur alias esse, laboriosam ad mollitia perferendis est amet obcaecati dolores? Veniam nulla ullam inventore repellat.</h1>
                    <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ab non quaerat corrupti fugit consequuntur alias esse, laboriosam ad mollitia perferendis est amet obcaecati dolores? Veniam nulla ullam inventore repellat.</h1>
                    <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ab non quaerat corrupti fugit consequuntur alias esse, laboriosam ad mollitia perferendis est amet obcaecati dolores? Veniam nulla ullam inventore repellat.</h1>
                    <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ab non quaerat corrupti fugit consequuntur alias esse, laboriosam ad mollitia perferendis est amet obcaecati dolores? Veniam nulla ullam inventore repellat.</h1>
                    <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ab non quaerat corrupti fugit consequuntur alias esse, laboriosam ad mollitia perferendis est amet obcaecati dolores? Veniam nulla ullam inventore repellat.</h1>
                    <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ab non quaerat corrupti fugit consequuntur alias esse, laboriosam ad mollitia perferendis est amet obcaecati dolores? Veniam nulla ullam inventore repellat.</h1>
                    <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ab non quaerat corrupti fugit consequuntur alias esse, laboriosam ad mollitia perferendis est amet obcaecati dolores? Veniam nulla ullam inventore repellat.</h1>
                    <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ab non quaerat corrupti fugit consequuntur alias esse, laboriosam ad mollitia perferendis est amet obcaecati dolores? Veniam nulla ullam inventore repellat.</h1>
                    <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ab non quaerat corrupti fugit consequuntur alias esse, laboriosam ad mollitia perferendis est amet obcaecati dolores? Veniam nulla ullam inventore repellat.</h1>
                    <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ab non quaerat corrupti fugit consequuntur alias esse, laboriosam ad mollitia perferendis est amet obcaecati dolores? Veniam nulla ullam inventore repellat.</h1>
                                     
                </div>
            </div>
        
    )
};

export default AdoptionsComponent;

