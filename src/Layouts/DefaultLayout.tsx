import { Outlet } from "react-router-dom";
import { Nav } from "../components/Nav";
import styles from './styles.module.css'

export function DefaultLayout() {
    return(
        <div className={styles.layoutContainer}>
            <Nav />
            <Outlet />
        </div>

    );
}