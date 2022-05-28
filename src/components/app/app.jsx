import styles from './app.module.css'
import AppHeader from '../app-header/app-header'
import Main from '../main/main'
import BurgerIngridients from '../burger-ingredients/burger-ingridients'
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { hardCode } from '../../utils/data'

function App() {

  return (
    <div className={styles.app}>
      <AppHeader />
      <Main >
        <BurgerIngridients data={hardCode}/>
        <BurgerConstructor data={hardCode}/>
      </Main>
    </div>
  );
}

export default App;