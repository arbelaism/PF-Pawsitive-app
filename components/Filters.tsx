import { NextComponentType } from "next";
import styles from '../styles/Filters.module.css';
import React, { useContext, useEffect, useReducer } from 'react'
import { fetchAdoptions } from 'app/actions'
import { FETCH_ADOPTIONS, FILTER_BY_AGE } from 'app/constants'
import { reducer } from 'app/reducer'
import AppContext from 'app/store'
import filterByAge from "app/actions/filterByAge";

const Filters: NextComponentType=()=>{

    //TRYING TO FILTER BY AGE=>>>>

    
    // const ctx = useContext(AppContext)
    // const [state, dispatch] = useReducer(reducer, ctx)
    // useEffect(() => {
    //     fetchAdoptions().then(value => {
    //         dispatch({ type: FETCH_ADOPTIONS, payload: value })
    //     })
    // }, [dispatch])

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    //     const target = e.target as HTMLInputElement;
    //     dispatch
    //     filterByAge(target.value).then(value=>{
    //         dispatch({type: FILTER_BY_AGE, payload: value})
    //     })
    // }


  return(
    <div className={styles.filtersContainer}>

        <div className={styles.itemFilter}>
            <h2>Filtrar por Categoría</h2>
            <select name="selector" onChange={()=>{}} className={styles.itemSelector}>
                <option value="">Categoría...</option>
                <option value="gato">Gatos</option>
                <option value="perro">Perros</option>
                <option value="ave">Aves</option>
                <option value="tortuga">Tortugas</option>    
            </select>
        </div>

        <div className={styles.itemFilter}>
            <h2>Filtrar por Tamaño</h2>
            <select name="size" onChange={()=>{}} className={styles.itemSelector}>
                <option value="">Tamaño...</option>
                <option value="BIG">Grande</option>
                <option value="MIDDLE">Mediano</option>
                <option value="SMALL">Pequeño</option>  
            </select>
        </div>
        
        <div className={styles.itemFilter}>

            <h2>Filtrar por Edad</h2>
            <select name="age" onChange={()=>{}} className={styles.itemSelector}>
                <option value="">Edad...</option>
                <option value="1 mes">1 Mes</option>
                <option value="2 meses">2 Meses</option>
                <option value="3 meses">3 Meses</option>
                <option value="4 meses">4 Meses</option>
                <option value="5 meses">5 Meses</option>
                <option value="6 mes">6 Meses</option>
                <option value="7 meses">7 Meses</option>
                <option value="8 meses">8 Meses</option>
                <option value="9 meses">9 Meses</option>
                <option value="10 mes">10 Meses</option>
                <option value="11 mes">11 Meses</option>
                <option value="12 meses">12 Meses</option>
                <option value="1 year">1 año</option>
                <option value="2 years">2 años</option>
                <option value="3 years">3 años</option>
                <option value="4 years">4 años</option>
                <option value="5 years">5 años</option>   
            </select>
        </div>
        
    </div> 
  ) 
};
export default Filters;